chrome.runtime.sendMessage({ type: "open-window" }, function (response) {
    window.close();
});