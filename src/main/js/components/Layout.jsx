import React from "react";
import Menu from "./Menu";
import { connect } from "react-redux";
import { loadUser } from "../redux/actions";

@connect(() => {
})
class Layout extends React.Component {
    componentWillMount() {
        debugger
        if (localStorage.getItem("jsessionId")) {
            this.props.dispatch(loadUser)
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
