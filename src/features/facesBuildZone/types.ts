import { INode } from "svgson";
import { SVGProps } from "react";

export type ColorsList = {
  className: string | undefined;
  color: string | undefined;
}[];
export type SvgNode = Omit<INode, "attributes"> & {
  attributes: SVGProps<SVGSVGElement | SVGPathElement> & {
    uniqKey: string;
  };
};
