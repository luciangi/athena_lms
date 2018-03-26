import { userConstants } from "../constants";

export default (state = { user: null, loginOpened: false, error: false }, action) => {
    switch (action.type) {
        case userConstants.LOGIN_OPEN: {
            return { ...state, loginOpened: true, error: false }
        }
        case userConstants.LOGIN_CLOSE: {
            return { ...state, loginOpened: false }
        }
        case userConstants.LOGIN_SUCCESS: {
            return { ...state, user: action.user, error: false }
        }
        case userConstants.LOGIN_ERROR: {
            return { ...state, error: true }
        }
        case userConstants.LOGOUT_SUCCESS: {
            return { ...state, user: null }
        }
    }
    return state
}
