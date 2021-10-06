import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import classes from "./style.module.scss";
import SvgBuilder from "../svgBuilder/SvgBuilder";
import { useStore } from "effector-react";
import { $faces } from "../faces/model.faces";

export default function FacesShowZone() {
  const faces = useStore($faces);

  return (
    <div className={classes.Container}>
      <TransformWrapper
        initialScale={0.5}
        centerOnInit
        centerZoomedOut
        minScale={0.05}
        limitToBounds={false}
      >
        <TransformComponent wrapperClass={classes.FaceWrap}>
          {faces.map(({ node, offset, uniqKey, _id }) => {
            const style = {
              transform: `translateX(${offset.x}px) translateY(${offset.y}px)`,
            };
            return <SvgBuilder node={node} style={style} key={uniqKey} />;
          })}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
