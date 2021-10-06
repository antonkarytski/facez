import { INode } from "svgson";
import { IFace, IFaceCached } from "../../interfaces/types.face";

export function toIFace(node: INode): IFace {
  return {
    node,
    offset: {
      x: 0,
      y: 0,
    },
    scale: 1,
    rotation: 0,
    uniqKey: node.attributes.uniqKey,
  };
}

export function toCachedFace({ node, ...rest }: IFace): IFaceCached {
  return {
    node: JSON.stringify(node),
    ...rest,
  };
}

export function fromCachedFace({ node, ...rest }: IFaceCached) {
  return {
    node: JSON.parse(node),
    ...rest,
  };
}
