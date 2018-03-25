import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    FlatButton,
    TextField
} from "material-ui";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/index";

@connect(() => ({}))
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };
    }

    render() {
        const { opened, actions: { closeLogin } } = this.props;
        const submit = () => {
            this.props.dispatch(loginUser(this.state.username, this.state.password));
            closeLogin()
        };

        const cancelButton = <FlatButton
            label="Cancel"
            primary
            onClick={closeLogin}/>;
        const submitButton = <FlatButton
            label="Submit"
            primary
            disabled={false}
            onClick={submit}/>;

        return (
            <Dialog
                title="Login to Athena"
                actions={[ cancelButton, submitButton ]}
                modal={false}
                open={opened}
                onRequestClose={closeLogin}>
                <div>
                    <TextField
                        floatingLabelText="Username"
                        onChange={(_, username) => this.setState({ username })}/>
                </div>
                <div>
                    <TextField
                        type="password"
                        floatingLabelText="Password"
                        onChange={(_, password) => this.setState({ password })}/>
                </div>
            </Dialog>
        )
    }
}

Login.propTypes = {
    opened: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
        closeLogin: PropTypes.func.isRequired
    }).isRequired
};

export default Login
