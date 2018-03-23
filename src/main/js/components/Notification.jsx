import React from "react";
import { Snackbar } from "material-ui";
import { connect } from "react-redux";
import { closeNotification } from "../redux/actions";
import { ContentClear } from "material-ui/svg-icons/index";
import { white } from "material-ui/styles/colors";

const clearIconStyle = { marginTop: 5, color: white };

const Notification = (props) => {
    const { message } = props;
    const close = () => props.dispatch(closeNotification());
    return (
        <Snackbar
            open={message !== ""}
            message={message}
            autoHideDuration={4000}
            action={<ContentClear style={clearIconStyle}/>}
            onActionClick={close}
            onRequestClose={close}
        />
    )
};

export default connect((store) => ({ message: store.notification.message }))(Notification)