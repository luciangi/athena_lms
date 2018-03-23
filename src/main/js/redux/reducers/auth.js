import { userConstants } from "../constants";

export default (state = { user: null }, action) => {
    switch (action.type) {
        case userConstants.LOGIN: {
            return { ...state, user: { username: action.username, password: action.password } }
        }
        case userConstants.LOGOUT: {
            return { ...state, user: null }
        }
    }
    return state
}