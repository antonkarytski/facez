import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonProps } from "./Button";
import classes from "./styles.module.scss";

type RemoveButtonProps = Omit<ButtonProps, "children" | "label">;

export default function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <Button onClick={onClick} className={classes.RemoveButton}>
      <FontAwesomeIcon icon={faTimes} />
    </Button>
  );
}
