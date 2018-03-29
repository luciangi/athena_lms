import { menuConstants } from "../constants";

export const openLogin = () => {
    return { type: menuConstants.LOGIN_OPEN }
};

export const closeLogin = () => {
    return { type: menuConstants.LOGIN_CLOSE }
};

export const loginError = () => {
    return { type: menuConstants.LOGIN_ERROR }
};
