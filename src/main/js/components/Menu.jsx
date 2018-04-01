import React from "react";
import {
    AppBar,
    Drawer,
    FlatButton,
    IconMenu,
    MenuItem
} from "material-ui";
import Login from "./Login";
import {
    ActionAssignment,
    ActionClass,
    SocialPersonOutline
} from "material-ui/svg-icons/index";
import { connect } from "react-redux";
import {
    logoutUser,
    openLogin
} from "../redux/actions";
import { white } from "material-ui/styles/colors";

@connect((store) => ({ user: store.auth.user }))
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationOpened: false
        };
    }

    render() {
        const isLoggedIn = this.props.user;
        const openMenu = () => this.setState({ navigationOpened: true });
        const closeMenu = () => this.setState({ navigationOpened: false });

        const logInButton = <FlatButton label="Login" onClick={() => this.props.dispatch(openLogin())}/>;
        const logOutButton = (
            <IconMenu
                iconButtonElement={
                    <FlatButton
                        label={isLoggedIn && this.props.user.username}
                        labelPosition="before"
                        secondary={false}
                        style={{ marginTop: 7 }}
                        labelStyle={{ color: white }}
                        icon={<SocialPersonOutline color={white}/>}
                    />
                }
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                targetOrigin={{ horizontal: "right", vertical: "top" }}>
                <MenuItem primaryText="Logout" onClick={() => this.props.dispatch(logoutUser())}/>
            </IconMenu>
        );

        return (
            <div>
                <AppBar
                    title="Athena"
                    iconElementRight={isLoggedIn ? logOutButton : logInButton}
                    onLeftIconButtonClick={openMenu}/>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.navigationOpened}
                    onRequestChange={closeMenu}>
                    <MenuItem leftIcon={<ActionClass/>} onClick={closeMenu}>Courses</MenuItem>
                    <MenuItem leftIcon={<ActionAssignment/>} onClick={closeMenu}>Assignments</MenuItem>
                </Drawer>
                <Login/>
            </div>
        );
    }
}

Menu.propTypes = {};

export default Menu;
