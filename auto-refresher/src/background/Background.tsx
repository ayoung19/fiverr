import React, { FC, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

// TODO: Make sure this mutex works correctly or if it's even needed.
class Mutex {
  current = Promise.resolve();
  lock = () => {
    let _resolve: () => void;
    const p = new Promise<void>((resolve) => {
      _resolve = () => resolve();
    });
    // Caller gets a promise that resolves when the current outstanding
    // lock resolves
    const rv = this.current.then(() => _resolve);
    // Don't allow the next request until the new promise is done
    this.current = p;
    // Return the new promise
    return rv;
  };
}

export const Background: FC = () => {
  let history: HistoryItem[];
  let favorited: string[];
  let current: string;
  const mutex = new Mutex();
  const ref = useRef<HTMLTextAreaElement>();

  const critical = async (callback: () => void) => {
    const unlock = await mutex.lock();
    callback();
    unlock();
  };

  const save = () => {
    chrome.storage.local.set({
      storage: { history: history, favorited: favorited },
    });
  };

  const read = () => {
    const { current: textarea } = ref;
    // TODO: Possible null value of textarea? maybe do some kind of "try again in 1s"
    textarea.value = "";
    textarea.focus();
    document.execCommand("paste");
    return textarea.value;
  };

  const write = (value: string) => {
    const { current: textarea } = ref;
    textarea.value = value;
    textarea.select();
    document.execCommand("copy");
    console.log(textarea.value);
  };

  useEffect(() => {
    // history = [];
    // favorited = [];
    // save();
    chrome.storage.local.get("storage", ({ storage }) => {
      history = (storage && storage.history) || [];
      favorited = (storage && storage.favorited) || [];
      current = read();

      // TODO: Clear interval on unmount?
      setInterval(() => {
        critical(() => {
          const newest = read();
          if (current !== newest) {
            current = newest;
            history.push({
              id: uuidv4(),
              date: new Date(),
              value: current,
            });
            save();
          }
        });
      }, 1000);
    });


    // TODO: Figure out better way to handle message payload typing.
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "copy") {
        critical(() => {
          console.log(current, message.payload)
          current = message.payload;
          write(current);
        });
      }

      // TODO: Figure out a better data flow/logic for actions that are also being done in the UI.
      if (message.type === "removeItems") {
        critical(() => {
          const idsSet = new Set(message.payload);
          const favoritedSet = new Set(favorited);

          history = history.filter(({ id }) => favoritedSet.has(id) || !idsSet.has(id));
          
          save();
        });
      }

      if (message.type === "favoriteItems") {
        critical(() => {
          const idsSet = new Set(message.payload);
          const favoritedSet = new Set(favorited);

          favorited = message.payload.filter((id: string) => favoritedSet.has(id)).length < message.payload.length
            ? favorited.concat(message.payload.filter((id: string) => !favoritedSet.has(id)))
            : favorited.filter((id) => !idsSet.has(id));

          save();
        });
      }

      return false;
    });
  }, []);

  return <textarea ref={ref}></textarea>;
};
