import React from "react";
import { Snackbar } from "material-ui";
import { muiThemeable } from "material-ui/styles/index";
import {
    red500,
    white
} from "material-ui/styles/colors";
import { ContentClear } from "material-ui/svg-icons/index";
import { connect } from "react-redux";
import { closeNotification } from "../redux/actions";

const Notification = (props) => {
    const { message, error } = props;
    const close = () => props.dispatch(closeNotification());
    return (
        <Snackbar
            open={message !== ""}
            message={message}
            autoHideDuration={6000}
            bodyStyle={{ minWidth: 800 }}
            contentStyle={{ color: error ? red500 : white }}
            action={<ContentClear style={{ marginTop: 5, color: props.muiTheme.palette.accent1Color }}/>}
            onActionClick={close}
            onRequestClose={close}
        />
    )
};

export default connect((store) => ({
    message: store.notification.message,
    error: store.notification.error
}))(muiThemeable()(Notification))
