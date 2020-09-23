chrome.storage.sync.get("profile-data", function (result) {
    var data = result["profile-data"];
    console.log(data);
    document.querySelector("#name").innerHTML = `${data.person.firstname} ${data.person.lastname}`;
    document.querySelector("#email-value").innerHTML = `${data.person.email}`;
    document.querySelector("#phone-value").innerHTML = `${formatPhoneNumber(data.person.phone)}`
});

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}