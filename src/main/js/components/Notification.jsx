import React from "react";
import {
    IconButton,
    Snackbar,
    withTheme
} from "material-ui";
import { connect } from "react-redux";
import { closeNotification } from "../redux/actions";
import red from "material-ui/es/colors/red";
import grey from "material-ui/es/colors/grey";
import { Clear } from "@material-ui/icons/es/index";

const Notification = (props) => {
    const { message, error } = props;
    const close = () => props.dispatch(closeNotification());
    return (
        <Snackbar
            open={message !== ""}
            message={message}
            autoHideDuration={6000}
            SnackbarContentProps={{ style: { color: error ? red[ 500 ] : grey[ 50 ] } }}
            action={<IconButton onClick={close}><Clear color="secondary" style={{ color: props.theme.palette.accent1Color }}/></IconButton>}
            onClose={close}
        />
    )
};

export default connect((store) => ({
    message: store.notification.message,
    error: store.notification.error
}))(withTheme()(Notification))
