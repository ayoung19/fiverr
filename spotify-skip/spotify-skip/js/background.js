chrome.storage.sync.get("spotify-bot-on", function (result) {
    if (result["spotify-bot-on"] == undefined) {
        chrome.storage.sync.set({ "spotify-bot-on": false }, function () {
            chrome.browserAction.setBadgeText({ text: "Off" });
            chrome.browserAction.setBadgeBackgroundColor({ color: "#c23934" });
        });
    }
});

chrome.storage.sync.get("spotify-bot-settings", function (result) {
    if (result["spotify-bot-settings"] == undefined) {
        chrome.storage.sync.set({ "spotify-bot-settings": ["", "", ""] }, function () { });
    }
});

chrome.storage.sync.get("spotify-bot-time", function (result) {
    if (result["spotify-bot-time"] == undefined) {
        chrome.storage.sync.set({ "spotify-bot-time": ["12:00", Date.now()] }, function () {
            load();
        });
    } else {
        load();
    }
});

chrome.storage.sync.get("spotify-bot-skips", function (result) {
    if (result["spotify-bot-skips"] == undefined) {
        chrome.storage.sync.set({ "spotify-bot-skips": 0 }, function () { });
    }
});

var interval;

chrome.runtime.onMessage.addListener(function(msg) {
    if(msg.type == "reload") {
        reload();
    }
});

function load() {
    chrome.storage.sync.get("spotify-bot-time", function (result) {
        var notify_time = result["spotify-bot-time"][0].split(":");
        var last = new Date(result["spotify-bot-time"][1]);

        last.setHours(notify_time[0]);
        last.setMinutes(notify_time[1]);
        last.setSeconds(0);

        interval = setInterval(function () {
            chrome.storage.sync.get("spotify-bot-skips", function (result3) {
                console.log(Date.now() - last.getTime(), result3["spotify-bot-skips"])
            });
            if (Date.now() - last.getTime() > 86400000) {
                chrome.storage.sync.get("spotify-bot-settings", function (result2) {
                    if (result2["spotify-bot-settings"][2] != "") {
                        chrome.storage.sync.get("spotify-bot-skips", function (result3) {
                            var request = new XMLHttpRequest();

                            var params = {
                                content: `${result3["spotify-bot-skips"]} skips`
                            }

                            request.open("POST", result2["spotify-bot-settings"][2]);
                            request.setRequestHeader('Content-type', 'application/json');

                            request.send(JSON.stringify(params));

                            chrome.storage.sync.set({ "spotify-bot-time": [result["spotify-bot-time"][0], Date.now()] }, function () { });
                            chrome.storage.sync.set({ "spotify-bot-skips": 0 }, function () { });
                            reload();
                        });
                    }
                });
            }
        }, 10000)
    });
}

function reload() {
    clearInterval(interval);
    load();
}
