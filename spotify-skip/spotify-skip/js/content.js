var count = 0;
var same_word = "";
var same_time = 0;

chrome.storage.local.get("spotify-bot-on", function (result) {
    if (result["spotify-bot-on"] == true) {
        setTimeout(load, 1000);
    }
});

function load() {
    chrome.storage.local.get("spotify-bot-settings", function (result) {
        if (result["spotify-bot-settings"] != undefined && valid(result["spotify-bot-settings"])) {
            var lower = parseInt(result["spotify-bot-settings"][0]);
            var upper = parseInt(result["spotify-bot-settings"][1]);

            setTimeout(function () {
                document.querySelectorAll(".player-controls__buttons .control-button")[2].click();
                loop();
            }, 2000);

            var random = getRandomInt(lower, upper);

            var interval = setInterval(function () {

                //ANTI 9 SEC BUG
                if (same_word == document.querySelector(".playback-bar div").innerText) {
                    same_time++;
                } else {
                    same_time = 0;
                }

                if (same_time >= 500) {
                    document.querySelectorAll(".player-controls__buttons .control-button")[3].click();
                    document.querySelector(".playback-bar div").innerHTML = "0:00";
                    random = getRandomInt(lower, upper);
                    same_time = 0;
                    console.log("NAV BUG 9 SEC");
                }

                same_word = document.querySelector(".playback-bar div").innerText;
                //

                if (toSec(document.querySelector(".playback-bar div").innerText.split(":")) > random) {
                    document.querySelectorAll(".player-controls__buttons .control-button")[3].click();
                    document.querySelector(".playback-bar div").innerHTML = "0:00";
                    random = getRandomInt(lower, upper);

                    chrome.storage.local.get("spotify-bot-skips", function (result2) {
                        chrome.storage.local.set({ "spotify-bot-skips": result2["spotify-bot-skips"] + 1 }, function () { });
                    });
                }
            }, 100);
        }
    });
}

function loop() {
    var data = document.querySelectorAll(".player-controls__buttons .control-button")[4].getAttribute("data-testid");
    if (data == "control-button-repeat-one") {
        return;
    }

    if (data == "control-button-no-repeat" || data == "control-button-repeat") {
        document.querySelectorAll(".player-controls__buttons .control-button")[4].click();
        setTimeout(loop, 2000);
    }
}

function valid(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
            return false;
        }
    }
    return true;
}

function toSec(time) {
    return parseInt(time[0]) * 60 + parseInt(time[1]);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
