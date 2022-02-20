import React, { FC, useEffect, useState } from "react";
import { EuiPanel, EuiButton } from "@elastic/eui";

export const App: FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("store", ({ store }) => {
      if (store !== undefined) {
        setActive(store);
      }
    });
  }, []);

  return (
    <EuiPanel hasShadow={false} hasBorder={false} color="transparent">
      <EuiButton
        fill={active}
        color={active ? "success" : "danger"}
        onClick={() => {
          setActive((prevState) => {
            chrome.storage.local.set({ store: !prevState }, () => {
              console.log("lmao");
              chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                  chrome.tabs.sendMessage(Number(tab.id), { type: "recheck" });
                });
              });
            });
            return !prevState;
          });
        }}
        fullWidth={true}
      >
        {active ? "Active" : "Inactive"}
      </EuiButton>
    </EuiPanel>
  );
};
