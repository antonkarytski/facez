import { createEvent, createStore } from "effector";
import { IFace, IFaceCached } from "../../interfaces/types.face";
import { fromCachedFace } from "./helpers";

type FaceUpdateProps = Pick<IFace, "uniqKey"> & Partial<Omit<IFace, "uniqKey">>;

export const setFaces = createEvent<IFaceCached[]>();
export const updateFace = createEvent<FaceUpdateProps>();
export const addFace = createEvent<IFace>();
export const removeFace = createEvent<string>();
export const $faces = createStore<IFace[]>([])
  .on(setFaces, (_, payload) => {
    return payload.map((node) => fromCachedFace(node));
  })
  .on(addFace, (state, payload) => {
    return [...state, payload];
  })
  .on(updateFace, (state, { uniqKey, ...payload }) => {
    const index = state.findIndex((face) => face.uniqKey === uniqKey);
    if (index === -1) return;
    const copy = [...state];
    copy.splice(index, 1, { ...state[index], ...payload });
    return copy;
  })
  .on(removeFace, (state, payload) =>
    state.filter(({ uniqKey }) => uniqKey !== payload)
  );
