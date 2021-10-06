import React from "react";
import classes from "./style.module.scss";
import FacesDropZone from "../../features/facesBuildZone/DropZone/FacesDropZone";
import FacesBuildZone from "../../features/facesBuildZone/BuildZone/FacesBuildZone";

export default function AdminPage() {
  return (
    <div className={classes.Container}>
      <FacesDropZone />
      <FacesBuildZone />
    </div>
  );
}
