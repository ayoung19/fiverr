import React, { FC, useEffect, useRef, useState } from "react";
import { hydrate } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../utils";
import { Search } from "./Search";
import { TableRow } from "./TableRow";
import { Favorite } from "./Favorite";
import { Remove } from "./Remove";
import { Checkbox } from "./Checkbox";
import { favoriteItems, removeItems, checkAll } from "../store/actions";

interface TableProps {
  rowHeight: number;
}

export const Table: FC<TableProps> = ({ rowHeight }) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);
  const history = useAppSelector((state) => state.history);
  const checked = useAppSelector((state) => state.checked);
  const [range, setRange] = useState([0, 0]);
  const rangeRef = useRef(range);

  const filtered = history.filter(({ value }) => value.includes(search));

  useEffect(() => {
    chrome.storage.local.get("storage", (result) => {
      const history = result["storage"].history.reverse() || [];
      const favorited = result["storage"].favorited;
      console.log(history, favorited);
      dispatch(hydrate(history, favorited));
    });
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      console.log("add listener");
      updateRange();
      document.addEventListener("scroll", updateRange);
    }
  }, [history]);

  const updateRange = () => {
    const prev = rangeRef.current;
    const curr = getRange();

    if (prev[0] !== curr[0] || prev[1] !== curr[1]) {
      setRange(curr);
      rangeRef.current = curr;
    }
  };

  const getRange = () => {
    const row = Math.floor(document.documentElement.scrollTop / rowHeight);
    const elems = Math.floor(window.innerHeight / rowHeight);

    const renderStart = Math.max(row - elems + 1, 0);
    const renderLength = 3 * elems;

    return [renderStart, renderStart + renderLength];
  };

  
  console.log(checked, history);

  const checkAllHandler = () => {
    dispatch(checkAll());
  }

  const favoriteCheckedHandler = () => {
    chrome.runtime.sendMessage({ type: "favoriteItems", payload: checked });
    dispatch(favoriteItems(checked));
  }

  const removeCheckedHandler = () => {
    chrome.runtime.sendMessage({ type: "removeItems", payload: checked });
    dispatch(removeItems(checked));
  }

  return (
    <div style={{ height: `${filtered.length * rowHeight}px` }}>
      <Search />
      <div
        className="flex items-center"
        style={{
          height: `${rowHeight}px`,
        }}
      >
        <div className="w-col1 inline-block px-4">
          <Checkbox checked={checked.length > 0} onClick={checkAllHandler} />
        </div>
        <div className="w-col3 inline-block px-2">
          <Favorite
            favorited={false}
            disabled={checked.length === 0}
            onClick={favoriteCheckedHandler}
          />
          <Remove
            disabled={checked.length === 0}
            onClick={removeCheckedHandler}
          />
        </div>
      </div>
      {filtered.slice(...range).map(({ id, value }, i) => (
        <TableRow
          key={id}
          id={id}
          index={range[0] + i}
          value={value}
          checked={checked.includes(id)}
          rowHeight={rowHeight}
        />
      ))}
    </div>
  );
};
