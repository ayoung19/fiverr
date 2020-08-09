chrome.storage.sync.get("spotify-bot-on", function (result) {
    change(result["spotify-bot-on"]);
});

chrome.storage.sync.get("spotify-bot-time", function (result) {
    var notify_time = result["spotify-bot-time"][0].split(":");

    document.querySelector("#time").value = result["spotify-bot-time"][0];

    flatpickr("#time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultHour: notify_time[0],
        defaultMinute: notify_time[1]
    })
});

chrome.storage.sync.get("spotify-bot-settings", function (result) {
    console.log(result)
    document.querySelector("#lower").value = result["spotify-bot-settings"][0];
    document.querySelector("#upper").value = result["spotify-bot-settings"][1];
    document.querySelector("#webhook").value = result["spotify-bot-settings"][2];
});

document.querySelector(".toggle").onclick = function() {
    if (document.querySelector("#cbx").checked) {
        chrome.storage.sync.set({ "spotify-bot-on": false }, function () { });
        chrome.browserAction.setBadgeText({ text: "Off" });
        chrome.browserAction.setBadgeBackgroundColor({ color: "#c23934" });
    } else {
        chrome.storage.sync.set({ "spotify-bot-on": true }, function () { });
        chrome.browserAction.setBadgeText({ text: "On" });
        chrome.browserAction.setBadgeBackgroundColor({ color: "#7dc37d" });
    }
}

document.querySelector("#save").onclick = function() {
    var arr = [document.querySelector("#lower").value, document.querySelector("#upper").value, document.querySelector("#webhook").value];
    chrome.storage.sync.set({ "spotify-bot-settings": arr }, function () {
        chrome.storage.sync.get("spotify-bot-time", function (result) {
            chrome.storage.sync.set({ "spotify-bot-time": [document.querySelector("#time").value, result["spotify-bot-time"][1]] }, function () {
                chrome.runtime.sendMessage({ type: "reload"});
                document.querySelector("#save").innerHTML = "Saved!"
            });
        });
    });
}

function change(state) {
    document.querySelector("#cbx").checked = state;
    
    if(state) {
        chrome.browserAction.setBadgeText({ text: "On" });
        chrome.browserAction.setBadgeBackgroundColor({ color: "#7dc37d" });
    } else {
        chrome.browserAction.setBadgeText({ text: "Off" });
        chrome.browserAction.setBadgeBackgroundColor({ color: "#c23934" });
    }
}