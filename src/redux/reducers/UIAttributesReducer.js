const initialState = {
    headerHeight: 50
}

// Reducer for passing attributes of UI elements around
export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_HEADER_HEIGHT":
            return {
                ...state,
                headerHeight: action.payload
            };

        default:
            return state;
    }
}