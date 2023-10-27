import { getCookie, setCookie } from "./cookie";
const BASE_URL = 'https://norma.nomoreparties.space/api'
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then(err => Promise.reject(err))
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

export const fetchWithRefresh = async (endpoint, options) => {
    try {
        const res = await fetch(BASE_URL + endpoint, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await updateToken();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            setCookie("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken.split('Bearer ')[1]);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(BASE_URL + endpoint, options);
            return checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};