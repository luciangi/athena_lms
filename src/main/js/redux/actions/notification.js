import { notificationConstants } from "../constants";

export const openNotification = (message, error) => {
    return { type: notificationConstants.NOTIFICATION_OPEN, message, error }
};

export const closeNotification = () => {
    return { type: notificationConstants.NOTIFICATION_CLOSE }
};
