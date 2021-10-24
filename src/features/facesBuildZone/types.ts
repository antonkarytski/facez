import { INode } from "svgson";
import { SVGProps } from "react";
import { IFaceCached } from "../../interfaces/types.face";

export type ColorsList = {
  className: string | undefined;
  color: string | undefined;
}[];
export type SvgNode = Omit<INode, "attributes"> & {
  attributes: SVGProps<SVGSVGElement | SVGPathElement> & {
    uniqKey: string;
  };
};

export type SendCacheResponse = {
  inserted: IFaceCached[];
};
