import React from "react";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "material-ui";
import {
    AccountCircle,
    Book,
    ChevronLeft,
    ChevronRight,
    School
} from "material-ui-icons";
import MenuIcon from "material-ui-icons/Menu";
import { connect } from "react-redux";
import {
    homeRoute,
    logoutUser,
    openLogin,
    profileRoute,
    subjectsRoute
} from "../redux/actions";
import Login from "./Login";

const drawerWidth = 240;

const styles = theme => ({
    flex: {
        flex: 1
    },
    appBar: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create([ "width", "margin" ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create([ "width", "margin" ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing.unit * 7,
        [ theme.breakpoints.up("sm") ]: {
            width: theme.spacing.unit * 9
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    accountIcon: {
        marginLeft: 12
    },
    homeIcon: {
        marginRight: 12
    }
});

@withStyles(styles, { withTheme: true })
@connect((store) => ({ user: store.auth.user }))
class AppMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            userMenuAnchorEl: null
        };
    }

    render() {
        const { classes, theme, user } = this.props;
        const isLoggedIn = !!user;
        const openDrawer = () => this.setState({ drawerOpened: true });
        const closeDrawer = () => this.setState({ drawerOpened: false });
        const openUserMenu = (event) => this.setState({ userMenuAnchorEl: event.currentTarget });
        const closeUserMenu = () => this.setState({ userMenuAnchorEl: null });

        const logInButton = (<Button color="inherit" onClick={() => this.props.dispatch(openLogin())}>Login</Button>);
        const logOutButton = (
            <div>
                <Button aria-owns={this.state.userMenuAnchorEl ? "menu-appbar" : null}
                        aria-haspopup="true"
                        onClick={openUserMenu}
                        color="inherit">
                    {isLoggedIn && this.props.user.username}
                    <AccountCircle className={classes.accountIcon}/>
                </Button>
                <Menu id="menu-appbar"
                      anchorEl={this.state.userMenuAnchorEl}
                      anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                      }}
                      transformOrigin={{
                          vertical: "top",
                          horizontal: "right"
                      }}
                      open={Boolean(this.state.userMenuAnchorEl)}
                      onClose={closeUserMenu}>
                    <MenuItem onClick={() => {
                        closeUserMenu();
                        this.props.dispatch(profileRoute())
                    }}>
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
            <div>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.drawerOpened && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.state.drawerOpened}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={openDrawer}
                            className={classNames(classes.menuButton, this.state.drawerOpened && classes.hide)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title"
                                    color="inherit"
                                    className={classes.flex}
                                    onClick={() => this.props.dispatch(homeRoute())}>
                            <School className={classes.homeIcon}/>
                            Athena
                        </Typography>
                        {!isLoggedIn && logInButton}
                        {isLoggedIn && logOutButton}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.drawerOpened && classes.drawerPaperClose)
                    }}
                    open={this.state.drawerOpened}>
                    <div className={classes.toolbar}>
                        <IconButton onClick={closeDrawer}>
                            {theme.direction === "rtl" ? <ChevronRight/> : <ChevronLeft/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <div>
                            <ListItem button onClick={() => this.props.dispatch(subjectsRoute())}>
                                <ListItemIcon>
                                    <Book/>
                                </ListItemIcon>
                                <ListItemText primary="Subjects"/>
                            </ListItem>
                            {/*<ListItem button>*/}
                            {/*<ListItemIcon>*/}
                            {/*<Assignment/>*/}
                            {/*</ListItemIcon>*/}
                            {/*<ListItemText primary="Assignments"/>*/}
                            {/*</ListItem>*/}
                        </div>
                    </List>
                    <Divider/>
                </Drawer>
                <Login/>
            </div>
        );
    }
}

AppMenu.propTypes = {};

export default AppMenu;
