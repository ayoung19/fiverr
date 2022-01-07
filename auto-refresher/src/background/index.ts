chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type == "getTabId") {
    sendResponse({ tabId: sender.tab.id });
  }
});

const initialSettings: Settings = {
  query: "",
  sleep: 1000,
  allTabs: false,
};

const initialCaller: Caller = {
  tabId: undefined,
};

chrome.storage.local.get("settings", ({ settings }) => {
  if (settings === undefined) {
    chrome.storage.local.set({
      settings: initialSettings,
    });
  }
});

chrome.storage.local.get("caller", ({ caller }) => {
  console.log(caller);
  if (caller === undefined) {
    chrome.storage.local.set({
      caller: initialCaller,
    });
  }
});
