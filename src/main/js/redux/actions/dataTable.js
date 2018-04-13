import axios from "axios/index";
import { openNotification } from "./index";
import { dataTableConstants } from "../constants";
import { dataTableInitialState } from "../reducers/dataTable";

const loadBegin = profile => {
    return { type: dataTableConstants.LOAD_BEGIN, profile }
};

const loadEnd = profile => {
    return { type: dataTableConstants.LOAD_END, profile }
};

export const loadData = (profile) => {
    return (dispatch, getState) => {
        const { currentPage, pageSize, sorting } = getState().dataTable[ profile ] || dataTableInitialState;
        dispatch(loadBegin(profile));
        axios.get(`api/${profile}`, {
            params: {
                page: currentPage,
                size: pageSize,
                sort: sorting.length > 0 && `${sorting[ 0 ].columnName},${sorting[ 0 ].direction}`
            }
        }).then((response) => {
            const data = response.data;
            dispatch({
                type: dataTableConstants.LOAD_DATA_SUCCESS,
                profile,
                rows: data.content,
                currentPage: data.page.number,
                pageSize: data.page.size,
                totalCount: data.page.totalElements
            });
            dispatch(loadEnd(profile));
        }).catch((error) => {
            console.error(error);
            dispatch({ type: dataTableConstants.LOAD_DATA_ERROR, profile, error: error });
            dispatch(openNotification(`Load data error for ${profile}: ${error.response.data.message}`, true));
        });
    }
};

export const changePage = (profile, currentPage) => {
    return (dispatch) => {
        dispatch({ type: dataTableConstants.CHANGE_PAGE, profile, currentPage: currentPage });
        dispatch(loadData(profile))
    }
};

export const changePageSize = (profile, pageSize) => {
    return (dispatch) => {
        dispatch({ type: dataTableConstants.CHANGE_PAGE_SIZE, profile, pageSize: pageSize });
        dispatch(loadData(profile))
    }
};

export const changePageSorting = (profile, sorting) => {
    return (dispatch) => {
        dispatch({ type: dataTableConstants.CHANGE_PAGE_SORTING, profile, sorting: sorting });
        dispatch(loadData(profile))
    }
};

export const addData = (profile, data) => {
    return (dispatch) => {
        axios.post(`api/${profile}`, data)
            .then(() => {
                dispatch(loadData(profile));
                dispatch(openNotification(`Added ${profile}`));
            })
            .catch((error) => {
                console.error(error);
                dispatch(openNotification(`Add data error for ${profile}: ${error.response.data.message}`, true));
            });
    }
};

export const updateData = (profile, data) => {
    return (dispatch, getState) => {
        const rowId = Object.keys(data)[ 0 ];
        const uuid = (getState().dataTable[ profile ] || dataTableInitialState).rows[ rowId ].id;
        axios.patch(`api/${profile}/${uuid}`, data[ rowId ])
            .then(() => {
                dispatch(loadData(profile));
                dispatch(openNotification(`Added ${profile}`));
            })
            .catch((error) => {
                console.error(error);
                dispatch(openNotification(`Update data error for ${profile}: ${error.response.data.message}`, true));
            });
    }
};

export const deleteData = (profile, rowId) => {
    return (dispatch, getState) => {
        const uuid = (getState().dataTable[ profile ] || dataTableInitialState).rows[ rowId ].id;
        axios.delete(`api/${profile}/${uuid}`)
            .then(() => {
                dispatch(loadData(profile));
                dispatch(openNotification(`Deleted ${profile}`));
            })
            .catch((error) => {
                console.error(error);
                dispatch(openNotification(`Delete data error for ${profile}: ${error.response.data.message}`, true));
            });
    }
};
