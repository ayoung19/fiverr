import { v4 as uuidv4 } from "uuid";
import { Type } from "../enums";
import {
  AddMessage,
  RemoveMessage,
  Hydrate,
  ToggleChecked,
  FavoriteItems,
  RemoveItems,
  CheckAll,
  UpdateSearch
} from "./types";

export const addMessage = (type: Type, text: string): AddMessage => ({
  type: "addMessage",
  message: {
    id: uuidv4(),
    type: type,
    text: text,
  },
});

export const removeMessage = (): RemoveMessage => ({
  type: "removeMessage",
});

export const hydrate = (history: HistoryItem[], favorited: string[]): Hydrate => ({
  type: "hydrate",
  history: history,
  favorited: favorited,
});

export const toggleChecked = (id: string): ToggleChecked => ({
  type: "toggleChecked",
  id: id,
});

export const favoriteItems = (ids: string[]): FavoriteItems => ({
  type: "favoriteItems",
  ids: ids,
});

export const removeItems = (ids: string[]): RemoveItems => ({
  type: "removeItems",
  ids: ids,
});

export const checkAll = (): CheckAll => ({
  type: "checkAll",
});

export const updateSearch = (search: string): UpdateSearch => ({
  type: "updateSearch",
  search: search,
});
