var interval;
init_on();

chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.type == "reload") {
        load();
    }
});

function init_on() {
    chrome.storage.sync.get("stopwatch-on", function (result) {
        if (result["stopwatch-on"] == undefined) {
            chrome.storage.sync.set({ "stopwatch-on": false }, function () {
                init_time();
            });
        } else {
            init_time();
        }
    });
}

function init_time() {
    chrome.storage.sync.get("stopwatch-time", function (result) {
        if (result["stopwatch-time"] == undefined) {
            chrome.storage.sync.set({ "stopwatch-time": 0 }, function () {
                init_rph();
            });
        } else {
            init_rph();
        }
    });
}

function init_rph() {
    chrome.storage.sync.get("stopwatch-th", function (result) {
        if (result["stopwatch-th"] == undefined) {
            chrome.storage.sync.set({ "stopwatch-th": 0 }, function () {
                load();
            });
        } else {
            load();
        }
    });
}

function load() {
    chrome.storage.sync.get("stopwatch-on", function (result) {
        if (result["stopwatch-on"] == true) {
            interval = setInterval(function() {
                chrome.storage.sync.get("stopwatch-time", function (result) {
                    console.log(result["stopwatch-time"] + 1);
                    chrome.storage.sync.set({ "stopwatch-time": result["stopwatch-time"] + 1 }, function () { });
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
    });
}
