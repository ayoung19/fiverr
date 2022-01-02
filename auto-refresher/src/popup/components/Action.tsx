import React, { FC, ReactNode, MouseEvent } from "react";
import { classNames } from "../utils";

interface ActionProps {
  children: ReactNode;
  disabled: boolean;
  onClick: (event: MouseEvent) => void;
}

export const Action: FC<ActionProps> = ({ children, disabled, onClick }) => {
  const handleClick = (event: MouseEvent) => {
    if (disabled) {
      event.stopPropagation();
    } else {
      onClick(event);
    }
  }
  
  return (
    <span
      className={classNames(
        "rounded px-2 py-1 text-base",
        disabled ? "cursor-not-allowed text-black-50" : "cursor-pointer text-black-100 hover:text-black-500 hover:bg-border-light"
      )}
      onClick={handleClick}
    >
      {children}
    </span>
  );
};
