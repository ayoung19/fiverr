import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export const Popup: FC = () => {
  return (
    <Provider store={store}>
      <div>yo</div>
    </Provider>
  );
};
