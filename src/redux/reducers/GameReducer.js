import Die from "../../components/common/objects/Die"
import { isTurnOver, rollDie, willTurnBeOver } from "../../utils"

// Array of the number of sides of dice
const diceSides = [4, 4, 6, 6, 8, 8, 10, 10];

// Initial state
const initialState = {
    // Number of players
    numPlayers: 2,

    // Index of the current player
    currentIndex: 0,

    // Number of scores
    scores: [0, 0],

    // How many rolls does the player have left for their turn
    rollsLeft: 2,

    // The current dice the player has
    dice: diceSides.map(sides => Die(sides)),

    // Is the game currently being played?
    isBeingPlayed: false
}

// Reducer for key state elements of the game
export default (state = initialState, action) => {
    switch (action.type) {
        // Sets the number of players
        case "SET_NUM_PLAYERS":
            return {
                ...state,
                numPlayers: action.payload,
                // Scores are also reset when changing the number of players
                scores: Array(action.payload).fill(0)
            }

        // Sets the current player index
        case "SET_CURRENT_INDEX":
            return {
                ...state,
                currentIndex: action.payload
            }

        // Increments the current player index
        case "INCREMENT_CURRENT_INDEX":
            return {
                ...state,
                currentIndex: (state.currentIndex + 1) % state.numPlayers
            }

        // Resets the scores
        case "RESET_SCORES":
            return {
                ...state,
                scores: Array(state.numPlayers).fill(0)
            }

        // Adds to the current score
        case "ADD_SCORE":
            return {
                ...state,
                scores: state.scores.map((score, index) => index === state.currentIndex ? score + action.payload : score)
            }

        // Sets if the game is being played
        case "SET_IS_BEING_PLAYED":
            return {
                ...state,
                isBeingPlayed: action.payload
            }

        // Toggles if a die will be locked
        case "TOGGLE_DIE_WILL_BE_LOCKED":
            return {
                ...state,
                dice: state.dice.map((die, index) => index === action.payload ? {
                    ...die,
                    willBeLocked: !die.willBeLocked
                } : die)
            }

        // Rolls all unlocked dice
        case "ROLL_DICE":
            // How many rolls are left
            const rollsLeft = state.rollsLeft - 1;

            // Will the turn be over?
            const turnOver = willTurnBeOver(state.dice);
        
            return {
                ...state,
                rollsLeft,
                dice: state.dice.map(die => {
                    if (die.isLocked) { // Nothing changes
                        return die;
                    } else if (die.willBeLocked || turnOver) { // Die becomes locked if it was marked as such or if the turn is over
                        return {
                            ...die,
                            isLocked: true,
                            willBeLocked: false
                        }
                    } else { // Reroll die
                        return rollDie(die);
                    }
                })
            }

        // Sets the number of remaining rolls left
        case "SET_ROLLS_LEFT":
            return {
                ...state,
                rollsLeft: action.payload
            }

        // Resets the current dice
        case "RESET_DICE":
            return {
                ...state,
                dice: diceSides.map(sides => Die(sides))
            }

        default:
            return state;
    }
}