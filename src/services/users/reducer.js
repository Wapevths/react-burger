import {
    POST_REGISTER_USER_REQUEST,
    POST_REGISTER_USER_SUCCESS,
    POST_REGISTER_USER_ERROR
} from './actions'

const initialState = {
    user: [],

    isPostRegisterLoading: false,
    isPostRegisterError: false
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
        default:

            return state

    }

}
