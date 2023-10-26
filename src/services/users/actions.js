import {request} from "../../utils/fetch-request";
import {setCookie} from "../../utils/cookie";

export const POST_REGISTER_USER_REQUEST = 'POST_REGISTER_USER_REQUEST'
export const POST_REGISTER_USER_SUCCESS = 'POST_REGISTER_USER_SUCCESS'
export const POST_REGISTER_USER_ERROR = 'POST_REGISTER_USER_ERROR'

export const postCreateUser = (email, password, name) => (dispatch) => {
    dispatch({type: POST_REGISTER_USER_REQUEST})
    request('/auth/register', {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => {
            let authToken = res.accessToken.split('Bearer ')[1];

            if (authToken) {
                setCookie('token', authToken);
            }

            setCookie("refreshToken", res.refreshToken);

            dispatch({type: POST_REGISTER_USER_SUCCESS, payload: res.user})
        })
        .catch((err) => {
            dispatch({type: POST_REGISTER_USER_ERROR})
            console.error(err)
        });
}