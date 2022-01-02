import React, { FC } from "react";
import { TransitionGroup } from "react-transition-group";
import { useAppSelector } from "../utils";
import { Message } from "./Message";

export const Messages: FC = () => {
  const messages = useAppSelector((state) => state.messages);

  return (
    <TransitionGroup>
      {messages.map(({ id, text, type }, i) => (
        <Message key={id} id={id} text={text} index={i} type={type} />
      ))}
    </TransitionGroup>
  );
};
