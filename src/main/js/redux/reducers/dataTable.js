import { dataTableConstants } from "../constants";

export default (state = {}, action) => {
    switch (action.type) {
        case dataTableConstants.LOAD_DATA_BEGIN: {
            return { ...state, [ action.apiType ]: { loading: true, error: null, rows: [] } }
        }
        case dataTableConstants.LOAD_DATA_SUCCESS: {
            return { ...state, [ action.apiType ]: { loading: false, error: null, rows: action.rows } }
        }
        case dataTableConstants.LOAD_DATA_ERROR: {
            return { ...state, [ action.apiType ]: { loading: false, error: action.error, rows: [] } }
        }
    }
    return state
}
