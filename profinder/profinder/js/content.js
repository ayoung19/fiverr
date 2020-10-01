chrome.runtime.sendMessage({ type: "scrape", url: window.location.href });

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == "get_html") {
        if(document.querySelector("html") != null) {
            setTimeout(function() {
                var s = new XMLSerializer();
                var d = document;
                var html = s.serializeToString(d);

                chrome.runtime.sendMessage({ type: "send_html", url: window.location.href, html: html });
            }, 2000);
        }
    }
});