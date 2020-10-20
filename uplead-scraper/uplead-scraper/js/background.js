chrome.storage.local.set({ "uplead-urls": [] }, function () { });

var running = false;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == "start") {
        running = true;
        setTimeout(function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "open-link" }, function (response) { });
            });
        }, 2000);
    }

    if (msg.action == "opened-link" && running) {
        setTimeout(function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, function (response) { });
            });
        }, 3000);
    }

    if (msg.action == "scraped" && running) {
        setTimeout(function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "open-link" }, function (response) { });
            });
        }, 1000);
    }

    if (msg.action == "stop") {
        running = false;
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}