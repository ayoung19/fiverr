chrome.storage.sync.get("reddit-poster-settings", function (result) {
    if (result["reddit-poster-settings"] == undefined) {
        chrome.storage.sync.set({ "reddit-poster-settings": ["", ""] }, function () { });
    }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == "open-window") {
        window.open("https://www.reddit.com");
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            start_script(tabs[0].id, 5000);
        });

        return true;
    }

    if(msg.type == "restart") {
        chrome.storage.sync.get("reddit-poster-settings", function (result) {
            console.log(parseInt(result["reddit-poster-settings"][0]) * 60000, parseInt(result["reddit-poster-settings"][1]) * 60000)
            start_script(sender.tab.id, getRandomInt(parseFloat(result["reddit-poster-settings"][0]) * 60000, parseFloat(result["reddit-poster-settings"][1]) * 60000));
        });
    }
});

function start_script(tab_id, delay) {
    setTimeout(function () {
        chrome.tabs.sendMessage(tab_id, { type: "start" });
    }, delay);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}