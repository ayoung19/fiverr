load();

function load() {
    var interval = setInterval(function () {
        if (document.querySelector(".submitTaskButton") != null) {
            clearInterval(interval);
            console.log("loaded");
            document.querySelector(".submitTaskButton").addEventListener("mousedown", function () {
                chrome.storage.local.get("stopwatch-th", function (result) {
                    chrome.storage.local.set({ "stopwatch-th": result["stopwatch-th"] + 1 }, function () { });
                    setTimeout(function() {
                        load();
                    }, 4000);
                    console.log("added");
                });
            })
        }
    }, 1000);
}