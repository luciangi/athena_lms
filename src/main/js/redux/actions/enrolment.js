import { openNotification } from "./index";
import axios from "axios/index";
import { coursesConstants } from "../constants";

export const initEnrolledCourses = () => async (dispatch) => {
    try {
        dispatch({ type: coursesConstants.CLEAR_COURSES });
        const enrolledCourses = await axios.get("api/courses/enrolments");
        dispatch({ type: coursesConstants.LOAD_COURSES, courses: enrolledCourses.data })
    } catch (e) {
        console.error(error);
        dispatch(openNotification(`Fetch courses error: ${error.response.data.message}`, true));
    }
};

export const enrol = (courseId) => async (dispatch) => {
    try {
        const courseName = await axios.post(`api/enrolment/enrol/${courseId}`);
        dispatch(openNotification(`Enrolled to course ${courseName.data}`, false));
    } catch (e) {
        console.error(error);
        dispatch(openNotification(`Fetch courses error: ${error.response.data.message}`, true));
    }
};
