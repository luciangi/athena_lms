import { openNotification } from "./index";
import axios from "axios/index";
import { coursesConstants } from "../constants";

export const initCourses = () => async (dispatch) => {
    try {
        const courses = await axios.get("api/courses/all");
        dispatch({ type: coursesConstants.LOAD_COURSES, courses: courses.data })
    } catch (e) {
        console.error(error);
        dispatch(openNotification(`Fetch user error: ${error.response.data.message}`, true));
    }
};
