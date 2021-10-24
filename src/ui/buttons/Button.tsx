import React, { ReactNode } from "react";
import classes from "./styles.module.scss";
import cx from "classnames";

export type ButtonProps = {
  onClick?: () => void;
  label?: string;
  className?: string;
  children?: ReactNode;
};

export default function Button({
  label,
  onClick,
  className,
  children,
}: ButtonProps) {
  return (
    <button className={cx(classes.Button, className)} onClick={onClick}>
      {children || label}
    </button>
  );
}
