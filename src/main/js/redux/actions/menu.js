import { menuConstants } from "../constants";
import { push } from "react-router-redux";
import { getDefaultRouteByHighestPriorityAuthority } from "./auth";

export const openLogin = () => {
    return { type: menuConstants.LOGIN_OPEN }
};

export const closeLogin = () => {
    return { type: menuConstants.LOGIN_CLOSE }
};

export const loginError = () => {
    return { type: menuConstants.LOGIN_ERROR }
};

export const subjectsRoute = () => {
    return (dispatch) => {
        dispatch(push("/subjects"));
    }
};

export const homeRoute = () => {
    return (dispatch) => {
        dispatch(push("/"));
    }
};

export const profileRoute = () => {
    return (dispatch) => {
        dispatch(push(getDefaultRouteByHighestPriorityAuthority()));
    }
};
