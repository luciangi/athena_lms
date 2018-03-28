import React from "react";
import Menu from "./Menu";
import { connect } from "react-redux";
import { loadUser } from "../redux/actions";
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Admin from "./routes/Admin";
import Home from "./routes/Home";
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
                <Menu/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/admin' component={Admin}/>
                        <Route exact path='/tutor' component={Tutor}/>
                        <Route exact path='/student' component={Student}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

Layout.propTypes = {};

export default Layout
