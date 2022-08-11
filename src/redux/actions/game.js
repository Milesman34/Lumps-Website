// Sets the number of players
export const setNumPlayers = players => ({
    type: "SET_NUM_PLAYERS",
    payload: players
});

// Sets the index of the current player
export const setCurrentIndex = index => ({
    type: "SET_CURRENT_INDEX",
    payload: index
});

// Increments the current index, cycling to the end if needed
export const incrementCurrentIndex = () => ({
    type: "INCREMENT_CURRENT_INDEX"
});

// Resets the current scores
export const resetScores = () => ({
    type: "RESET_SCORES"
});

// Adds to the score of the current player
export const addScore = score => ({
    type: "ADD_SCORE",
    payload: score
});

// Sets the game state
export const setGameState = value => ({
    type: "SET_GAME_STATE",
    payload: value
});

// Toggles if a given die will be locked
export const toggleDieWillBeLocked = index => ({
    type: "TOGGLE_DIE_WILL_BE_LOCKED",
    payload: index
});

// Rolls any unlocked dice
export const rollDice = () => ({
    type: "ROLL_DICE"
});

// Sets the number of remaining rolls
export const setRollsLeft = rolls => ({
    type: "SET_ROLLS_LEFT",
    payload: rolls
});

// Resets the dice
export const resetDice = () => ({
    type: "RESET_DICE"
});

// Updates the configs
export const updateConfigs = configs => ({
    type: "UPDATE_CONFIGS",
    payload: configs
});

// Sets the number of clean slate uses
export const setCleanSlateUses = value => ({
    type: "SET_CLEAN_SLATE_USES",
    payload: value
});

// Increments the number of clean slate uses
export const incrementCleanSlateUses = () => ({
    type: "INCREMENT_CLEAN_SLATE_USES"
});

// Runs clean slate
export const cleanSlate = () => ({
    type: "CLEAN_SLATE"
});

// Resets the game (this is not an action, but can be called by passing dispatch)
export const resetGame = dispatch => {
    dispatch(resetScores());
    dispatch(setCurrentIndex(0));
    dispatch(setGameState("game"));
    dispatch(resetDice());
    dispatch(setCleanSlateUses(0));
    dispatch(setRollsLeft(2));
}

// Ends the current turn
export const endTurn = (dispatch, score) => {
    dispatch(addScore(score));
    dispatch(setRollsLeft(2));
    dispatch(resetDice());
    dispatch(setCleanSlateUses(0));
    dispatch(incrementCurrentIndex());
}