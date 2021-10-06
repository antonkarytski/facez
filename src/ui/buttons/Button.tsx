import React from "react";
import classes from "./styles.module.scss";
import cx from "classnames";

export type ButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
};

export default function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button className={cx(classes.Button, className)} onClick={onClick}>
      {label}
    </button>
  );
}
