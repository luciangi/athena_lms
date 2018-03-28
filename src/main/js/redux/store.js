import {
    applyMiddleware,
    compose,
    createStore
} from "redux";
import promise from "redux-promise-middleware"
import { browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import thunk from "redux-thunk";
import reducer from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(promise(), thunk)));

export const history = syncHistoryWithStore(browserHistory, store);

export default store
