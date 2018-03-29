import { authConstants } from "../constants";

export default (state = { user: null }, action) => {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS: {
            return { ...state, user: action.user }
        }
        case authConstants.LOGOUT_SUCCESS: {
            return { ...state, user: null }
        }
    }
    return state
}
