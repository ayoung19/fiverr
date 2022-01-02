import React, { FC, MouseEvent } from "react";
import { Action } from "./Action";

interface RemoveProps {
  disabled: boolean;
  onClick: (event: MouseEvent) => void;
}

export const Remove: FC<RemoveProps> = ({ disabled, onClick }) => {
  return (
    <Action onClick={onClick} disabled={disabled}>
      <i className="feather icon-trash-2" />
    </Action>
  );
};
