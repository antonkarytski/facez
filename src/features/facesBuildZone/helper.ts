import { INode } from "svgson";
import { replaceKeys } from "../../lib/helpers/objects";
import { forINodeTree } from "../../lib/helpers/iNode";
import { nanoid } from "nanoid";
import { ColorsList } from "./types";

function findColors(svgString: string): ColorsList | undefined {
  const stylesString = svgString.match(
    /<!\[CDATA\[\s*(?:\.fil[0-9]+ {fill:#[0-9A-F]{6}}\s*)+/gm
  );
  if (!stylesString) return;
  const colors = stylesString[0].matchAll(
    /\.(fil[0-9]+) {fill:(#[0-9A-F]+)}/gm
  );
  //@ts-ignore
  return [...colors].map((value) => {
    return { className: value[1], color: value[2] };
  });
}

function replaceStyles(svgString: string, colors: ColorsList) {
  const withoutStyles = svgString.replace(/<defs>[\w\W]+<\/defs>/gm, "");
  return colors.reduce((accum, { color, className }) => {
    return accum.replaceAll(`class="${className}"`, `fill="${color}"`);
  }, withoutStyles);
}

export function prepareSvgColor(svgString: string) {
  const colorsList = findColors(svgString);
  if (!colorsList) return svgString;
  return replaceStyles(svgString, colorsList);
}

const convertMap = {
  class: "className",
  "xml:space": "xmlSpace",
  "xmlns:xlink": "xmlnsXlink",
};

export function prepareSvgJson(startNode: INode): INode {
  return forINodeTree((node) => {
    node.attributes = replaceKeys(node.attributes, convertMap);
    node.attributes.uniqKey = nanoid();
  }, startNode);
}
