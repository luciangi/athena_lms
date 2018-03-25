import { notificationConstants } from "../constants";

export default (state = { message: "" }, action) => {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_OPEN: {
            return { ...state, message: action.message }
        }
        case notificationConstants.NOTIFICATION_CLOSE: {
            return { ...state, message: "" }
        }
    }
    return state
}
