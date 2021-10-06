import React, { useState } from "react";
import SvgBuilder from "../../svgBuilder/SvgBuilder";
import Draggable, { DraggableData } from "react-draggable";
import classes from "./style.module.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { addFaceUpdateToCache, sendCache } from "../model.cache";
import { IFaceLocation } from "../../../interfaces/types.face";
import { useStore } from "effector-react";
import { $faces } from "../../faces/model.faces";
import Button from "../../../ui/buttons/Button";

export default function FacesBuildZone() {
  const faces = useStore($faces);
  const [isScaleBlocked, setIsScaleBlocked] = useState(false);
  const [currentScale, setCurrentScale] = useState(1);

  function onMoveStop(
    { _id, uniqKey }: IFaceLocation,
    { x, y }: DraggableData
  ) {
    setIsScaleBlocked(false);
    addFaceUpdateToCache({
      uniqKey,
      _id,
      offset: { x, y },
    });
  }

  return (
    <div className={classes.Container}>
      <Button
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
              >
                <div>
                  <SvgBuilder node={node} className={classes.Element} />
                </div>
              </Draggable>
            );
          })}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
