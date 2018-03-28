//TODO: maybe move to server and load with the load user request
export const API_SUFFIX = "/api";

export const authoritiesConstants = {
    ROLE_ADMIN: "ROLE_ADMIN",
    ROLE_TUTOR: "ROLE_TUTOR",
    ROLE_STUDENT: "ROLE_STUDENT"
};

export const routesConstants = {
    ROOT: "/",
    ADMIN_ROOT: "/admin",
    TUTOR_ROOT: "/tutor",
    STUDENT_ROOT: "/student"
};

export const menuConstants = {
    LOGIN_OPEN: "LOGIN_OPEN",
    LOGIN_CLOSE: "LOGIN_CLOSE",
    LOGIN_ERROR: "LOGIN_ERROR"
};

export const authConstants = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS"
};

export const notificationConstants = {
    NOTIFICATION_OPEN: "NOTIFICATION_OPEN",
    NOTIFICATION_CLOSE: "NOTIFICATION_CLOSE"
};
