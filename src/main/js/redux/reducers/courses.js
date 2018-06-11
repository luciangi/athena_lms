import { coursesConstants } from "../constants";

export default (state = [], action) => {
    switch (action.type) {
        case coursesConstants.LOAD_COURSES: {
            return action.courses
        }
    }
    return state
}
