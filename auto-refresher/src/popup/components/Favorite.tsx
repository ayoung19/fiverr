import React, { FC, MouseEvent } from "react";
import { Action } from "./Action";
import { classNames } from "../utils";

interface FavoriteProps {
  favorited: boolean;
  disabled: boolean;
  onClick: (event: MouseEvent) => void;
}

export const Favorite: FC<FavoriteProps> = ({ favorited, disabled, onClick }) => {
  return (
    <Action disabled={disabled} onClick={onClick}>
      <i
        className={classNames(
          "feather",
          favorited ? "icon-star-on text-yellow-500" : "icon-star"
        )}
      />
    </Action>
  );
};
