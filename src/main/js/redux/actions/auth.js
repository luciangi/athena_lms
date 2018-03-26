import { openNotification } from "./index";
import { userConstants } from "../constants";
import axios from "axios/index";

export const openLogin = () => {
    return { type: userConstants.LOGIN_OPEN }
};

export const closeLogin = () => {
    return { type: userConstants.LOGIN_CLOSE }
};

export const loginUser = (username, password) => {
    return (dispatch) => {
        const bodyFormData = new FormData();
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);

        axios.post("/login", bodyFormData)
            .then(function () {
                dispatch(loadUser())
            })
            .catch(function (error) {
                console.error(error.response);
                dispatch(loginError());
                dispatch(openNotification(`Login error: ${error.response.data.message}`, true));
            });
    }
};

export const loginError = () => {
    return { type: userConstants.LOGIN_ERROR }
};

export const loginSuccess = (user) => {
    return { type: userConstants.LOGIN_SUCCESS, user: user }
};

export const loadUser = () => {
    return (dispatch) => {
        axios.get("/user")
            .then(function (response) {
                dispatch(loginSuccess(response.data));
                dispatch(openNotification(`Hello ${response.data.username}`));
                dispatch(closeLogin());

            })
            .catch(function (error) {
                console.error(error.response);
                dispatch(loginError());
                dispatch(openNotification(`Login error: ${error.response.data.message}`, true));
            });
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        axios.get("/logout")
            .then(function () {
                dispatch(logoutSuccess());
                dispatch(openNotification("Logged Out"));
            })
            .catch(function (error) {
                console.error(error);
                dispatch(openNotification(`An error occurred while logging out: ${error}`, true));
            });
    }
};

export const logoutSuccess = (user) => {
    return { type: userConstants.LOGOUT_SUCCESS, user: user }
};
