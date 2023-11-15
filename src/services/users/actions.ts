import {request} from "../../utils/fetch-request";
import {fetchWithRefresh} from "../../utils/fetch-request-protect";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";
export const POST_REGISTER_USER_REQUEST:string = 'POST_REGISTER_USER_REQUEST'
export const POST_REGISTER_USER_SUCCESS:string = 'POST_REGISTER_USER_SUCCESS'
export const POST_REGISTER_USER_ERROR:string = 'POST_REGISTER_USER_ERROR'
export const POST_AUTHORIZE_USER_REQUEST:string = 'POST_REGISTER_USER_REQUEST'
export const POST_AUTHORIZE_USER_SUCCESS:string = 'POST_REGISTER_USER_SUCCESS'
export const POST_AUTHORIZE_USER_ERROR:string = 'POST_REGISTER_USER_ERROR'

export const GET_USER_REQUEST:string = "GET_USER_REQUEST"
export const GET_USER_SUCCESS:string = "GET_USER_SUCCESS"
export const GET_USER_ERROR:string = "GET_USER_ERROR"

export const PATCH_USER_REQUEST:string = "PATCH_USER_REQUEST"
export const PATCH_USER_SUCCESS:string = "PATCH_USER_SUCCESS"
export const PATCH_USER_ERROR:string = "PATCH_USER_ERROR"

export const POST_LOGOUT_USER_REQUEST:string = "POST_LOGOUT_USER_REQUEST"
export const POST_LOGOUT_USER_SUCCESS:string = "POST_LOGOUT_USER_SUCCESS"
export const POST_LOGOUT_USER_ERROR:string = "POST_LOGOUT_USER_ERROR"

export const POST_FORGOT_PASSWORD_REQUEST:string = "POST_FORGOT_PASSWORD_REQUEST"
export const POST_FORGOT_PASSWORD_SUCCESS:string = "POST_FORGOT_PASSWORD_SUCCESS"
export const POST_FORGOT_PASSWORD_ERROR:string = "POST_FORGOT_PASSWORD_ERROR"

export const POST_RESET_PASSWORD_REQUEST:string = "POST_RESET_PASSWORD_REQUEST"
export const POST_RESET_PASSWORD_SUCCESS:string = "POST_RESET_PASSWORD_SUCCESS"
export const POST_RESET_PASSWORD_ERROR:string = "POST_RESET_PASSWORD_ERROR"

export const postCreateUser = (email:string, password:string, name:string, navigate:Function) => (dispatch:any) => {
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

export const getUser = () => (dispatch:any) => {
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

export const postAuthorizeUser = (email:string, password:string, navigate:Function) => (dispatch:any) => {
    dispatch({type: POST_AUTHORIZE_USER_REQUEST})
    fetchWithRefresh('/auth/login', {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "authorization": `Bearer ${getCookie('token')}`
        },
    }).then(res => {
            let authToken = res.accessToken.split('Bearer ')[1];
            console.log(res)
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
export const patchUser = (name:string, email:string, password:string, setInputDisable:Function) => (dispatch:any) => {
    dispatch({type: PATCH_USER_REQUEST})
    fetchWithRefresh('/auth/user', {
        method: "PATCH",
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "authorization": `Bearer ${getCookie('token')}`
        },
    })
        .then((res) => {
            setInputDisable(true)
            dispatch({type: PATCH_USER_SUCCESS, payload: res.user})
        })
        .catch((err) => {
            dispatch({type: PATCH_USER_ERROR})
            console.error(err)
        });
}
export const postLogoutUser = (navigate:Function) => (dispatch:any) => {
    dispatch({type: POST_LOGOUT_USER_REQUEST})
    fetchWithRefresh('/auth/logout', {
        method: "POST",
        body: JSON.stringify({
            token: getCookie('refreshToken')
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "authorization": `Bearer ${getCookie('token')}`
        },
    })
        .then(() => {
            deleteCookie("refreshToken")
            deleteCookie("token")
            navigate('/login')
            dispatch({type: POST_LOGOUT_USER_SUCCESS, payload: []})
        })
        .catch((err) => {
            dispatch({type: POST_LOGOUT_USER_ERROR})
            console.error(err)
        });
}

export const postRequestForgotPassword = (email:string, navigate:Function) => (dispatch:any) => {
    dispatch({type: POST_FORGOT_PASSWORD_REQUEST})
    fetchWithRefresh('/password-reset', {
        method: "POST",
        body: JSON.stringify({
            email: email
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => {
            console.log(res)
            navigate('/reset-password')
            dispatch({type: POST_FORGOT_PASSWORD_SUCCESS, payload: []})
        })
        .catch((err) => {
            dispatch({type: POST_FORGOT_PASSWORD_ERROR})
            console.error(err)
        });
}
export const postRequestResetPassword = (password:string, code:string, navigate:Function) => (dispatch:any) => {
    dispatch({type: POST_RESET_PASSWORD_REQUEST})
    fetchWithRefresh('/password-reset', {
        method: "POST",
        body: JSON.stringify({
            password: password,
            code: code
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then(() => {
            alert('Пароль был успешно обновлен')
            navigate('/')
            dispatch({type: POST_FORGOT_PASSWORD_SUCCESS})
        })
        .catch((err) => {
            dispatch({type: POST_FORGOT_PASSWORD_ERROR})
            console.error(err)
        });
}