chrome.storage.sync.get("reddit-poster-settings", function (result) {
    console.log(result)
    document.querySelector("#lower").value = result["reddit-poster-settings"][0];
    document.querySelector("#upper").value = result["reddit-poster-settings"][1];
});

document.querySelector("#save").onclick = function () {
    var arr = [document.querySelector("#lower").value, document.querySelector("#upper").value];
    chrome.storage.sync.set({ "reddit-poster-settings": arr }, function () {
        document.querySelector("#save").innerHTML = "Saved!"
    });
}

document.querySelector("#start").onclick = function() {
    chrome.runtime.sendMessage({ type: "open-window" }, function (response) {
        window.close();
    });
}