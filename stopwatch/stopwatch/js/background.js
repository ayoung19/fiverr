var interval;
var audio = document.createElement('audio');
var source = document.createElement('source');

audio.setAttribute("preload", "auto");
audio.autobuffer = true;

source.type = 'audio/mpeg';
source.src = '../task-counted.mp3';

audio.appendChild(source);
audio.load;

init_on();

chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.type == "reload") {
        load();
    } else if(msg.type == "play") {
        audio.play();
    }
});

function init_on() {
    chrome.storage.local.get("stopwatch-on", function (result) {
        if (result["stopwatch-on"] == undefined) {
            chrome.storage.local.set({ "stopwatch-on": false }, function () {
                init_time();
            });
        } else {
            init_time();
        }
    });
}

function init_time() {
    chrome.storage.local.get("stopwatch-time", function (result) {
        if (result["stopwatch-time"] == undefined) {
            chrome.storage.local.set({ "stopwatch-time": 0 }, function () {
                init_rph();
            });
        } else {
            init_rph();
        }
    });
}

function init_rph() {
    chrome.storage.local.get("stopwatch-th", function (result) {
        if (result["stopwatch-th"] == undefined) {
            chrome.storage.local.set({ "stopwatch-th": 0 }, function () {
                load();
            });
        } else {
            load();
        }
    });
}

function load() {
    chrome.storage.local.get("stopwatch-on", function (result) {
        if (result["stopwatch-on"] == true) {
            interval = setInterval(function() {
                chrome.storage.local.get("stopwatch-time", function (result) {
                    console.log(result["stopwatch-time"] + 1);
                    chrome.storage.local.set({ "stopwatch-time": result["stopwatch-time"] + 1 }, function () { });
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
    });
}
