import React, { useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import classes from "./style.module.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  addFaceDeleteToCache,
  addFaceUpdateToCache,
  sendCache,
} from "../model.cache";
import { IFaceLocation } from "../../../interfaces/types.face";
import { useStore } from "effector-react";
import { $faces, removeFace } from "../../faces/model.faces";
import { EditableFace } from "../../faces/EditableFace";
import RequestButton from "../../../ui/buttons/RequestButton";

export default function FacesBuildZone() {
  const faces = useStore($faces);
  const [isScaleBlocked, setIsScaleBlocked] = useState(false);
  const [currentScale, setCurrentScale] = useState(1);

  function onMoveStop(
    { _id, uniqKey }: IFaceLocation,
    { x, y }: DraggableData
  ) {
    setIsScaleBlocked(false);
    console.log(_id, uniqKey);
    addFaceUpdateToCache({
      uniqKey,
      _id,
      offset: { x, y },
    });
  }

  return (
    <div className={classes.Container}>
      <RequestButton
        onClick={sendCache}
        label={"Save"}
        className={classes.SaveButton}
      />
      <TransformWrapper
        disabled={isScaleBlocked}
        minScale={0.1}
        limitToBounds={false}
        onZoomStop={({ state: { scale } }) => {
          setCurrentScale(scale);
        }}
      >
        <TransformComponent wrapperClass={classes.ResizeComponent}>
          {faces.map(({ node, offset, uniqKey, _id }) => {
            return (
              <Draggable
                onStart={() => setIsScaleBlocked(true)}
                onStop={(_, data) => onMoveStop({ uniqKey, _id }, data)}
                key={uniqKey}
                defaultPosition={offset}
                scale={currentScale}
                defaultClassName={classes.Draggable}
              >
                <div>
                  <EditableFace
                    node={node}
                    svgClass={classes.Element}
                    onDelete={() => {
                      removeFace(uniqKey);
                      addFaceDeleteToCache({ uniqKey, _id });
                    }}
                  />
                </div>
              </Draggable>
            );
          })}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
