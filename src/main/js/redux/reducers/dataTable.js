import { dataTableConstants } from "../constants";

export const dataTableInitialState = {
    rows: [],
    currentPage: 0,
    pageSize: 10,
    totalCount: 0,
    sorting: []
};

export default (state = {}, action) => {
    const currentProfileState = state[ action.profile ] || dataTableInitialState;
    switch (action.type) {
        case dataTableConstants.LOAD_BEGIN: {
            return {
                ...state,
                [ action.profile ]: {
                    ...currentProfileState,
                    loading: true,
                    error: null
                }
            }
        }
        case dataTableConstants.LOAD_END: {
            return {
                ...state,
                [ action.profile ]: {
                    ...currentProfileState,
                    loading: false
                }
            }
        }
        case dataTableConstants.LOAD_DATA_SUCCESS: {
            return {
                ...state,
                [ action.profile ]: {
                    ...currentProfileState,
                    rows: action.rows,
                    currentPage: action.currentPage,
                    pageSize: action.pageSize,
                    totalCount: action.totalCount
                }
            }
        }
        case dataTableConstants.LOAD_DATA_ERROR: {
            return {
                ...state,
                [ action.profile ]: {
                    ...currentProfileState,
                    loading: false,
                    error: action.error
                }
            }
        }
        case dataTableConstants.CHANGE_PAGE: {
            return {
                ...state,
                [ action.profile ]: {
                    ...currentProfileState,
                    currentPage: action.currentPage
                }
            }
        }
        case dataTableConstants.CHANGE_PAGE_SIZE: {
            return {
                ...state,
                [ action.profile ]: {
                    ...currentProfileState,
                    pageSize: action.pageSize
                }
            }
        }
        case dataTableConstants.CHANGE_PAGE_SORTING: {
            return {
                ...state,
                [ action.profile ]: {
                    ...currentProfileState,
                    sorting: action.sorting
                }
            }
        }
    }
    return state
}
