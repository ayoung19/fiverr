var main_view = document.querySelector("#on-facebook");
var redirect_view = document.querySelector("#not-on-facebook");

chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    if(tabs[0].url == "https://www.facebook.com/find-friends/browser/") {
        main_view.style.display = "block";
        redirect_view.style.display = "none";
    } else {
        main_view.style.display = "none";
        redirect_view.style.display = "block";
    }
});

document.querySelector("#redirect").onclick = function() {
    window.open("https://www.facebook.com/find-friends/browser/");
}

document.querySelector("#start").onclick = function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "start" });
    });
}