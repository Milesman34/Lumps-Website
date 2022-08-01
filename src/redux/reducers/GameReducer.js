import Die from "../../components/common/objects/Die"

// Initial state
const initialState = {
    // Number of players
    numPlayers: 2,

    // Index of the current player
    currentIndex: 0,

    // Number of scores
    scores: [0, 0],

    // How many rolls does the player have left for their turn
    rollsLeft: 3,

    // The current dice the player has
    dice: [4, 4, 6, 6, 8, 8, 10, 10].map(sides => Die(sides)),

    // Is the game currently being played?
    isBeingPlayed: false
}

// Reducer for key state elements of the game
export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_NUM_PLAYERS":
            return {
                ...state,
                numPlayers: action.payload
            }

        case "SET_CURRENT_INDEX":
            return {
                ...state,
                currentIndex: action.payload
            }

        case "INCREMENT_CURRENT_INDEX":
            return {
                ...state,
                currentIndex: (state.currentIndex + 1) % state.numPlayers
            }

        case "RESET_SCORES":
            return {
                ...state,
                scores: Array(state.numPlayers).fill(0)
            }

        case "ADD_SCORE":
            return {
                ...state,
                scores: state.scores.map((score, index) => index === state.currentIndex ? score + action.payload : score)
            }

        case "SET_IS_BEING_PLAYED":
            return {
                ...state,
                isBeingPlayed: action.payload
            }

        default:
            return state;
    }
}