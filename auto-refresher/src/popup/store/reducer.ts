import { ApplicationState, ApplicationAction } from "./types";

export const initialState: ApplicationState = {
  messages: [],
  history: [],
  favorited: [],
  checked: [],
  search: "",
};

const reducer = (state = initialState, action: ApplicationAction): ApplicationState => {
  switch (action.type) {
    case "addMessage":
      return {
        ...state,
        messages: state.messages.concat(action.message),
      };
    case "removeMessage":
      return {
        ...state,
        messages: state.messages.slice(1),
      };
    case "hydrate":
      return {
        ...state,
        history: action.history,
        favorited: action.favorited,
      };
    case "toggleChecked":
      return {
        ...state,
        checked: state.checked.includes(action.id)
          ? state.checked.filter((id) => id !== action.id)
          : state.checked.concat(action.id),
      };
    case "favoriteItems": {
      const ids = new Set(action.ids);
      const favorited = new Set(state.favorited);
      return {
        ...state,
        favorited: action.ids.filter((id) => favorited.has(id)).length < action.ids.length
          ? state.favorited.concat(action.ids.filter((id) => !favorited.has(id)))
          : state.favorited.filter((id) => !ids.has(id)),
      };
    }
    case "removeItems": {
      const ids = new Set(action.ids);
      const favorited = new Set(state.favorited);
      return {
        ...state,
        history: state.history.filter(({ id }) => favorited.has(id) || !ids.has(id)),
        checked: state.checked.filter((id) => !ids.has(id)),
      };
    }
    case "checkAll":
      return {
        ...state,
        checked: state.checked.length === 0
          ? state.history.map(({ id }) => id)
          : []
      }
    case "updateSearch":
      return {
        ...state,
        search: action.search,
      }
    default:
      return state;
  }
};

export default reducer;
