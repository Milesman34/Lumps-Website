import { combineReducers } from "redux"

import GameReducer from "./GameReducer";

// Root reducer for the app (don't have any reducers yet)
export const RootReducer = combineReducers({
    game: GameReducer
});