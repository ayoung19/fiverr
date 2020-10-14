var i = 0;

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == "open-link") {
        console.log("Opening");

        if (i < document.querySelectorAll(".app-table__body__row").length) {
            window.open(document.querySelectorAll(".app-table__body__row")[i++].querySelector("a").href);
            chrome.runtime.sendMessage({ action: "opened-link" }, function (response) { });
        } else {
            var paginate = getNextPageButton();
            if (paginate != null) {
                paginate.click();
                i = 0;

                setTimeout(function () {
                    chrome.runtime.sendMessage({ action: "scraped" }, function (response) { });
                }, getRandomInt(4000, 6000));
            }
        }
    }

    if (msg.action == "scrape") {
        chrome.storage.local.get("uplead-urls", function (result) {
            var arr = result["uplead-urls"];
            console.log(arr);

            if (document.querySelector(".userCard__companyInfo-url-wrapper a") == null) {
                arr.push("NONE");
            } else {
                arr.push(document.querySelector(".userCard__companyInfo-url-wrapper a").href);
            }

            chrome.storage.local.set({ "uplead-urls": arr }, function () {
                chrome.runtime.sendMessage({ action: "scraped" }, function (response) {
                    window.close();
                });
            });
        });
    }
});

function getNextPageButton() {
    var buttons = document.querySelectorAll(".pagination-item");

    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].querySelector("a").getAttribute("aria-label") == "Go to next page") {
            return buttons[i];
        }
    }

    return null;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}