import { INode } from "svgson";

export function forINodeTree(handler: (node: INode) => void, node: INode) {
  handler(node);
  node.children = node.children.map((node) => {
    return forINodeTree(handler, node);
  });
  return node;
}
