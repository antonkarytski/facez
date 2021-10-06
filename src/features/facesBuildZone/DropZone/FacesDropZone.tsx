import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { readFile } from "../../../lib/asyncFileReader/readFile";
import { parse } from "svgson";
import { prepareSvgJson, prepareSvgColor } from "../helper";
import classes from "./style.module.scss";
import { addNewFaceToCache } from "../model.cache";
import { toIFace } from "../../faces/helpers";
import { addFace } from "../../faces/model.faces";

export default function FacesDropZone() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const svgString = await readFile(acceptedFiles[0]);

    if (!svgString) return;
    const withColors = prepareSvgColor(svgString);
    const svgJson = await parse(withColors);
    const preparedSvg = prepareSvgJson(svgJson);
    const face = toIFace(preparedSvg);
    addFace(face);
    addNewFaceToCache(face);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={classes.Container}>
      <input {...getInputProps()} />
      {isDragActive ? <span>Release</span> : <span>Drop face here</span>}
    </div>
  );
}
