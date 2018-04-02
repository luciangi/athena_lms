import React from "react";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import { connect } from "react-redux";
import AccountCircle from "material-ui-icons/es/AccountCircle";
import {
    logoutUser,
    openLogin
} from "../redux/actions";
import {
    Drawer,
    Menu,
    MenuItem
} from "material-ui";
import {
    Assignment,
    Class
} from "material-ui-icons";
import Login from "./Login";

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    accountIcon: {
        marginLeft: 12
    }
};

@withStyles(styles)
@connect((store) => ({ user: store.auth.user }))
class AppMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationOpened: false,
            userMenuOpened: false
        };
    }

    render() {
        const { classes, user } = this.props;
        const isLoggedIn = !!user;
        const openMenu = () => this.setState({ navigationOpened: true });
        const closeMenu = () => this.setState({ navigationOpened: false });
        const openUserMenu = () => this.setState({ userMenuOpened: true });
        const closeUserMenu = () => this.setState({ userMenuOpened: false });

        const logInButton = (<Button color="inherit" onClick={() => this.props.dispatch(openLogin())}>Login</Button>);
        const logOutButton = (
            <div>
                <Button aria-owns={this.state.userMenuOpened ? "menu-appbar" : null}
                        aria-haspopup="true"
                        onClick={openUserMenu}
                        color="inherit">
                    {isLoggedIn && this.props.user.username}
                    <AccountCircle className={classes.accountIcon}/>
                </Button>
                <Menu id="menu-appbar"
                      anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                      }}
                      transformOrigin={{
                          vertical: "top",
                          horizontal: "right"
                      }}
                      open={this.state.userMenuOpened}
                      onClose={closeUserMenu}>
                    <MenuItem onClick={closeUserMenu}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => {
                        closeUserMenu();
                        this.props.dispatch(logoutUser())
                    }}>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={openMenu}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Athena
                        </Typography>
                        {!isLoggedIn && logInButton}
                        {isLoggedIn && logOutButton}
                    </Toolbar>
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.navigationOpened}
                        onRequestChange={closeMenu}>
                        <MenuItem leftIcon={<Class/>} onClick={closeMenu}>Courses</MenuItem>
                        <MenuItem leftIcon={<Assignment/>} onClick={closeMenu}>Assignments</MenuItem>
                    </Drawer>
                </AppBar>
                <Login/>
            </div>
        );
    }
}

AppMenu.propTypes = {};

export default AppMenu;
