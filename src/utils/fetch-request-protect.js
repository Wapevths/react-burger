import {deleteCookie, getCookie, setCookie} from "./cookie";
const BASE_URL = 'https://norma.nomoreparties.space/api'
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

const updateToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getCookie("refreshToken"),
        }),
    }).then(checkResponse);
};

function refreshToken() {
    getCookie("refreshToken");
    deleteCookie("accessToken");
    updateToken()
        .then((data) => {
            setCookie("accessToken", data.accessToken);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const fetchWithRefresh = async (endpoint, options) => {
    try {
        const res = await fetch(BASE_URL + endpoint, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = refreshToken;
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            setCookie("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(BASE_URL + endpoint, options);
            return checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};