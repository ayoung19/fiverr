document.querySelector("#sf").addEventListener("submit", function() {
    chrome.storage.sync.get("stopwatch-th", function (result) {
        chrome.storage.sync.set({ "stopwatch-th": result["stopwatch-th"] + 1 }, function () {});
        console.log("added")
    });
})