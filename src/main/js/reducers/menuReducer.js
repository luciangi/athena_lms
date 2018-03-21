export default (state = { open: false }, action) => {
    switch (action.type) {
        case "TOGGLE_MENU": {
            return { ...state, open: !state.open }
        }
        case "CLOSE_MENU": {
            return { ...state, open: false }
        }
    }
    return state
}