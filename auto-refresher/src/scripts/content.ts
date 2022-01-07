chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "reload") {
    location.reload();
  }
});

chrome.storage.local.get("settings", ({ settings }) => {
  chrome.storage.local.get("caller", ({ caller }) => {
    chrome.runtime.sendMessage({ type: "getTabId" }, ({ tabId }) => {
      if (caller.tabId && (settings.allTabs || tabId === caller.tabId)) {
        setTimeout(() => {
          chrome.storage.local.get("caller", ({ caller }) => {
            if (
              !document.documentElement.innerText
                .toLowerCase()
                .includes(settings.query.toLowerCase()) &&
              caller.tabId
            ) {
              location.reload();
            }
          });
        }, settings.sleep);
      }
    });
  });
});
