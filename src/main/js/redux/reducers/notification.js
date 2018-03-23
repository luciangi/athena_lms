import { notificationConstants } from "../constants";

export default (state = { message: "" }, action) => {
    switch (action.type) {
        case notificationConstants.OPEN_NOTIFICATION: {
            return { ...state, message: action.message }
        }
        case notificationConstants.CLOSE_NOTIFICATION: {
            return { ...state, message: "" }
        }
    }
    return state
}