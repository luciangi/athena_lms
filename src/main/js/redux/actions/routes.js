import { push } from "react-router-redux";
import { getDefaultRouteByHighestPriorityAuthority } from "./index";

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
        dispatch(push("/tutors"));
    }
};

export const assignmentsRoute = () => {
    return (dispatch) => {
        dispatch(push("/tutors"));
    }
};

export const coursesRoute = () => {
    return (dispatch) => {
        dispatch(push("/tutors"));
    }
};
