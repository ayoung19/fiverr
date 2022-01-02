import React, { FC, MouseEvent, useEffect, useState } from "react";
import { classNames, useAppDispatch, useAppSelector } from "../utils";
import { Type } from "../enums";
import { Checkbox } from "./Checkbox";
import { Favorite } from "./Favorite";
import { Remove } from "./Remove";
import Tippy from "@tippyjs/react";
import { addMessage, toggleChecked, favoriteItems, removeItems } from "../store/actions";

interface TableRowProps {
  id: string;
  index: number;
  value: string;
  checked: boolean;
  rowHeight: number;
}

export const TableRow: FC<TableRowProps> = ({ id, index, value, checked, rowHeight }) => {
  const dispatch = useAppDispatch();
  const favorited = useAppSelector((state) => state.favorited);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (flash) {
      setTimeout(() => {
        setFlash(false);
      }, 1000);
    }
  }, [flash]);

  const copyHandler = () => {
    if (!flash) {
      chrome.runtime.sendMessage({ type: "copy", payload: value });
      setFlash(true);
      dispatch(addMessage(Type.success, "Item has been copied to clipboard!"));
    }
  };

  const checkHandler = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleChecked(id));
  }

  const favoriteHandler = (event: MouseEvent) => {
    event.stopPropagation();
    chrome.runtime.sendMessage({ type: "favoriteItems", payload: [id] });
    dispatch(favoriteItems([id]));
  }

  const removeHandler = (event: MouseEvent) => {
    event.stopPropagation();
    chrome.runtime.sendMessage({ type: "removeItems", payload: [id] });
    dispatch(removeItems([id]));
  }

  return (
    <Tippy
      content={
        <span className="bg-bg-black bg-opacity-75 text-white px-2 py-1 rounded">
          Click to copy
        </span>
      }
      delay={[750, null]}
    >
      <div
        className={classNames(
          "absolute transition duration-300 border-t border-gray-100 cursor-pointer transform scale-100 flex items-center",
          checked ? "bg-bg-light" : "hover:bg-bg-lighter",
          flash ? "flash" : ""
        )}
        onClick={copyHandler}
        style={{
          transform: `translateY(${rowHeight * index}px)`,
          height: `${rowHeight}px`,
        }}
      >
        <div className="w-col1 inline-block px-4">
          <Checkbox checked={checked} onClick={checkHandler} />
        </div>
        <div className="w-col2 inline-block px-4 truncate select-none text-brand-text">
          {value.replace("\n", "")}
        </div>
        <div className="w-col3 inline-block">
          <Favorite
            favorited={favorited.includes(id)}
            disabled={false}
            onClick={favoriteHandler}
          />
          <Remove disabled={favorited.includes(id)} onClick={removeHandler} />
        </div>
      </div>
    </Tippy>
  );
};
