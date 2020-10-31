chrome.storage.local.get("css-customizer-text", function (result) {
    if (result["css-customizer-text"] == undefined) {
        var defaults = ["#121212",
                        "#212121",
                        "#363636",
                        "#4F4F4F",
                        "#1a2233",
                        "#8cbcd6",
                        "#F5F5F5",
                        "#EEEEEE",
                        "#E0E0E0",
                        "#BDBDBD",
                        "#FFA726",
                        "#FE504D",
                        "#4fd44f",
                        "#bd5ece",
                        "#dbaffd",
                        "#2490e9",
                        "#B3E5FC",
                        "#cf881c",
                        "#b7b7b7",
                        "#ffe014"];

        chrome.storage.sync.set({ "css-customizer-text": defaults }, function () {
            chrome.browserAction.setBadgeText({ text: "Off" });
            chrome.browserAction.setBadgeBackgroundColor({ color: "#c23934" });
        });
    }
});