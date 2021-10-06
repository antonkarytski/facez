import { INode } from "svgson";

export type IFace = {
  node: INode;
  offset: {
    x: number;
    y: number;
  };
  scale: number;
  rotation: number;
  uniqKey: string;
  token?: string;
  owner?: string;
  _id?: string;
};

export type IFaceLocation = Pick<IFace, "_id" | "uniqKey">;

export type IFaceCached = {
  node: string;
  _delete?: boolean;
} & Omit<IFace, "node">;
