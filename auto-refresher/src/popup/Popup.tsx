import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Messages } from "./components/Messages";
import { Table } from "./components/Table";

export const Popup: FC = () => {
  return (
    <Provider store={store}>
      <Messages />
      <Table rowHeight={40} />
    </Provider>
  );
};
