import {
    POST_REGISTER_USER_REQUEST,
    POST_REGISTER_USER_SUCCESS,
    POST_REGISTER_USER_ERROR,
    POST_AUTHORIZE_USER_REQUEST,
    POST_AUTHORIZE_USER_SUCCESS,
    POST_AUTHORIZE_USER_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR
} from './actions'

const initialState = {
    user: [],

    isPostRegisterLoading: false,
    isPostRegisterError: false,

    isPostAuthorizeLoading: false,
    isPostAuthorizeError: false,

    isGetUserLoading: false,
    isGetUserError: false,
}

export default (state = initialState, action) => {

    switch (action.type) {
        case POST_REGISTER_USER_REQUEST: {
            return {...state, isPostRegisterError:false, isPostRegisterLoading: true}
        }
        case POST_REGISTER_USER_SUCCESS: {
            return {...state, user: action.payload, isPostRegisterError: false, isPostRegisterLoading: false}
        }
        case POST_REGISTER_USER_ERROR: {
            return {...state, user: [], isPostRegisterLoading: false, isPostRegisterError: true}
        }
        case POST_AUTHORIZE_USER_REQUEST: {
            return {...state, isPostAuthorizeError:false, isPostAuthorizeLoading: true}
        }
        case POST_AUTHORIZE_USER_SUCCESS: {
            return {...state, user: action.payload, isPostAuthorizeError: false, isPostAuthorizeLoading: false}
        }
        case POST_AUTHORIZE_USER_ERROR: {
            return {...state, user: [], isPostAuthorizeLoading: false, isPostAuthorizeError: true}
        }
        case GET_USER_REQUEST: {
            return {...state, isGetUserError:false, isGetUserLoading: true}
        }
        case GET_USER_SUCCESS: {
            return {...state, user: action.payload, isGetUserError: false, isGetUserLoading: false}
        }
        case GET_USER_ERROR: {
            return {...state, user: [], isGetUserLoading: false, isGetUserError: true}
        }
        default:

            return state

    }

}
