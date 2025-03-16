document.addEventListener('DOMContentLoaded', () => {
    vantaBackground();
    generateQR();
});

const apps_script_url = "";

const form = document.forms['login_form'];
const username = form['username'];
const password = form['password'];

function process_response_data(response_data) {
    if (response_data.result === "success") {
        Cookies.set("data", response_data, {expires: 6/24, path: ""});
        generateQR(data);
        alert(response_data.result + "\n" + response_data.data);
    } else if (response_data.result === "unsuccess") {
        alert(response_data.result + "\n" + response_data.data);
    } else if (response_data.result === "bad request") {
        alert(response_data.result + "\n" + response_data.data);
    } else if (response_data.result === "error") {
        alert(response_data.result + "\n" + response_data.data);
    } else {
        alert("Unknown error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const hash_key = "vy493vut893ycn284933498d8r98qj3uqfb3y498qyc3498d9j8qy239"; ///////////////////////////////////as same as in the apps script
    let password_hashed = sha256.hmac.create(hash_key).update(password.value).hex();

    const body = JSON.stringify({
        username: username.value,
        password: password_hashed
    });

    fetch(apps_script_url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    }).then(response => response.text()).then(response_data => process_response_data(JSON.parse(response_data))).catch(error => console.error(error));
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
}