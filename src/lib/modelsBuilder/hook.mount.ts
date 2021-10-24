import { MountedModel } from './model.mount'
import { useStore } from 'effector-react'

export function useMountedModel(model: MountedModel) {
  return useStore(model.$isMounted)
}
