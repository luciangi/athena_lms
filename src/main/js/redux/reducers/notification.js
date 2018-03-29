import { notificationConstants } from "../constants";

export default (state = { message: "", error: false }, action) => {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_OPEN: {
            return { ...state, message: action.message, error: action.error }
        }
        case notificationConstants.NOTIFICATION_CLOSE: {
            return { ...state, message: "", error: false }
        }
    }
    return state
}
