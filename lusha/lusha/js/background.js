chrome.storage.sync.get("profile-data", function (result) {
    if (result["profile-data"] == undefined) {
        chrome.storage.sync.set({ "profile-data": null }, function () {});
    }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == "scrape") {
        var payload = new FormData();
        payload.append("apikey", "abc1234");
        console.log(msg.url)
        payload.append("url", msg.url);

        fetch("https://services.leadcloud.fi/olli_test_api/", {
            method: "POST",
            body: payload
        })
        .then(res => res.json())
        .then(body => {
            if(body.contacts == undefined) {
                if (body.status == "html_required") {
                    chrome.tabs.sendMessage(sender.tab.id, { type: "get_html" });
                } else {
                    chrome.storage.sync.set({ "profile-data": null }, function () { });
                }
            } else {
                chrome.storage.sync.set({ "profile-data": body.contacts[0] }, function () { });
            }
        })
        .catch(err => {
            console.log(err);
        });
    } else if(msg.type == "send_html") {
        var payload = new FormData();
        payload.append("apikey", "abc1234");
        payload.append("url", msg.url);
        payload.append("html", msg.html);

        fetch("https://services.leadcloud.fi/olli_test_api/", {
            method: "POST",
            body: payload
        })
        .then(res => res.json())
        .then(body => {
            console.log(body);
        })
        .catch(err => {
            console.log(err);
        });
    }
});