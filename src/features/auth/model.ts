import { createEvent, restore } from "effector";

export const setIsAuth = createEvent<boolean>();
export const $isAuth = restore(setIsAuth, false);
