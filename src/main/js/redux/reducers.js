import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import auth from "./reducers/auth";
import notification from "./reducers/notification";
import menu from "./reducers/menu";
import dataTable from "./reducers/dataTable";

export default combineReducers({
    routing: routerReducer,
    menu,
    auth,
    notification,
    dataTable
})
