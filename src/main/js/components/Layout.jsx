import React from "react";
import Menu from "./Menu";
import { connect } from "react-redux";
import { loadUser } from "../redux/actions";

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
                <span>Layout</span>
            </div>
        );
    }
}

Layout.propTypes = {};

export default Layout
