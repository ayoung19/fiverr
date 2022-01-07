chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("dsffsd")
  if (request.type === "reload") {
    chrome.storage.local.get("caller", ({ caller }) => {
      if (caller.tabId) {
        chrome.storage.local.get("settings", ({ settings }) => {
          if (settings.allTabs) {
            setTimeout(() => {
              location.reload();
            }, 0);
          }
        });
      }
    });
  }
});

chrome.storage.local.get("caller", ({ caller }) => {
  if (caller.tabId) {
    chrome.storage.local.get("settings", ({ settings }) => {
      if (settings.allTabs) {
        setTimeout(() => {
          location.reload();
        }, settings.sleep);
      }
    });
  }
});

chrome.runtime.sendMessage({ type: "getTabId" }, (tabId) => {
  console.log("My tabId is", tabId);
});
