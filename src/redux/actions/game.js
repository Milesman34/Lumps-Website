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

// Sets if the game is being played
export const setIsBeingPlayed = value => ({
    type: "SET_IS_BEING_PLAYED",
    payload: value
});