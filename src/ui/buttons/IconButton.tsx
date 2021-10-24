import React, { ReactNode } from "react";
import Button, { ButtonProps } from "./Button";
import classes from "./styles.module.scss";
import cx from "classnames";

type IconButtonProps = { icon: ReactNode; textClassName?: string } & Omit<
  ButtonProps,
  "children"
>;

export default function IconButton({
  icon,
  label,
  className,
  textClassName,
  ...props
}: IconButtonProps) {
  return (
    <Button className={cx(classes.IconButton, className)} {...props}>
      {icon}
      <span className={textClassName}>{label}</span>
    </Button>
  );
}
