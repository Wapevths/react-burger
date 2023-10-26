import {request} from "../../utils/fetch-request";
import {fetchWithRefresh} from "../../utils/fetch-request-protect";
import {getCookie, setCookie} from "../../utils/cookie";
export const POST_REGISTER_USER_REQUEST = 'POST_REGISTER_USER_REQUEST'
export const POST_REGISTER_USER_SUCCESS = 'POST_REGISTER_USER_SUCCESS'
export const POST_REGISTER_USER_ERROR = 'POST_REGISTER_USER_ERROR'
export const POST_AUTHORIZE_USER_REQUEST = 'POST_REGISTER_USER_REQUEST'
export const POST_AUTHORIZE_USER_SUCCESS = 'POST_REGISTER_USER_SUCCESS'
export const POST_AUTHORIZE_USER_ERROR = 'POST_REGISTER_USER_ERROR'

export const GET_USER_REQUEST = "GET_USER_REQUEST"
export const GET_USER_SUCCESS = "GET_USER_SUCCESS"
export const GET_USER_ERROR = "GET_USER_ERROR"


export const postCreateUser = (email, password, name, navigate) => (dispatch) => {
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
            navigate('/profile')
            dispatch({type: POST_REGISTER_USER_SUCCESS, payload: res.user})
        })
        .catch((err) => {
            dispatch({type: POST_REGISTER_USER_ERROR})
            console.error(err)
        });
}

export const getUser = () => (dispatch) => {
    dispatch({type: GET_USER_REQUEST})

    fetchWithRefresh('/auth/user', {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "authorization": `Bearer ${getCookie('token')}`
        },
    })
        .then((res) => {
            dispatch({type: GET_USER_SUCCESS, payload: res.user})
        })
        .catch((err) => {
            dispatch({type: GET_USER_ERROR})
            console.error(err)
        });
}

export const postAuthorizeUser = (email, password, navigate) => (dispatch) => {
    dispatch({type: POST_AUTHORIZE_USER_REQUEST})
    fetchWithRefresh('/auth/login', {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "authorization": `Bearer ${getCookie('token')}`
        },
    })
        .then((res) => {
            let authToken = res.accessToken.split('Bearer ')[1];

            if (authToken) {
                setCookie('token', authToken);
            }
            setCookie("refreshToken", res.refreshToken);
            navigate('/profile')
            dispatch({type: POST_AUTHORIZE_USER_SUCCESS, payload: res.user})
        })
        .catch((err) => {
            dispatch({type: POST_AUTHORIZE_USER_ERROR})
            console.error(err)
        });
}