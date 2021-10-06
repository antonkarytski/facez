import { createEffect } from "effector";
import { request } from "./request";
import { links } from "./links";
import { IFaceCached } from "../interfaces/types.face";

export const getFaces = createEffect(() => {
  return request<IFaceCached[]>({ url: links.assets });
});

getFaces.fail.watch((e) => {
  console.log(e);
});
