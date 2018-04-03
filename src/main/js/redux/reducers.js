import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import auth from "./reducers/auth";
import notification from "./reducers/notification";
import menu from "./reducers/menu";
import subjects from "./reducers/subjects";

export default combineReducers({
    routing: routerReducer,
    menu,
    auth,
    notification,
    subjects
})
