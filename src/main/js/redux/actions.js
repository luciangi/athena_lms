import {
    notificationConstants,
    userConstants
} from "./constants";
import store from "./store"

export function login(username, password) {
    store.dispatch(openNotification("Logged In"));
    return { type: userConstants.LOGIN, username, password }
}

export function logout() {
    store.dispatch(openNotification("Logged Out"));
    return { type: userConstants.LOGOUT }
}

export function openNotification(message) {
    return { type: notificationConstants.OPEN_NOTIFICATION, message }
}

export function closeNotification() {
    return { type: notificationConstants.CLOSE_NOTIFICATION }
}