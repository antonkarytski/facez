import React, { ReactNode, useState } from "react";
import Button, { ButtonProps } from "./Button";

type RequestButtonProps<R> = {
  onClick: () => Promise<R>;
  children?: (isOnLoading: boolean) => ReactNode;
} & Omit<ButtonProps, "onClick" | "children">;

export default function RequestButton<R>({
  onClick,
  children,
  label,
  ...buttonProps
}: RequestButtonProps<R>) {
  const [isOnLoading, setOnLoading] = useState(false);

  return (
    <Button
      onClick={() => {
        if (isOnLoading) return;
        setOnLoading(true);
        onClick().finally(() => {
          setOnLoading(false);
        });
      }}
      {...buttonProps}
    >
      {children ? children(isOnLoading) : isOnLoading ? "Loading..." : label}
    </Button>
  );
}
