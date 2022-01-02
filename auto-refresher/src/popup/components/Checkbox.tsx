import React, { FC, MouseEvent } from "react";
import { classNames } from "../utils";

interface CheckboxProps {
  checked: boolean;
  onClick: (event: MouseEvent) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onClick }) => {
  return (
    <label
      htmlFor=""
      className={classNames(
        "transition-all w-4 h-4 rounded flex justify-center items-center cursor-pointer hover:border-brand-400",
        checked ? "bg-brand-400" : "bg-white border border-border-base"
      )}
      onClick={onClick}
    >
      <span
        className={classNames(
          "transition w-1 h-2 border-b-2 border-r-2 border-white transform rotate-45",
          checked ? "scale-100" : "scale-0"
        )}
      ></span>
      <input type="checkbox" className="hidden" />
    </label>
  );
};
