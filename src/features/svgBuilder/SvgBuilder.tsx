import React, { SVGProps } from "react";
import { INode } from "svgson";
import { SvgNode } from "../facesBuildZone/types";
import { getMeasure, getValue } from "../../lib/helpers/getMeasure";

type SvgBuilderProps = {
  node: SvgNode | INode;
  childNode?: boolean;
} & SVGProps<SVGSVGElement | SVGPathElement>;

const SvgBuilder = React.memo(
  ({ node, childNode, ...svgProps }: SvgBuilderProps) => {
    const { style, uniqKey, ...props } = node.attributes;
    const sizes = (() => {
      if (childNode) return {};
      if (!props.width || !props.height) return {};
      return {
        width: getValue(props.width) / 4 + getMeasure(props.width),
        height: getValue(props.height) / 4 + getMeasure(props.height),
      };
    })();

    return React.createElement<SVGProps<SVGSVGElement | SVGPathElement>>(
      node.name,
      { ...svgProps, ...props, ...sizes },
      node.children
        .filter(({ type }) => type === "element")
        .map((childNode) => {
          return (
            <SvgBuilder
              childNode
              node={childNode}
              key={childNode.attributes.uniqKey}
            />
          );
        })
    );
  },
  (prev, next) => {
    return prev.node.attributes.uniqKey === next.node.attributes.uniqKey;
  }
);

export default SvgBuilder;
