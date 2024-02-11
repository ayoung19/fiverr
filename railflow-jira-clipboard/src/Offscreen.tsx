import { useEffect, useRef } from "react";
import { MessageToOffscreen } from "./utils";

export const Offscreen = () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const read = () => {
    const { current } = ref;
    if (current === null) {
      return;
    }

    current.value = "";
    current.focus();
    document.execCommand("paste");
    return current.value;
  };

  const write = (value: string) => {
    const { current } = ref;

    if (current === null) {
      return;
    }

    current.value = value;
    current.select();
    document.execCommand("copy");
  };

  useEffect(() => {
    setInterval(() => {
      const current = read();

      chrome.runtime.sendMessage({ type: "clipboardValue", value: current });
    }, 1000);

    chrome.runtime.onMessage.addListener(
      (message: MessageToOffscreen, sender, sendResponse) => {
        if (message.type === "copy") {
          write(message.value);
          sendResponse(true);
        }

        return true;
      }
    );
  }, []);

  return <textarea ref={ref}></textarea>;
};
