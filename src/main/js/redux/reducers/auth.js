import { userConstants } from "../constants";

export default (state = { user: null }, action) => {
    switch (action.type) {
        case userConstants.USER_LOGIN: {
            return { ...state, user: action.user }
        }
        case userConstants.USER_LOGOUT: {
            return { ...state, user: null }
        }
    }
    return state
}
