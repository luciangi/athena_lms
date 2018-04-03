import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Input,
    InputLabel
} from "material-ui";
import { connect } from "react-redux";
import {
    closeLogin,
    loginUser
} from "../redux/actions";
import Button from "material-ui/Button";

const initialState = {
    username: null,
    password: null,
    pristine: true
};

@connect((store) => ({
    user: store.auth.user,
    loginOpened: store.menu.loginOpened,
    error: store.menu.error
}))
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loginOpened !== this.props.loginOpened) {
            this.setState(initialState);
        }
    }

    render() {
        const close = () => {
            this.setState(initialState);
            this.props.dispatch(closeLogin())
        };

        const submit = () => {
            if (!this.state.pristine && this.state.username && this.state.password) {
                this.props.dispatch(loginUser(this.state.username, this.state.password));
                this.setState({ pristine: true });
            }
        };

        return (
            <Dialog
                open={this.props.loginOpened}
                onClose={close}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login to Athena</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Login to Athena using a tutor or student user. If you are a student you can create an account using the register button.
                    </DialogContentText>
                    <br/>
                    <div>
                        <FormControl error={this.state.pristine ? this.props.error : !this.state.username}
                                     aria-describedby="name-error-text"
                                     fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username"
                                   onChange={(event) => this.setState({ username: event.target.value, pristine: false })}/>
                            {(!this.state.pristine && !this.state.username) && (
                                <FormHelperText id="username-required">
                                    Username is required
                                </FormHelperText>)}
                        </FormControl>
                    </div>
                    <br/>
                    <div>
                        <FormControl error={this.state.pristine ? this.props.error : !this.state.password}
                                     aria-describedby="name-error-text"
                                     fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password"
                                   type="password"
                                   onChange={(event) => this.setState({ password: event.target.value, pristine: false })}/>
                            {(!this.state.pristine && !this.state.password) && (
                                <FormHelperText id="password-required">
                                    Password is required
                                </FormHelperText>)}
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={close}
                        color="secondary">Cancel</Button>
                    <Button
                        disabled={this.state.pristine || !this.state.username || !this.state.password}
                        onClick={submit}
                        variant="raised"
                        color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

Login.propTypes = {};

export default Login
