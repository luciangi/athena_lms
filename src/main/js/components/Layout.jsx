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
import Subjects from "./routes/Subjects";
import { withStyles } from "material-ui";

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    }
});

@withStyles(styles, { withTheme: true })
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
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppMenu/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Router history={history}>
                        <Route path={"/"} component={Home}/>
                        <Route path={"/admin"} component={Admin}/>
                        <Route path={"/tutor"} component={Tutor}/>
                        <Route path={"/student"} component={Student}/>
                        <Route path={"/subjects"} component={Subjects}/>
                    </Router>
                    <Notification/>
                </main>
            </div>
        );
    }
}

Layout.propTypes = {};

export default Layout
