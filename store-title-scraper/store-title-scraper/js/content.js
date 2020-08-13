if(window.location.href.indexOf("shopee") != -1) {
    load("._1NoI8_");
} else if(window.location.href.indexOf("lazada") != -1) {
    load(".c16H9d");
}

function load(class_name) {
    window.addEventListener("scroll", function () {
        var map = {};
        var titles = document.querySelectorAll(class_name);

        for (var i = 0; i < titles.length; i++) {
            var words = titles[i].innerText.split(" ");

            for (var j = 0; j < words.length; j++) {
                var word = words[j].toLowerCase();
                if(word.indexOf("#") == -1) {
                    if (map[word] == undefined) {
                        map[word] = 1;
                    } else {
                        map[word]++;
                    }
                }
            }
        }

        chrome.storage.local.set({ "store-title-counts": map }, function () { });
    });
}