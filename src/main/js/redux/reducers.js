import { combineReducers } from "redux";
import auth from "./reducers/auth";
import notification from "./reducers/notification";
import menu from "./reducers/menu";

export default combineReducers({
    menu,
    auth,
    notification
})
