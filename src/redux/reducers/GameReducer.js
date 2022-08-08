import Die from "../../components/common/objects/Die"
import { randint, willTurnBeOver } from "../../utils"

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

    // What state is the game in? (start, game, end)
    gameState: "start"
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
            // Array of new scores
            const newScores = state.scores.map((score, index) => index === state.currentIndex ? score + action.payload : score);

            // Gets the score of the current player
            const currentScore = newScores[state.currentIndex];

            // Checks if the player won
            const didWin = currentScore >= 100;

            return {
                ...state,
                scores: newScores,
                gameState: didWin ? "end" : "game"
            }

        // Sets if the game is being played
        case "SET_GAME_STATE":
            return {
                ...state,
                gameState: action.payload
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
            const isTurnOver = willTurnBeOver(state.dice);
        
            return {
                ...state,
                rollsLeft,
                dice: state.dice.map(die => {
                    if (die.isLocked) { // Nothing changes
                        return die;
                    } else if (die.willBeLocked) { // Die becomes locked if it was marked as such or if the turn is over
                        return {
                            ...die,
                            isLocked: true,
                            willBeLocked: false
                        }
                    } else { // Reroll die
                        let newValue = randint(1, die.sides);

                        // The die will be locked if the turn will be over
                        return {
                            ...die,
                            isLocked: isTurnOver,
                            willBeLocked: false,
                            value: newValue
                        }
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