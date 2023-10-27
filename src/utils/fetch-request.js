export const BASE_URL = 'https://norma.nomoreparties.space/api'

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then(err => Promise.reject(err))

}

export const request = async (endpoint, options) => {
    let res = await fetch(BASE_URL + endpoint, options);
    return checkResponse(res);
}