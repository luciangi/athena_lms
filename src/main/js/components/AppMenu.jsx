import React from "react";
import PropTypes from "prop-types";
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
    Assignment,
    AssignmentInd,
    Book,
    ChevronLeft,
    ChevronRight,
    FolderOpen,
    Menu as MenuIcon,
    Person,
    PersonOutline,
    School
} from "@material-ui/icons/es/index";
import { connect } from "react-redux";
import {
    assignmentsRoute,
    coursesRoute,
    enrolmentsRoute,
    homeRoute,
    isAdminUser,
    isStudentUser,
    isTutorUser,
    logoutUser,
    openLogin,
    profileRoute,
    studentsRoute,
    subjectsRoute,
    tutorsRoute
} from "../redux/actions";
import Login from "./Login";
import RegisterStudent from "./RegisterStudent";

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
    actionsMargins: {
        marginRight: 12,
        marginLeft: 12
    }
});

@withStyles(styles, { withTheme: true })
@connect((store) => ({ user: store.auth.user }))
class AppMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            userRegisterOpen: false,
            userMenuAnchorEl: null
        };
    }

    render() {
        const { classes, theme, user, dispatch } = this.props;
        const isLoggedIn = !!user;
        const openDrawer = () => this.setState({ drawerOpened: true });
        const closeDrawer = () => this.setState({ drawerOpened: false });
        const openUserMenu = (event) => this.setState({ userMenuAnchorEl: event.currentTarget });
        const closeUserMenu = () => this.setState({ userMenuAnchorEl: null });
        const openUserRegister = () => this.setState({ userRegisterOpen: true });
        const closeUserRegister = () => this.setState({ userRegisterOpen: false });

        const registerButton = (
            <Button color="inherit"
                    className={classes.actionsMargins}
                    onClick={openUserRegister}>
                Register
            </Button>
        );

        const logInButton = (
            <Button color="inherit"
                    className={classes.actionsMargins}
                    onClick={() => dispatch(openLogin())}>
                Login
            </Button>
        );

        const logOutButton = (
            <div>
                <Button aria-owns={this.state.userMenuAnchorEl ? "menu-appbar" : null}
                        aria-haspopup="true"
                        onClick={openUserMenu}
                        color="inherit"
                        className={classes.actionsMargins}>
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
                        dispatch(profileRoute());
                    }}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => {
                        closeUserMenu();
                        this.setState({ drawerOpened: false });
                        dispatch(logoutUser());
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
                        {user && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={openDrawer}
                                className={classNames(classes.menuButton, this.state.drawerOpened && classes.hide)}>
                                <MenuIcon/>
                            </IconButton>)
                        }
                        <Typography variant="title"
                                    color="inherit"
                                    className={classes.flex}
                                    onClick={() => dispatch(homeRoute())}>
                            <School className={classes.actionsMargins}/>
                            Athena
                        </Typography>
                        {!isLoggedIn && registerButton}
                        {!isLoggedIn && logInButton}
                        {isLoggedIn && logOutButton}
                    </Toolbar>
                </AppBar>
                {user && (
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
                                <ConditionalListItem
                                    label="Tutors"
                                    onClick={() => dispatch(tutorsRoute())}
                                    show={isAdminUser()}>
                                    <Person/>
                                </ConditionalListItem>
                                <ConditionalListItem
                                    label="Students"
                                    onClick={() => dispatch(studentsRoute())}
                                    show={isAdminUser()}>
                                    <PersonOutline/>
                                </ConditionalListItem>
                                <ConditionalListItem
                                    label="Subjects"
                                    onClick={() => dispatch(subjectsRoute())}
                                    show={isAdminUser() || isTutorUser()}>
                                    <FolderOpen/>
                                </ConditionalListItem>
                                <ConditionalListItem
                                    label="Courses"
                                    onClick={() => dispatch(coursesRoute())}
                                    show={isTutorUser()}>
                                    <Book/>
                                </ConditionalListItem>
                                <ConditionalListItem
                                    label="Assignments"
                                    onClick={() => dispatch(assignmentsRoute())}
                                    show={isTutorUser() || isStudentUser()}>
                                    <Assignment/>
                                </ConditionalListItem>
                                <ConditionalListItem
                                    label="Enrolments"
                                    onClick={() => dispatch(enrolmentsRoute())}
                                    show={isStudentUser()}>
                                    <AssignmentInd/>
                                </ConditionalListItem>
                            </div>
                        </List>
                        <Divider/>
                    </Drawer>)}
                <Login/>
                <RegisterStudent open={this.state.userRegisterOpen} onClose={closeUserRegister}/>
            </div>
        );
    }
}

AppMenu.propTypes = {};

export default AppMenu;

const ConditionalListItem = ({ children, label, onClick, show }) => (
    show && <ListItem button onClick={onClick}>
        <ListItemIcon>
            {children}
        </ListItemIcon>
        <ListItemText primary={label}/>
    </ListItem>
);

ConditionalListItem.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};
