document.addEventListener('DOMContentLoaded', () => {
    //vantaBackground();
    let resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            header_background.resize();
            overlay_background.resize();
        });
    });
    let slider = document.getElementById("overlay");
    resizeObserver.observe(slider);
    generateQR();
});

const apps_script_url = "https://script.google.com/macros/s/AKfycbxyJxvPaJKAUxhadOijFce12uqxtPNqDadKPnq1DgmTrVP3lLs5aPwqDcGCzKKyUB2lnQ/exec";

const form = document.forms['login_form'];
const username = form['username'];
const password = form['password'];
const errorDisplay = document.getElementsByClassName("error")[0];

function checkShowPassword(ele) {
    if (ele.checked) {
        password.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
    }
}

function process_response_data(response_data) {
    let result = response_data.result;
    let data = response_data.data;
    if (result === "success") {
        Cookies.set("data", data, {expires: 6/24, path: ""});
        generateQR(data);
        errorDisplay.innerHTML = "";
        //alert(response_data.result + "\n" + response_data.data);
    } else if (result === "unsuccess") {
        errorDisplay.innerHTML =  result.charAt(0).toUpperCase() + result.slice(1) + "! " + data.charAt(0).toUpperCase() + data.slice(1) + "!";
        //alert(response_data.result + "\n" + response_data.data);
    } else if (result === "bad request") {
        errorDisplay.innerHTML =  result.charAt(0).toUpperCase() + result.slice(1) + "! " + data.charAt(0).toUpperCase() + data.slice(1) + "!";
        //alert(response_data.result + "\n" + response_data.data);
    } else if (result === "error") {
        alert(response_data.result + "\n" + response_data.data);
    } else {
        errorDisplay.innerHTML =  "Unknown error!";
        //alert("Unknown error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const hash_key = "asdfgh"; ///////////////////////////////////as same as in the apps script
    let password_hashed = sha256.hmac.create(hash_key).update(password.value).hex();

    url = apps_script_url + "?username=" + username.value + "&password=" + password_hashed;

    errorDisplay.innerHTML = "Processing, please wait.";

    fetch(url, {method: "GET", mode: "cors"})
    .then(x => x.text())
    .then((response_data) => process_response_data(JSON.parse(response_data)))
    .catch(error => console.error(error));
});

function generateQR (data = Cookies.get("data")) {
    const qr = document.getElementById("qr");
    const login = document.getElementsByTagName("form")[0];
    const title = document.querySelector("#login h2");
    if (data) {
        const qrURL = qrcode(5, "L");
        qrURL.addData(data);
        qrURL.make();
        qr.innerHTML = qrURL.createImgTag(4, 8, "qrcode");
        login.style.display = "none";
        title.innerHTML = "QR";
        qr.style.display = "block";
    } else {
        qr.style.display = "none";
        title.innerHTML = "Login";
        login.style.display = "flex";
        //alert("please login");
    }
    header_background.resize();
    overlay_background.resize();
}