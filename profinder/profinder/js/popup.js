function show(id) {
    document.querySelectorAll("#content div").forEach(function(item) {
        if(item.id == id) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].url.includes("linkedin.com")) {
        chrome.storage.sync.get("profinder-key", function (result) {
            var payload = new FormData();
            payload.append("apikey", result["profinder-key"]);
            payload.append("url", tabs[0].url);

            fetch("https://services.leadcloud.fi/olli_test_api/", {
                method: "POST",
                body: payload
            })
            .then(res => res.json())
            .then(body => {
                console.log(body);
                if (body.contacts == undefined) {
                    if (body.status == "html_required") {
                        chrome.tabs.sendMessage(tabs[0].id, { type: "get_html" });
                    } else {
                        show("no-credits");
                    }
                } else {
                    var data = body.contacts[0];

                    var section1 = document.querySelectorAll("section")[0];
                    var section2 = document.querySelectorAll("section")[1];
                    var section3 = document.querySelectorAll("section")[2];


                    if (data.person.firstname != null && data.person.lastname != null) {
                        section1.innerHTML += 
                        `<article>
                            <h2>${data.person.firstname} ${data.person.lastname}</h2>
                        </article>`;
                    }

                    if (data.person.email != null) {
                        section1.innerHTML +=
                        `<article>
                            <h4><i class="far fa-envelope"></i><a href="mailto:${data.person.email}">${data.person.email}</a></h4>
                        </article>`;
                    }

                    if (section1.innerText.length == 0) {
                        section1.remove();
                    }

                    if (typeof data.person.phone == "string") {
                        section2.innerHTML +=
                        `<article>
                            <h4><i class="fas fa-phone"></i><a href="tel:${data.person.phone}">${data.person.phone}</a></h4>
                        </article>`;
                    }

                    if (section2.innerText.length == 0) {
                        section2.remove();
                    }

                    if (data.company.name != null) {
                        section3.innerHTML +=
                        `<article>
                            <h2>${data.company.name}</h2>
                        </article>`;
                    }

                    if (typeof data.company.companyUrl == "string" && data.company.companyUrl.length > 0) {
                        section3.innerHTML +=
                        `<article>
                            <h4><i class="fas fa-globe"></i><a target="_blank" href="${data.company.companyUrl}">${data.company.companyUrl}</a></h4>
                        </article>`;
                    }

                    if (typeof data.company.logo == "string" && data.company.logo.length > 0) {
                        section3.innerHTML +=
                        `<article>
                            <img height="50" src="${data.company.logo}" />
                        </article>`;
                    }

                    if (typeof data.company.founded == "string" && data.company.founded.length > 0) {
                        section3.innerHTML +=
                        `<article>
                            <h4>Founded: ${data.company.founded}</h4>
                        </article>`;
                    }

                    if (section3.innerText.length == 0) {
                        section3.remove();
                    }

                    show("contact-card");
                }
            })
            .catch(err => {
                console.log(err);
            });
        });
    } else {
        show("invalid-url");
    }
});

document.querySelectorAll(".fa-phone").forEach(function(item, index) {
    if (index > 0) {
        item.style.color = "white";
    }
});

/*
chrome.storage.sync.get("profile-data", function (result) {
    var data = result["profile-data"];
    console.log(data);
    document.querySelector("#name").innerHTML = `${data.person.firstname} ${data.person.lastname}`;
    document.querySelector("#email-value").innerHTML = `${data.person.email}`;
    document.querySelector("#phone-value").innerHTML = `${data.person.phone}`
    document.querySelector("#company").innerHTML = `${data.company.name}`
    document.querySelector("#website-value").innerHTML = `${data.company.companyUrl}`
    document.querySelector("#website-value").href = `https://${data.company.companyUrl}`
    document.querySelector("#founded").innerHTML = `${data.company.founded}`
});
*/