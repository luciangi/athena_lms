import React from "react";
import {
    AppBar,
    Button,
    Card,
    Dialog,
    FormControl,
    IconButton,
    Input,
    InputLabel,
    Paper,
    Slide,
    Toolbar,
    Typography
} from "material-ui";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles/index";
import { Close } from "@material-ui/icons/es/index";

const styles = theme => ({
    appBar: {
        position: "relative"
    },
    toolbar: {
        display: "flex"
    },
    register: {
        marginLeft: "auto"
    },
    paper: {
        margin: "10%"
    },
    formControl: {
        padding: "20px"
    }
});

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
};

const RegisterStudent = ({ open, onClose, classes }) => (
    <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        transition={Transition}>
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton color="inherit" onClick={onClose} aria-label="Close">
                    <Close/>
                </IconButton>
                <Typography variant="title" color="inherit">
                    Register Student
                </Typography>
                <Button color="inherit" onClick={onClose} className={classes.register}>
                    Register
                </Button>
            </Toolbar>
        </AppBar>
        <div>
            <Paper elevation={1} className={classes.paper}>
                <Card>
                    <div className={classes.formControl}>
                        <FormControl
                            // error={this.state.pristine ? this.props.error : !this.state.username}
                            aria-describedby="name-error-text"
                            fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                // onChange={(event) => this.setState({ username: event.target.value, pristine: false })}
                            />
                            {/*{(!this.state.pristine && !this.state.username) && (*/}
                            {/*<FormHelperText id="username-required">*/}
                            {/*Username is required*/}
                            {/*</FormHelperText>)}*/}
                        </FormControl>
                        <FormControl
                            // error={this.state.pristine ? this.props.error : !this.state.username}
                            aria-describedby="name-error-text"
                            fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                                id="username"
                                // onChange={(event) => this.setState({ username: event.target.value, pristine: false })}
                            />
                            {/*{(!this.state.pristine && !this.state.username) && (*/}
                            {/*<FormHelperText id="username-required">*/}
                            {/*Username is required*/}
                            {/*</FormHelperText>)}*/}
                        </FormControl>
                        <FormControl
                            // error={this.state.pristine ? this.props.error : !this.state.username}
                            aria-describedby="name-error-text"
                            fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                // onChange={(event) => this.setState({ username: event.target.value, pristine: false })}
                            />
                            {/*{(!this.state.pristine && !this.state.username) && (*/}
                            {/*<FormHelperText id="username-required">*/}
                            {/*Username is required*/}
                            {/*</FormHelperText>)}*/}
                        </FormControl>
                        <FormControl
                            // error={this.state.pristine ? this.props.error : !this.state.username}
                            aria-describedby="name-error-text"
                            fullWidth>
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <Input
                                id="confirmPassword"
                                // onChange={(event) => this.setState({ username: event.target.value, pristine: false })}
                            />
                            {/*{(!this.state.pristine && !this.state.username) && (*/}
                            {/*<FormHelperText id="username-required">*/}
                            {/*Username is required*/}
                            {/*</FormHelperText>)}*/}
                        </FormControl>
                        <FormControl
                            // error={this.state.pristine ? this.props.error : !this.state.username}
                            aria-describedby="name-error-text"
                            fullWidth>
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input
                                id="firstName"
                                // onChange={(event) => this.setState({ username: event.target.value, pristine: false })}
                            />
                            {/*{(!this.state.pristine && !this.state.username) && (*/}
                            {/*<FormHelperText id="username-required">*/}
                            {/*Username is required*/}
                            {/*</FormHelperText>)}*/}
                        </FormControl>
                        <FormControl
                            // error={this.state.pristine ? this.props.error : !this.state.username}
                            aria-describedby="name-error-text"
                            fullWidth>
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input
                                id="lastName"
                                // onChange={(event) => this.setState({ username: event.target.value, pristine: false })}
                            />
                            {/*{(!this.state.pristine && !this.state.username) && (*/}
                            {/*<FormHelperText id="username-required">*/}
                            {/*Username is required*/}
                            {/*</FormHelperText>)}*/}
                        </FormControl>
                        <FormControl
                            // error={this.state.pristine ? this.props.error : !this.state.username}
                            aria-describedby="name-error-text"
                            fullWidth>
                            <InputLabel htmlFor="address">Address</InputLabel>
                            <Input
                                id="address"
                                // onChange={(event) => this.setState({ username: event.target.value, pristine: false })}
                            />
                            {/*{(!this.state.pristine && !this.state.username) && (*/}
                            {/*<FormHelperText id="username-required">*/}
                            {/*Username is required*/}
                            {/*</FormHelperText>)}*/}
                        </FormControl>
                    </div>
                </Card>
            </Paper>
        </div>
    </Dialog>
);

RegisterStudent.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(RegisterStudent)
