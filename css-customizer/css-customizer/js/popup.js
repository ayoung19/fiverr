var defaults = [
    "#121212",
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
    "#ffe014"
];

chrome.storage.local.get("css-customizer-settings", function (result) {
    var settings = result["css-customizer-settings"];
    if (settings) {
        for(var i = 0; i < settings.length; i++) {
            document.querySelector("body").innerHTML += `
            <article>
                <input type="color" value=${settings[i]} />
                <button>reset</button>
            </article>`;
        }

        document.querySelectorAll("button").forEach(function(el, i) {
            el.onclick = function() {
                console.log("fdsfddfs")
                this.parentElement.querySelector("input").value = defaults[i];
            }
        });

        var button = document.createElement("button");
        button.id = "save";
        button.innerHTML = "save";
        document.querySelector("body").appendChild(button);

        document.querySelector("#save").onclick = function () {
            chrome.storage.local.set({ "css-customizer-settings": Array.from(document.querySelectorAll("input")).map(el => el.value) }, function () {
                window.close();
            });
        }
    }
});