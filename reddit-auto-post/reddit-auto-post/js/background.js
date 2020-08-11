chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == "open-window") {
        window.open("https://www.reddit.com");
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            start_script(tabs[0].id, 5000);
        });

        return true;
    }

    if(msg.type == "restart") {
        start_script(sender.tab.id, getRandomInt(450000, 500000));
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