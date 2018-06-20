import { openNotification } from "./index";
import axios from "axios/index";
import { coursesConstants } from "../constants";

export const initCourses = () => async (dispatch) => {
    try {
        const courses = await axios.get("api/courses/all");
        dispatch({ type: coursesConstants.LOAD_COURSES, courses: courses.data })
    } catch (e) {
        console.error(error);
        dispatch(openNotification(`Fetch courses error: ${error.response.data.message}`, true));
    }
};

export const initSubjects = () => async (dispatch) => {
    try {
        const subjects = await axios.get("api/subjects");
        dispatch({ type: coursesConstants.LOAD_SUBJECTS, subjects: subjects.data.content })
    } catch (e) {
        console.error(error);
        dispatch(openNotification(`Fetch subjects error: ${error.response.data.message}`, true));
    }
};

export const saveCourse = (course) => async (dispatch) => {
    course.author = undefined;
    course.subject = undefined;
    try {
        if (course.id) {
            await axios.patch(`api/courses/${course.id}`, course);
        } else {
            await axios.post(`api/courses`, course);
        }
        dispatch(initCourses())
    } catch (e) {
        console.error(error);
        dispatch(openNotification(`Save courses error: ${error.response.data.message}`, true));
    }
};
