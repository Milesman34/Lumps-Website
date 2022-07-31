import UIAttributesReducer from "./UIAttributesReducer"

import { combineReducers } from "redux"

// Root reducer for the app
export const RootReducer = combineReducers({
    uiAttributes: UIAttributesReducer
});