import store from "../store";
import { openNotification } from "./index";
import { userConstants } from "../constants";
import axios from "axios/index";

export const loginUser = (username, password) => {
    let user = null;
    axios.post("/login", { username, password })
        .then(function () {
            user = { username, password };
            store.dispatch(openNotification("Logged In"));
        })
        .catch(function (error) {
            console.error(error);
            store.dispatch(openNotification(`An error occured while logging in: ${error}`));
        });
    return { type: userConstants.USER_LOGIN, user }
};

export const logoutUser = () => {
    axios.get("/logout")
        .then(function () {
            store.dispatch(openNotification("Logged Out"));
        })
        .catch(function (error) {
            console.error(error);
            store.dispatch(openNotification(`An error occured while logging out: ${error}`));
        });
    return { type: userConstants.USER_LOGOUT }
};
