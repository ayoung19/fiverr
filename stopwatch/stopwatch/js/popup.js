var interval;

load();

function load() {
    chrome.storage.sync.get("stopwatch-time", function (result) {
        var time = result["stopwatch-time"];
        document.querySelector("#tiempoCero").innerHTML = time;
        init_th(time);
    });
}

function init_th(time) {
    chrome.storage.sync.get("stopwatch-th", function (result) {
        document.querySelector("#tareasCero").innerHTML = result["stopwatch-th"];
        
        if (result["stopwatch-th"] == 0) {
            document.querySelector("#rph").innerHTML = 0;
        } else {
            document.querySelector("#rph").innerHTML = time / result["stopwatch-th"];
        }
        
        stopwatch(time);
    });
}

function stopwatch(time) {
    chrome.storage.sync.get("stopwatch-on", function (result) {
        if (result["stopwatch-on"] == true) {
            interval = setInterval(function () {
                time++;
                document.querySelector("#tiempoCero").innerHTML = time;
                document.querySelector("#rph").innerHTML = time / parseInt(document.querySelector("#tareasCero").innerHTML);
            }, 1000);
        }
    });
}

document.querySelector("#start").onclick = function() {
    chrome.storage.sync.set({ "stopwatch-on": true }, function () {
        chrome.runtime.sendMessage({ type: "reload" }, function() {
            load();
        });
    });
}

document.querySelector("#stop").onclick = function () {
    chrome.storage.sync.set({ "stopwatch-on": false }, function () {
        chrome.runtime.sendMessage({ type: "reload" }, function() {
            clearInterval(interval);
        });
    });
}

document.querySelector("#reset").onclick = function () {
    chrome.storage.sync.set({ "stopwatch-on": false }, function () {
        chrome.storage.sync.set({ "stopwatch-time": 0 }, function () {
            chrome.storage.sync.set({ "stopwatch-th": 0 }, function () {
                chrome.runtime.sendMessage({ type: "reload" }, function () {
                    clearInterval(interval);
                    document.querySelector("#tiempoCero").innerHTML = 0;
                    document.querySelector("#tareasCero").innerHTML = 0;
                    document.querySelector("#rph").innerHTML = 0;
                });
            });
        });
    });
}