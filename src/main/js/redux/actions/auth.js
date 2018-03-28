import { openNotification } from "./index";
import {
    apiSuffix,
    authConstants
} from "../constants";
import axios from "axios/index";
import {
    closeLogin,
    loginError
} from "./menu";

export const loadUser = () => {
    return (dispatch) => {
        axios.get(`${apiSuffix}/user`)
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

        axios.post(`${apiSuffix}/login`, bodyFormData)
            .then(function (response) {
                dispatch(loginSuccess(response.data));
                dispatch(openNotification(`Hello ${response.data.username}`));
                dispatch(closeLogin());
            })
            .catch(function (error) {
                dispatch(loginError());
                dispatch(openNotification(`Login error: ${error.response.data.message}`, true));
            });
    }
};

export const loginSuccess = (user) => {
    return { type: authConstants.LOGIN_SUCCESS, user: user }
};

export const logoutUser = () => {
    return (dispatch) => {
        axios.get(`${apiSuffix}/logout`)
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
    return { type: authConstants.LOGOUT_SUCCESS }
};
