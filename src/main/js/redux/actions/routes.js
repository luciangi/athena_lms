import { push } from "react-router-redux";
import { getDefaultRouteByHighestPriorityAuthority } from "./index";
import store from "../store";

export const homeRoute = () => {
    return (dispatch) => {
        dispatch(push("/"));
    }
};

export const profileRoute = (user = store.getState().auth.user) => {
    return (dispatch) => {
        dispatch(push(getDefaultRouteByHighestPriorityAuthority(user)));
    }
};

export const tutorsRoute = () => {
    return (dispatch) => {
        dispatch(push("/tutors"));
    }
};

export const studentsRoute = () => {
    return (dispatch) => {
        dispatch(push("/students"));
    }
};

export const subjectsRoute = () => {
    return (dispatch) => {
        dispatch(push("/subjects"));
    }
};

export const enrolmentsRoute = () => {
    return (dispatch) => {
        dispatch(push("/enrolments"));
    }
};

export const assignmentsRoute = () => {
    return (dispatch) => {
        dispatch(push("/assignments"));
    }
};

export const coursesRoute = () => {
    return (dispatch) => {
        dispatch(push("/courses"));
    }
};
