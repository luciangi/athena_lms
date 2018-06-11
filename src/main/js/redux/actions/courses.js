import { openNotification } from "./index";
import axios from "axios/index";
import { coursesConstants } from "../constants";

export const initCourses = () => {
    return async (dispatch) => {
        axios.get("api/courses")
            .then(response => {
                dispatch({ type: coursesConstants.LOAD_COURSES, courses: response.data.content })
            })
            .catch(error => {
                console.error(error);
                dispatch(openNotification(`Fetch user error: ${error.response.data.message}`, true));
            });
    }
};
