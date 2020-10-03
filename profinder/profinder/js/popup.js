function show(id) {
    Array.from(document.querySelector("#content").children).forEach(function(item) {
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
                        //chrome.tabs.sendMessage(tabs[0].id, { type: "get_html" });
                    } else {
                        show("no-credits");
                    }
                } else {
                    var data = body.contacts[0];

                    var section1 = document.querySelectorAll("section")[0];
                    var section2 = document.querySelectorAll("section")[1];
                    var section3 = document.querySelectorAll("section")[2];
                    var icons = document.querySelector("#icons");
                    


                    if (data.person.firstname != null && data.person.lastname != null) {
                        section1.innerHTML += 
                        `<article>
                            <div class="header">
                                <h2>${data.person.firstname} ${data.person.lastname}</h2>
                            </div>
                        </article>`;
                    }

                    if (data.person.email != null) {
                        section1.innerHTML +=
                        `<article>
                            <div class="header">
                                <div class="tag">Work</div><h4 class="indented"><a href="mailto:${data.person.email}">${data.person.email}</a></h4>
                            </div>
                        </article>`;
                    }

                    if (data.person.email2 != null) {
                        section1.innerHTML +=
                        `<article>
                            <div class="header">
                                <div class="tag">Private</div><h4 class="indented"><a href="mailto:${data.person.email2}">${data.person.email2}</a></h4>
                            </div>
                        </article>`;
                    }

                    if (typeof data.person.phone == "string") {
                        section1.innerHTML +=
                        `<article>
                            <div class="header">
                                <div class="tag">Phone 1</div><h4 class="indented"><a href="tel:${data.person.phone}">${data.person.phone}</a></h4>
                            </div>
                        </article>`;
                    }

                    if (typeof data.person.phone2 == "string") {
                        section1.innerHTML +=
                        `<article>
                            <div class="header">
                                <div class="tag">Phone 2</div><h4 class="indented"><a href="tel:${data.person.phone2}">${data.person.phone2}</a></h4>
                            </div>
                        </article>`;
                    }

                    if (section1.innerText.length == 0) {
                        section1.remove();
                    }

                    if (data.company.name != null) {
                        section2.innerHTML +=
                        `<article>
                            <div class="header">
                                <h2>${data.company.name}</h2>
                            </div>
                        </article>`;
                    }

                    if (typeof data.company.companyUrl == "string" && data.company.companyUrl.length > 0) {
                        section2.innerHTML +=
                        `<article>
                            <div class="header">
                                <h4><a target="_blank" href="http://${data.company.companyUrl}">${data.company.companyUrl}</a></h4>
                            </div>
                        </article>`;
                    }

                    if (typeof data.company.logo == "string" && data.company.logo.length > 0) {
                        section2.innerHTML +=
                        `<article>
                            <img height="50" src="${data.company.logo}" />
                        </article>`;
                    }

                    if (typeof data.company.overview == "string" && data.company.overview.length > 0) {
                        section2.innerHTML +=
                        `<article>
                            <div class="header"><i class="fas fa-info-circle"></i><h6>About</h6></div>
                            <div class="body">
                                <p>${data.company.overview}</p>
                            </div>
                        </article>`;
                    }

                    if (typeof data.company.personnel == "string" && data.company.personnel.length > 0) {
                        section2.innerHTML +=
                            `<article>
                            <div class="header"><i class="fas fa-users"></i><h6>Employees</h6></div>
                            <div class="body">
                                <p>${data.company.personnel}</p>
                            </div>
                        </article>`;
                    }

                    if (typeof data.company.tolMainLineofBusinessName == "string" && data.company.tolMainLineofBusinessName.length > 0) {
                        section2.innerHTML +=
                            `<article>
                            <div class="header"><i class="fas fa-industry"></i><h6>Main Industry</h6></div>
                            <div class="body">
                                <p>${data.company.tolMainLineofBusinessName}</p>
                            </div>
                        </article>`;
                    }

                    var address = "";
                    
                    if (typeof data.company.address == "string" && data.company.address.length > 0) {
                        address += data.company.address;
                        
                        if (typeof data.company.postalcode == "string" && data.company.postalcode.length > 0) {
                            address += `<br />${data.company.postalcode}`;

                            if (typeof data.company.city == "string" && data.company.city.length > 0) {
                                address += ` ${data.company.city}`;
                            }
                        }

                        section2.innerHTML +=
                        `<article>
                            <div class="header"><i class="fas fa-location-arrow"></i><h6>Headquarters</h6></div>
                            <div class="body">
                                <p>${address}</p>
                            </div>
                        </article>`;
                    }

                    if (typeof data.company.founded == "string" && data.company.founded.length > 0) {
                        section2.innerHTML +=
                        `<article>
                            <div class="header"><i class="fas fa-flag"></i><h6>Founded</h6></div>
                            <div class="body">
                                <p>${data.company.founded}</p>
                            </div>
                        </article>`;
                    }

                    section2.innerHTML += `<article id="icons"></article>`;

                    var icons = document.querySelector("#icons");

                    if (typeof data.company.facebook == "string" && data.company.facebook.length > 0) {
                        icons.innerHTML += `<a href="https://${data.company.facebook}" target="_blank"><i class="fab fa-facebook-square"></i></a>`;
                    }

                    if (typeof data.company.linkedin == "string" && data.company.linkedin.length > 0) {
                        icons.innerHTML += `<a href="https://${data.company.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>`;
                    }

                    if (icons.children.length == 0) {
                        icons.remove();
                    }

                    if (section2.innerText.length == 0) {
                        section2.remove();
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

document.querySelector("#api-key").addEventListener("keypress", function (e) {
    if (e.code == "Enter") {
        save();
    }
});

document.querySelector("#save").addEventListener("click", function () {
    save();
});

function save() {
    if (document.querySelector("#api-key").value.length > 0) {
        chrome.storage.sync.set({ "profinder-key": document.querySelector("#api-key").value }, function () {
            window.close();
        });
    }
}