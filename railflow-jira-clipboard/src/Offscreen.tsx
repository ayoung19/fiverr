import { useEffect, useRef } from "react";

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
    console.log(value.length)
    const { current } = ref;

    if (current === null) {
      return;
    }

    current.value = value;
    console.log("after value set:", current.value.length)
    current.select();
    document.execCommand("copy");
  };

  useEffect(() => {
    setInterval(() => {
      const current = read();

      chrome.runtime.sendMessage({type: "clipboardValue", value: current})
    }, 1000);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "copy") {
        write(message.value);
      }
    })
  }, []);

  return <textarea ref={ref}></textarea>;
};
