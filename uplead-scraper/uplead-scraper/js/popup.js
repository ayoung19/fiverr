document.querySelector("#start").onclick = function () {
    chrome.runtime.sendMessage({ action: "start" }, function (response) {
        window.close();
    });
}

document.querySelector("#stop").onclick = function () {
    chrome.runtime.sendMessage({ action: "stop" }, function (response) {
        window.close();
    });
}

document.querySelector("#download").onclick = function () {
    chrome.storage.local.get("uplead-urls", function (result) {
        var arr = result["uplead-urls"];

        var csv = arr.join("\n");
        var download_anchor = document.createElement('a');
        download_anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        download_anchor.target = '_blank';
        download_anchor.download = 'links.csv';
        download_anchor.click();

        chrome.storage.local.set({ "uplead-urls": [] }, function () { });
    });
}