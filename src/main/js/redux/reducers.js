import { combineReducers } from "redux";
import auth from "./reducers/auth";
import notification from "./reducers/notification";

export default combineReducers({
    auth,
    notification
})