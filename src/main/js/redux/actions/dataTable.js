import axios from "axios/index";
import { openNotification } from "./index";
import { dataTableConstants } from "../constants";

export const loadData = (apiType) => {
    return (dispatch) => {
        dispatch(loadDataBegin(apiType));
        axios.get(`api/${apiType}`)
            .then((response) => {
                dispatch(loadDataSuccess(apiType, response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(loadDataError(apiType, error));
                dispatch(openNotification(`Load data error for ${apiType}: ${error.response.data.message}`, true));
            });
    }
};

function loadDataBegin(apiType) {
    return { type: dataTableConstants.LOAD_DATA_BEGIN, apiType }
}

function loadDataSuccess(apiType, data) {
    return { type: dataTableConstants.LOAD_DATA_SUCCESS, apiType, rows: data._embedded[ apiType ] }
}

function loadDataError(apiType, error) {
    return { type: dataTableConstants.LOAD_DATA_ERROR, apiType, error: error }
}
