import React, { FC, useRef } from "react";
import { removeMessage } from "../store/actions";
import { CSSTransition } from "react-transition-group";
import { classNames, useAppDispatch } from "../utils";
import { Type } from "../enums";

interface MessageProps {
  id: string;
  text: string;
  index: number;
  type: Type;
}

export const Message: FC<MessageProps> = ({ text, index, type, ...props }) => {
  const dispatch = useAppDispatch();
  const nodeRef = useRef();

  const TYPE_TO_CLASSNAME = {
    [Type.success]: "icon-check-circle text-green-300",
    [Type.error]: "icon-x-circle text-red-300",
    [Type.warning]: "icon-alert-circle text-yellow-300",
    [Type.info]: "icon-info text-blue-300",
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={300}
      classNames="notification"
      onEntered={() => {
        setTimeout(() => {
          dispatch(removeMessage());
        }, 2000);
      }}
      unmountOnExit
      {...props}
    >
      <div
        ref={nodeRef}
        className="transition-all ease-default duration-300 fixed right-4 z-10 px-4 py-2 bg-white rounded text-brand-text shadow-toast"
        style={{
          top: `${16 + index * 50}px`,
        }}
      >
        <i className={classNames("feather mr-3", TYPE_TO_CLASSNAME[type])} />
        <span>{text}</span>
      </div>
    </CSSTransition>
  );
};
