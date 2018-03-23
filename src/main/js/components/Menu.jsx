import React from "react";
import {
    AppBar,
    Drawer,
    FlatButton,
    IconButton,
    IconMenu,
    MenuItem
} from "material-ui";
import Login from "./Login";
import { SocialPersonOutline } from "material-ui/svg-icons/index";
import { connect } from "react-redux";
import { logout } from "../redux/actions";

@connect((store) => ({ user: store.auth.user }))
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationOpened: false,
            loginOpened: false
        };
    }

    render() {
        const isLoggedIn = this.props.user;
        const openMenu = () => this.setState({ navigationOpened: true });
        const closeMenu = () => this.setState({ navigationOpened: false });
        const closeLogin = () => this.setState({ loginOpened: false });

        const logInButton = <FlatButton label="Login" onClick={() => this.setState({ loginOpened: true })}/>;
        const logOutButton = (
            <IconMenu
                iconButtonElement={<IconButton><SocialPersonOutline/></IconButton>}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                targetOrigin={{ horizontal: "right", vertical: "top" }}>
                <MenuItem primaryText="Logout" onClick={() => this.props.dispatch(logout())}/>
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
                    <MenuItem onClick={closeMenu}>Menu Item</MenuItem>
                    <MenuItem onClick={closeMenu}>Menu Item 2</MenuItem>
                </Drawer>
                <Login
                    opened={this.state.loginOpened}
                    actions={{ closeLogin }}/>
            </div>
        );
    }
}

Menu.propTypes = {};

export default Menu;