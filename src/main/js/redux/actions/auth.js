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
    return (dispatch) => {
        axios.get("api/userDetails")
            .then(function (response) {
                dispatch(loginSuccess(response.data));
            })
            .catch(function (error) {
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
    return (dispatch) => {
        const bodyFormData = new FormData();
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);

        axios.post("api/login", bodyFormData)
            .then(function (response) {
                dispatch(loginSuccess(response.data, true));
                dispatch(openNotification(`Hello ${response.data.username}`));
                dispatch(closeLogin());
            })
            .catch(function (error) {
                dispatch(loginError());
                dispatch(openNotification(`Login error: ${error.response.data.message}`, true));
            });
    }
};

export const loginSuccess = (user, fromLogin = false) => {
    return (dispatch) => {
        if (fromLogin) {
            dispatch(profileRoute());
        }
        dispatch({ type: authConstants.LOGIN_SUCCESS, user: user })
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        axios.get("api/logout")
            .then(function () {
                dispatch(logoutSuccess());
                dispatch(openNotification("Logged Out"));
            })
            .catch(function (error) {
                dispatch(openNotification(`An error occurred while logging out: ${error}`, true));
            });
    }
};

export const logoutSuccess = () => {
    return (dispatch) => {
        dispatch(homeRoute());
        dispatch({ type: authConstants.LOGOUT_SUCCESS })
    }
};

export const isAdminUser = () => {
    const user = store.getState().auth.user;
    return user && user.roles.includes(authoritiesConstants.ROLE_ADMIN)
};

export const isTutorUser = () => {
    const user = store.getState().auth.user;
    return user && user.roles.includes(authoritiesConstants.ROLE_TUTOR)
};

export const isStudentUser = () => {
    const user = store.getState().auth.user;
    return user && user.roles.includes(authoritiesConstants.ROLE_STUDENT)
};

export const getDefaultRouteByHighestPriorityAuthority = () => {
    if (isAdminUser()) {
        return "/admin"
    } else if (isTutorUser()) {
        return "/tutor"
    } else if (isStudentUser()) {
        return "/student"
    }
    return "/";
};
