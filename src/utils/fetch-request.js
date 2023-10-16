const BASE_URL = 'https://norma.nomoreparties.space/api'

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);

}

export const request = async (endpoint, options) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    let res = await fetch(BASE_URL + endpoint, options);
    return checkResponse(res);
}