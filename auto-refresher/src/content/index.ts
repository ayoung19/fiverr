chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "refresh") {
    location.reload();
  }
});

chrome.runtime.sendMessage({ type: "getTabId" }, (tabId) => {
  console.log("My tabId is", tabId);
});
