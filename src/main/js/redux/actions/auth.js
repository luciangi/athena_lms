import {
    closeLogin,
    homeRoute,
    loginError,
    openNotification,
    profileRoute
} from "./index";
import {
    authConstants,
    authoritiesConstants
} from "../constants";
import axios from "axios/index";
import store from "../store";

export const loadUser = () => {
    return async (dispatch) => {
        axios.get("api/userDetails")
            .then(response => {
                dispatch(loginSuccess(response.data));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(logoutSuccess());
                } else {
                    console.error(error);
                    dispatch(openNotification(`Fetch user error: ${error.response.data.message}`, true));
                }
            });
    }
};

export const loginUser = (username, password) => {
    return async (dispatch) => {
        const bodyFormData = new FormData();
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);

        axios.post("api/login", bodyFormData)
            .then(response => {
                dispatch(loginSuccess(response.data, true));
                dispatch(openNotification(`Hello ${response.data.username}`));
                dispatch(closeLogin());
            })
            .catch(error => {
                dispatch(loginError());
                dispatch(openNotification(`Login error: ${error.response.data.message}`, true));
            });
    }
};

export const loginSuccess = (user, fromLogin = false) => {
    return async (dispatch) => {
        if (fromLogin) {
            dispatch(profileRoute(user));
        }
        dispatch({ type: authConstants.LOGIN_SUCCESS, user })
    }
};

export const logoutUser = () => {
    return async (dispatch) => {
        axios.get("api/logout")
            .then(() => {
                dispatch(logoutSuccess());
                dispatch(openNotification("Logged Out"));
            })
            .catch(error => {
                dispatch(openNotification(`An error occurred while logging out: ${error}`, true));
            });
    }
};

export const logoutSuccess = () => {
    return async (dispatch) => {
        dispatch(homeRoute());
        dispatch({ type: authConstants.LOGOUT_SUCCESS })
    }
};

export const isAdminUser = (user = store.getState().auth.user) => {
    return user && user.roles.includes(authoritiesConstants.ROLE_ADMIN)
};

export const isTutorUser = (user = store.getState().auth.user) => {
    return user && user.roles.includes(authoritiesConstants.ROLE_TUTOR)
};

export const isStudentUser = (user = store.getState().auth.user) => {
    return user && user.roles.includes(authoritiesConstants.ROLE_STUDENT)
};

export const getDefaultRouteByHighestPriorityAuthority = (user = store.getState().auth.user) => {
    if (isAdminUser(user)) {
        return "/admin"
    } else if (isTutorUser(user)) {
        return "/tutor"
    } else if (isStudentUser(user)) {
        return "/student"
    }
    return "/";
};
