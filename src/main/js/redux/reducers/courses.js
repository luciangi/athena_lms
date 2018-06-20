import { coursesConstants } from "../constants";

export default (state = { activeCourses: [], activeSubjects: [] }, action) => {
    switch (action.type) {
        case coursesConstants.LOAD_COURSES: {
            return { ...state, activeCourses: action.courses }
        }
        case coursesConstants.LOAD_SUBJECTS: {
            return { ...state, activeSubjects: action.subjects }
        }
    }
    return state
}
