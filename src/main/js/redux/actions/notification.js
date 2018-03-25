import { notificationConstants } from "../constants";

export const openNotification = (message) => {
    return { type: notificationConstants.NOTIFICATION_OPEN, message }
};

export const closeNotification = () => {
    return { type: notificationConstants.NOTIFICATION_CLOSE }
};
