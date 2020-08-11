console.log("dfdfssdfd");

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == "start") {
        console.log("Create Post");
        document.querySelectorAll("._1x6pySZ2CoUnAfsFhGe7J1")[2].click();

        setTimeout(function() {
            console.log("View Drafts");
            document.querySelector(".PiO8QDmoJoOL2sDjJAk4C").click();

            setTimeout(function() {
                if (document.querySelector("._2ffvzlYi6yd1I-j5ndDKFm").children.length > 0) {
                    document.querySelector("._2ffvzlYi6yd1I-j5ndDKFm").children[0].click();
                    setTimeout(function () {
                        chrome.runtime.sendMessage({ type: "restart" });
                        document.querySelector("._18Bo5Wuo3tMV-RDB8-kh8Z").click();
                    }, getRandomInt(1200, 2000));
                }
            }, getRandomInt(1200, 2000));
        }, getRandomInt(1200, 2000));
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}