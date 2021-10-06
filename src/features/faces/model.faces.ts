import { createEvent, createStore } from "effector";
import { IFace, IFaceCached } from "../../interfaces/types.face";
import { fromCachedFace } from "./helpers";

export const setFaces = createEvent<IFaceCached[]>();
export const addFace = createEvent<IFace>();
export const $faces = createStore<IFace[]>([])
  .on(setFaces, (_, payload) => {
    return payload.map((node) => fromCachedFace(node));
  })
  .on(addFace, (state, payload) => {
    return [...state, payload];
  });
