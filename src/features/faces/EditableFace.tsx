import SvgBuilder from "../svgBuilder/SvgBuilder";
import React, { useState } from "react";
import { INode } from "svgson";
import RemoveButton from "../../ui/buttons/RemoveButton";

type EditableFaceProps = {
  node: INode;
  svgClass?: string;
  onDelete?: () => void;
};

export function EditableFace({ node, svgClass, onDelete }: EditableFaceProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? <RemoveButton onClick={onDelete} /> : null}
      <SvgBuilder node={node} className={svgClass} />
    </div>
  );
}
