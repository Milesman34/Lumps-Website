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
    gameState: "start",

    // The current scoreboard
    scoreboard: [[null, null]],

    // The game's configs
    configs: {
        // Clean slate (re-roll all dice after a roll, keep 6/8 depending on which roll)
        cleanSlate: {
            // Is clean slate enabled?
            enabled: false,

            // How many clean slates can you do per turn?
            perTurn: 1
        },

        // Desperation (re-roll all dice after end of turn)
        desperation: {
            // Is desperation enabled?
            enabled: false,

            // Can you do desperation more than once per game?
            repeatable: false
        },

        // Should each player get another chance to roll after someone reaches 100? (features tiebreaker)
        extraChance: false
    }
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
                scores: Array(action.payload).fill(0),
                scoreboard: [Array(action.payload).fill(null)]
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
                scores: Array(state.numPlayers).fill(0),
                scoreboard: [Array(state.numPlayers).fill(null)]
            }

        // Adds to the current score
        case "ADD_SCORE":
            // Array of new scores
            const newScores = state.scores.map((score, index) =>
                index === state.currentIndex ? score + action.payload : score
            );

            // Gets the score of the current player
            const currentScore = newScores[state.currentIndex];

            // Checks if the player won
            const didWin = currentScore >= 100;

            // Number of turns the players have taken
            const numTurns = state.scoreboard.length;

            // Creates the new scoreboard
            // We keep all but the last value as the same, then update the rest
            const newScoreboard = state.scoreboard
                .slice(0, numTurns - 1)
                .concat([
                    state.scoreboard[numTurns - 1]
                        // Replaces the score with the correct index with its new score
                        .map((score, index) =>
                            index === state.currentIndex ? currentScore : score
                        )
                ]);

            return {
                ...state,
                scores: newScores,
                gameState: didWin ? "end" : "game",
                // We need to check if the current player is the last one, and if it does then we add another blank row
                scoreboard: state.currentIndex === state.numPlayers - 1 ?
                    newScoreboard
                        .concat([Array(state.numPlayers).fill(null)]) :

                    newScoreboard
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