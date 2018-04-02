import React from "react";
import { connect } from "react-redux";
import { loadUser } from "../redux/actions";
import AppMenu from "./AppMenu";
import Notification from "./Notification";
import {
    Route,
    Router
} from "react-router";
import { history } from "../redux/store";
import Home from "./routes/Home";
import Admin from "./routes/Admin";
import Tutor from "./routes/Tutor";
import Student from "./routes/Student";

@connect((store) => ({
    user: store.auth.user
}))
class Layout extends React.Component {
    componentWillMount() {
        if (!this.props.user) {
            this.props.dispatch(loadUser())
        }
    }

    render() {
        return (
            <div>
                <AppMenu/>
                <Router history={history}>
                    <Route path={"/"} component={Home}/>
                    <Route path={"/admin"} component={Admin}/>
                    <Route path={"/tutor"} component={Tutor}/>
                    <Route path={"/student"} component={Student}/>
                </Router>
                <Notification/>
            </div>
        );
    }
}

Layout.propTypes = {};

export default Layout
