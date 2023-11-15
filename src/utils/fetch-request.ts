export const BASE_URL:string = 'https://norma.nomoreparties.space/api'

export function checkResponse(res:any) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((err:object) => Promise.reject(err))

}

export const request = async (endpoint:string, options?:object) => {
    let res = await fetch(BASE_URL + endpoint, options);
    return checkResponse(res);
}