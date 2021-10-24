import {
  attach,
  createEffect,
  createEvent,
  createStore,
  Effect,
  Event,
  sample,
  Store,
} from 'effector'

type WithOptions<Params> = Params & { attempt?: number }

type RepeatableEffectOptions<Params> = {
  /*
   * if passed a number, then there will be equal delay between request.
   * if passed array, then each next attempt will fire with corresponding delay
   * if array if shorter than attempts count, next attempt get last element of array
   */
  delay?: number | number[]
  attemptsCount?: number
  blockChannel?: boolean
  attemptsFilter?: (params: WithOptions<Params>) => boolean | Promise<boolean>
}

type RepeatableEffect<Params extends object, Response> = Effect<
  Params & { attempt?: number },
  Response
> & {
  onAttemptsExceed: Event<WithOptions<Params>>
}

type CreateRepeatableEffectProps<
  Params extends object,
  Response,
  TriggerStore
> = {
  triggerSource: Store<TriggerStore>
  filter?: (cSource: TriggerStore, data?: Params) => boolean
  fn: (params: Params) => Promise<Response>
  options?: RepeatableEffectOptions<Params>
}

function getDelay(delay: number | number[], attempt: number) {
  if (!Array.isArray(delay)) return delay
  const { length } = delay
  if (attempt - 1 > length) return delay[length - 1]
  return delay[attempt - 2]
}

function addOptions<Params>(
  params: WithOptions<Params> | void
): Params & { attempt: number } {
  if (!params) return { attempt: 1 } as Params & { attempt: number }
  if (!params.attempt) return { ...params, attempt: 1 }
  return { ...params, attempt: params.attempt + 1 }
}

export function createRepeatableEffect<
  Params extends object,
  Response,
  TriggerStore
>({
  triggerSource,
  filter,
  fn,
  options,
}: CreateRepeatableEffectProps<Params, Response, TriggerStore>) {
  const repeatableEffect = createEffect<WithOptions<Params>, Response>(
    fn
  ) as RepeatableEffect<Params, Response>

  const resetInFlight = createEvent()
  const $inFlight = createStore(false)
    .on(repeatableEffect, () => true)
    .reset(repeatableEffect.done)
    .reset(resetInFlight)

  const addTask = createEvent<Params>()
  const clearTasks = createEvent()
  const $tasks = createStore<Params[]>([])
    .on(addTask, (state, payload) => [...state, payload])
    .reset(clearTasks)

  const putOnRepeat = createEvent<Params>()
  sample({
    source: triggerSource,
    clock: putOnRepeat,
    fn: (cSource, data: Params) => ({ cSource, data }),
  }).watch(({ cSource, data }) => {
    if (filter && !filter(cSource, data)) {
      addTask(data)
      return
    }
    repeatableEffect(data).catch(() => {})
  })

  const sendTasks = createEvent()
  sample({
    source: { tasks: $tasks },
    clock: sendTasks,
  }).watch(({ tasks }) => {
    tasks.forEach((data) => repeatableEffect(data).catch(() => {}))
    clearTasks()
  })

  triggerSource.watch((cSource) => {
    if (!filter || filter(cSource)) {
      sendTasks()
    }
  })

  const onAttemptExceed = createEvent<WithOptions<Params>>()
  repeatableEffect.fail.watch(async ({ params }) => {
    const newParams = addOptions(params)
    if (options?.attemptsCount && newParams.attempt > options.attemptsCount) {
      onAttemptExceed(newParams)
      resetInFlight()
      return
    }
    if (options?.attemptsFilter && !(await options.attemptsFilter(newParams))) {
      onAttemptExceed(newParams)
      resetInFlight()
      return
    }
    if (options?.delay) {
      const delay = getDelay(options.delay, newParams.attempt)
      setTimeout(() => {
        putOnRepeat(newParams)
      }, delay)
    } else {
      putOnRepeat(newParams)
    }
  })

  const effectWithBlock = attach({
    source: $inFlight,
    mapParams: (params: WithOptions<Params>, __inFlight) => ({
      __inFlight,
      ...params,
    }),
    effect: createEffect(
      (params: WithOptions<Params> & { __inFlight: boolean }) => {
        if (params.__inFlight) throw Error('Channel is busy')
        return repeatableEffect(params)
      }
    ),
  }) as RepeatableEffect<Params, Response>

  const effect = options?.blockChannel ? effectWithBlock : repeatableEffect
  effect.onAttemptsExceed = onAttemptExceed
  return effect
}
