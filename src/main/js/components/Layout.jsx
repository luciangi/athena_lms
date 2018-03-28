import React from "react";
import Menu from "./Menu";
import { connect } from "react-redux";
import Admin from "./routes/Admin";
import Home from "./routes/Home";
import Tutor from "./routes/Tutor";
import Student from "./routes/Student";
import Notification from "./Notification";
import { loadUser } from "../redux/actions";
import {
    Route,
    Router
} from "react-router";
import { history } from "../redux/store";
import { routesConstants } from "../redux/constants";

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
                <Menu/>
                <Router history={history}>
                    <Route path={routesConstants.ROOT} component={Home}/>
                    <Route path={routesConstants.ADMIN_ROOT} component={Admin}/>
                    <Route path={routesConstants.TUTOR_ROOT} component={Tutor}/>
                    <Route path={routesConstants.STUDENT_ROOT} component={Student}/>
                </Router>
                <Notification/>
            </div>
        );
    }
}

Layout.propTypes = {};

export default Layout
