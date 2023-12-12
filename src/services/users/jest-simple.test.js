import reducer, {initialState} from './reducer';
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
} from './actions';

describe('User Reducer', () => {

    it('should handle POST_REGISTER_USER_REQUEST', () => {
        const action = { type: POST_REGISTER_USER_REQUEST };
        const expectedState = { ...initialState, isPostRegisterError: false, isPostRegisterLoading: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_REGISTER_USER_SUCCESS', () => {
        const action = { type: POST_REGISTER_USER_SUCCESS, payload: [{ id: 1, name: 'John', email: 'john@example.com' }] };
        const expectedState = { ...initialState, user: action.payload, isPostRegisterError: false, isPostRegisterLoading: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_REGISTER_USER_ERROR', () => {
        const action = { type: POST_REGISTER_USER_ERROR };
        const expectedState = { ...initialState, user: [], isPostRegisterLoading: false, isPostRegisterError: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle GET_USER_REQUEST', () => {
        const action = { type: GET_USER_REQUEST };
        const expectedState = { ...initialState, isGetUserError: false, isGetUserLoading: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_USER_SUCCESS', () => {
        const userData = [{ id: 1, name: 'John', email: 'john@example.com' }];
        const action = { type: GET_USER_SUCCESS, payload: userData };
        const expectedState = { ...initialState, user: userData, isGetUserError: false, isGetUserLoading: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_USER_ERROR', () => {
        const action = { type: GET_USER_ERROR };
        const expectedState = { ...initialState, user: [], isGetUserLoading: false, isGetUserError: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_AUTHORIZE_USER_REQUEST', () => {
        const action = { type: POST_AUTHORIZE_USER_REQUEST };
        const expectedState = { ...initialState, user: [], isPostAuthorizeLoading: true, isPostAuthorizeError: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_AUTHORIZE_USER_SUCCESS', () => {
        const user = { id: 1, name: 'Test User', email: 'test@example.com' };
        const action = { type: POST_AUTHORIZE_USER_SUCCESS, payload: user };
        const expectedState = { ...initialState, user, isPostAuthorizeError: false, isPostAuthorizeLoading: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_AUTHORIZE_USER_ERROR', () => {
        const action = { type: POST_AUTHORIZE_USER_ERROR };
        const expectedState = { ...initialState, user: [], isPostAuthorizeLoading: false, isPostAuthorizeError: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle PATCH_USER_REQUEST', () => {
        const action = { type: PATCH_USER_REQUEST };
        const expectedState = { ...initialState, user: [], isPatchUserError: false, isPatchUserLoading: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle PATCH_USER_SUCCESS', () => {
        const user = { id: 1, name: 'Test User', email: 'test@example.com' };
        const action = { type: PATCH_USER_SUCCESS, payload: user };
        const expectedState = { ...initialState, user, isPatchUserError: false, isPatchUserLoading: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle PATCH_USER_ERROR', () => {
        const action = { type: PATCH_USER_ERROR };
        const expectedState = { ...initialState, user: [], isPatchUserLoading: false, isPatchUserError: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_LOGOUT_USER_REQUEST', () => {
        const action = { type: POST_LOGOUT_USER_REQUEST };
        const expectedState = { ...initialState, user: [], isPostLogoutUserError: false, isPostLogoutUserLoading: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_LOGOUT_USER_SUCCESS', () => {
        const user = { id: 1, name: 'Test User', email: 'test@example.com' };
        const action = { type: POST_LOGOUT_USER_SUCCESS, payload: user };
        const expectedState = { ...initialState, user, isPostLogoutUserError: false, isPostLogoutUserLoading: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_LOGOUT_USER_ERROR', () => {
        const action = { type: POST_LOGOUT_USER_ERROR };
        const expectedState = { ...initialState, user: [], isPostLogoutUserLoading: false, isPostLogoutUserError: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_FORGOT_PASSWORD_REQUEST', () => {
        const action = { type: POST_FORGOT_PASSWORD_REQUEST };
        const expectedState = { ...initialState, isPostForgotPasswordUserError: false, isPostForgotPasswordUserLoading: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_FORGOT_PASSWORD_SUCCESS', () => {
        const action = { type: POST_FORGOT_PASSWORD_SUCCESS, payload: true };
        const expectedState = { ...initialState, isEmailSend: true, isPostForgotPasswordUserError: false, isPostForgotPasswordUserLoading: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_FORGOT_PASSWORD_ERROR', () => {
        const action = { type: POST_FORGOT_PASSWORD_ERROR };
        const expectedState = { ...initialState, isEmailSend: false, isPostForgotPasswordUserLoading: false, isPostForgotPasswordUserError: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_RESET_PASSWORD_REQUEST', () => {
        const action = { type: POST_RESET_PASSWORD_REQUEST };
        const expectedState = { ...initialState, isPostResetPasswordUserError: false, isPostResetPasswordUserLoading: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_RESET_PASSWORD_SUCCESS', () => {
        const action = { type: POST_RESET_PASSWORD_SUCCESS };
        const expectedState = { ...initialState, isPostResetPasswordUserError: false, isPostResetPasswordUserLoading: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_RESET_PASSWORD_ERROR', () => {
        const action = { type: POST_RESET_PASSWORD_ERROR };
        const expectedState = { ...initialState, isPostResetPasswordUserLoading: false, isPostResetPasswordUserError: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });
});
