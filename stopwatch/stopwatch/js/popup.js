var interval;

load();

function load() {
    chrome.storage.local.get("stopwatch-time", function (result) {
        var time = result["stopwatch-time"];
        document.querySelector("#tiempoCero").innerHTML = convert(time);
        init_th(time);
    });
}

function init_th(time) {
    chrome.storage.local.get("stopwatch-th", function (result) {
        document.querySelector("#tareasCero").innerHTML = result["stopwatch-th"];
        
        if (result["stopwatch-th"] == 0) {
            document.querySelector("#rph").innerHTML = 0;
        } else {
            document.querySelector("#rph").innerHTML = (time / result["stopwatch-th"]).toFixed(2);
        }
        
        stopwatch(time);
    });
}

function stopwatch(time) {
    chrome.storage.local.get("stopwatch-on", function (result) {
        if (result["stopwatch-on"] == true) {
            interval = setInterval(function () {
                time++;
                document.querySelector("#tiempoCero").innerHTML = convert(time);
                document.querySelector("#rph").innerHTML = (time / parseInt(document.querySelector("#tareasCero").innerHTML)).toFixed(2);
            }, 1000);
        }
    });
}

function convert(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

document.querySelector("#start").onclick = function() {
    chrome.storage.local.set({ "stopwatch-on": true }, function () {
        chrome.runtime.sendMessage({ type: "reload" }, function() {
            load();
        });
    });
}

document.querySelector("#stop").onclick = function () {
    chrome.storage.local.set({ "stopwatch-on": false }, function () {
        chrome.runtime.sendMessage({ type: "reload" }, function() {
            clearInterval(interval);
        });
    });
}

document.querySelector("#reset").onclick = function () {
    chrome.storage.local.set({ "stopwatch-on": false }, function () {
        chrome.storage.local.set({ "stopwatch-time": 0 }, function () {
            chrome.storage.local.set({ "stopwatch-th": 0 }, function () {
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

document.querySelector("#add_one").onclick = function() {
    chrome.storage.local.get("stopwatch-th", function (result) {
        chrome.storage.local.set({ "stopwatch-th": result["stopwatch-th"] + 1 }, function () {
            document.querySelector("#tareasCero").innerHTML = parseInt(document.querySelector("#tareasCero").innerHTML) + 1;
        });
    });
}

document.querySelector("#subtract_one").onclick = function () {
    chrome.storage.local.get("stopwatch-th", function (result) {
        chrome.storage.local.set({ "stopwatch-th": result["stopwatch-th"] - 1 }, function () {
            document.querySelector("#tareasCero").innerHTML = parseInt(document.querySelector("#tareasCero").innerHTML) - 1;
        });
    });
}