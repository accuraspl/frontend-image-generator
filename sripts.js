const API_URL = "https://flask-api-production-96aa.up.railway.app/";

const output = document.getElementById("output");

function saveToken(token) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

function logout() {
    localStorage.removeItem("token");
    output.textContent = "Wylogowano";
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.access_token) {
        saveToken(data.access_token);
        output.textContent = "Zalogowano ✅\nToken zapisany";
    } else {
        output.textContent = JSON.stringify(data, null, 2);
    }
}

async function getProfile() {
    const token = getToken();

    if (!token) {
        output.textContent = "Brak tokena — zaloguj się";
        return;
    }

    const res = await fetch(API_URL + "/profile", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
}