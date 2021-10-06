import { attach, createEffect, createEvent, createStore } from "effector";
import { request } from "../../api/request";
import { IFace, IFaceCached } from "../../interfaces/types.face";
import { toCachedFace } from "../faces/helpers";
import { links } from "../../api/links";

export type IFaceCachedList = {
  [key: string]: Partial<IFaceCached>;
};
type FaceRequest = Omit<Partial<IFaceCached>, "node" | "uniqKey"> & {
  uniqKey: IFaceCached["uniqKey"];
};

export const addNewFaceToCache = createEvent<IFace>();
export const addFaceUpdateToCache = createEvent<FaceRequest>();
export const addFaceDeleteToCache = createEvent<{
  uniqKey: string;
  _id?: string;
}>();
export const resetCache = createEffect();
export const $facesCache = createStore<IFaceCachedList>({})
  .on(addNewFaceToCache, (state, payload) => {
    return { ...state, [payload.uniqKey]: toCachedFace(payload) };
  })
  .on(addFaceUpdateToCache, (state, { uniqKey, ...rest }) => {
    if (uniqKey in state) {
      return {
        ...state,
        [uniqKey]: {
          ...state[uniqKey],
          _delete: false,
          ...rest,
        },
      };
    }
    if (rest._id) {
      return {
        ...state,
        [uniqKey]: rest,
      };
    }
    return;
  })
  .on(addFaceDeleteToCache, (state, { uniqKey, _id }) => {
    if (_id) {
      return {
        ...state,
        [uniqKey]: { _id, _delete: true },
      };
    }
    if (uniqKey in state) {
      const newState = { ...state };
      delete newState[uniqKey];
      return newState;
    }
  })
  .reset(resetCache);

$facesCache.watch((state) => {
  console.log(state);
});

export const sendCache = attach({
  source: $facesCache,
  mapParams: (_: void, cache) => ({ cache }),
  effect: createEffect(({ cache }: { cache: IFaceCachedList }) => {
    const body = Object.entries(cache).map(([_, data]) => data);
    if (!body.length) return;
    return request({
      url: links.assets,
      body,
      method: "PUT",
    });
  }),
});

sendCache.fail.watch((e) => {
  console.log(e);
});
