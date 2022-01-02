import React from "react";
import { useAppDispatch } from "../utils";
import { updateSearch } from "../store/actions";

export const Search = () => {
  const dispatch = useAppDispatch();

  const changeHandler = (event) => {
    dispatch(updateSearch(event.target.value));
  };

  return (
    <div className="relative w-52">
      <input
        className="transition rounded border border-border-base pl-3 pr-8 py-1.5 outline-none hover:border-brand-400 focus:border-brand-400 w-full"
        placeholder="Search"
        type="text"
        onChange={changeHandler}
      />
      <i className="feather icon-search text-border-base text-base absolute right-0 top-0 flex items-center w-5 h-full mr-1.5"></i>
    </div>
  );
};
