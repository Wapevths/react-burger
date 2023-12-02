import {
    POST_REGISTER_USER_REQUEST,
    POST_REGISTER_USER_SUCCESS,
    POST_REGISTER_USER_ERROR,
    POST_AUTHORIZE_USER_REQUEST,
    POST_AUTHORIZE_USER_SUCCESS,
    POST_AUTHORIZE_USER_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_ERROR,
    POST_LOGOUT_USER_REQUEST,
    POST_LOGOUT_USER_SUCCESS,
    POST_LOGOUT_USER_ERROR,
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_ERROR,
    POST_RESET_PASSWORD_REQUEST,
    POST_RESET_PASSWORD_SUCCESS,
    POST_RESET_PASSWORD_ERROR,
    TTypesActions,
} from './actions'

export interface IUser {
    id: number;
    name: string;
    email: string;
}

interface IMyState {
    user: IUser[];
    isPostRegisterLoading: boolean;
    isPostRegisterError: boolean;

    isPostAuthorizeLoading: boolean;
    isPostAuthorizeError: boolean;

    isGetUserLoading: boolean;
    isGetUserError: boolean;

    isPatchUserLoading: boolean;
    isPatchUserError: boolean;

    isPostLogoutUserLoading: boolean;
    isPostLogoutUserError: boolean;

    isEmailSend: boolean;
    isPostForgotPasswordUserLoading: boolean;
    isPostForgotPasswordUserError: boolean;

    isPostResetPasswordUserLoading: boolean;
    isPostResetPasswordUserError: boolean;
}


const initialState:IMyState = {
    user: [],

    isPostRegisterLoading: false,
    isPostRegisterError: false,

    isPostAuthorizeLoading: false,
    isPostAuthorizeError: false,

    isGetUserLoading: false,
    isGetUserError: false,

    isPatchUserLoading: false,
    isPatchUserError: false,

    isPostLogoutUserLoading: false,
    isPostLogoutUserError: false,

    isEmailSend: false,
    isPostForgotPasswordUserLoading: false,
    isPostForgotPasswordUserError: false,

    isPostResetPasswordUserLoading: false,
    isPostResetPasswordUserError: false,
}

export default (state = initialState, action: TTypesActions) => {

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
        case PATCH_USER_REQUEST: {
            return {...state, isPatchUserError: false, isPatchUserLoading: true}
        }
        case PATCH_USER_SUCCESS: {
            return {...state, user: action.payload, isPatchUserError: false, isPatchUserLoading: false}
        }
        case PATCH_USER_ERROR: {
            return {...state, user: [], isPatchUserLoading: false, isPatchUserError: true}
        }
        case POST_LOGOUT_USER_REQUEST: {
            return {...state, isPostLogoutUserError: false, isPostLogoutUserLoading: true}
        }
        case POST_LOGOUT_USER_SUCCESS: {
            return {...state, user: action.payload, isPostLogoutUserError: false, isPostLogoutUserLoading: false}
        }
        case POST_LOGOUT_USER_ERROR: {
            return {...state, user: [], isPostLogoutUserLoading: false, isPostLogoutUserError: true}
        }
        case POST_FORGOT_PASSWORD_REQUEST: {
            return {...state, isPostForgotPasswordUserError: false, isPostForgotPasswordUserLoading: true}
        }
        case POST_FORGOT_PASSWORD_SUCCESS: {
            return {...state, isEmailSend: action.payload, isPostForgotPasswordUserError: false, isPostForgotPasswordUserLoading: false}
        }
        case POST_FORGOT_PASSWORD_ERROR: {
            return {...state, isEmailSend: false, isPostForgotPasswordUserLoading: false, isPostForgotPasswordUserError: true}
        }
        case POST_RESET_PASSWORD_REQUEST: {
            return {...state, isPostResetPasswordUserError: false, isPostResetPasswordUserLoading: true}
        }
        case POST_RESET_PASSWORD_SUCCESS: {
            return {...state, isPostResetPasswordUserError: false, isPostResetPasswordUserLoading: false}
        }
        case POST_RESET_PASSWORD_ERROR: {
            return {...state,  isPostResetPasswordUserLoading: false, isPostResetPasswordUserError: true}
        }
        default:
            return state

    }

}
