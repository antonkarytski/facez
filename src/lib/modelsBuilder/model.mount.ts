import { createEvent, restore } from "effector";

export function createMountModel(defaultState = false) {
  const setIsMounted = createEvent<boolean>();
  const unmount = createEvent();
  const mount = createEvent();
  const toggle = createEvent();
  const $isMounted = restore(setIsMounted, defaultState)
    .on(mount, () => true)
    .on(unmount, () => false)
    .on(toggle, (state) => !state);

  return { $isMounted, setIsMounted, unmount, mount, toggle };
}

export type MountedModel = ReturnType<typeof createMountModel>;
