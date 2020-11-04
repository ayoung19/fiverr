chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == "post") {
        console.log(msg.url, msg.title)
        fetch(`http://localhost:3000`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ url: msg.url, name: msg.title })
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }
});