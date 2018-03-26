import React from "react";
import {
    Dialog,
    FlatButton,
    TextField
} from "material-ui";
import { connect } from "react-redux";
import {
    closeLogin,
    loginUser
} from "../redux/actions";

const initialState = {
    username: null,
    password: null,
    pristine: true
};

@connect((store) => ({
    user: store.auth.user,
    loginOpened: store.auth.loginOpened,
    error: store.auth.error
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

        const cancelButton = <FlatButton
            label="Cancel"
            onClick={close}/>;
        const submitButton = <FlatButton
            label="Submit"
            primary
            disabled={this.state.pristine || !this.state.username || !this.state.password}
            onClick={submit}/>;

        return (
            <Dialog
                title="Login to Athena"
                actions={[ cancelButton, submitButton ]}
                modal={true}
                open={this.props.loginOpened}
                onRequestClose={close}>
                <div>
                    <TextField
                        floatingLabelText="Username"
                        errorText={this.state.pristine ? this.props.error : (!this.state.username ? "Username is required" : false)}
                        onChange={(_, username) => this.setState({ username, pristine: false })}/>
                </div>
                <div>
                    <TextField
                        type="password"
                        floatingLabelText="Password"
                        errorText={this.state.pristine ? this.props.error : (!this.state.password ? "Password is required" : false)}
                        onChange={(_, password) => this.setState({ password, pristine: false })}/>
                </div>
            </Dialog>
        )
    }
}

Login.propTypes = {};

export default Login
