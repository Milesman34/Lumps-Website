import Die from "../../components/common/objects/Die"
import { localStorageGetOrDefault, randint, willTurnBeOver } from "../../utils"
import { defaultConfigs } from "../../defaults"

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

    // How many times has the player used clean slate in the current turn
    cleanSlateUses: 0,

    // Has each player used desperation?
    desperationUsed: [false, false],

    // Did the player activate desperation this turn
    desperationActivated: false,

    // Has extra chance been activated? (someone reached 100)
    extraChanceActivated: false,

    // The names of the players
    playerNames: [1, 2, 3, 4, 5, 6, 7, 8].map(number => `Player ${number}`),

    // The game's configs
    configs: {
        cleanSlate: {
            enabled: localStorageGetOrDefault("cleanSlateEnabled", defaultConfigs.cleanSlate.enabled),
            perTurn: localStorageGetOrDefault("cleanSlatePerTurn", defaultConfigs.cleanSlate.perTurn).toString()
        },

        desperation: {
            enabled: localStorageGetOrDefault("desperationEnabled", defaultConfigs.desperation.enabled),
            repeatable: localStorageGetOrDefault("desperationRepeatable", defaultConfigs.desperation.repeatable)
        },

        extraChance: localStorageGetOrDefault("extraChance", defaultConfigs.extraChance)
    }
}

// Returns an object containing parts of the state copied whenever the game is reset/number of players are changed
const playersChangedState = players => ({
    scores: Array(players).fill(0),
    scoreboard: [Array(players).fill(null)],
    desperationUsed: Array(players).fill(false)
})

// Reducer for key state elements of the game
export default (state = initialState, action) => {
    switch (action.type) {
        // Sets the number of players
        case "SET_NUM_PLAYERS":
            return {
                ...state,
                numPlayers: action.payload,

                // Scores are also reset when changing the number of players
                ...playersChangedState(action.payload)
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
                ...playersChangedState(state.numPlayers)
            }

        // Adds to the current score
        case "ADD_SCORE":
            // Array of new scores
            const newScores = state.scores.map((score, index) =>
                index === state.currentIndex ? score + action.payload : score
            );

            // Gets the score of the current player
            const currentScore = newScores[state.currentIndex];

            // Checks if the game ends after this turn (if extraChance is on, it only ends if the current player is the last player)
            let didGameEnd = false;

            if (state.configs.extraChance) {
                // This only happens when its the last player's turn
                if (state.currentIndex === state.numPlayers - 1) {
                    // Checks for ties by comparing each score to the winner's score
                    const winnerScore = Math.max.apply(null, newScores);

                    didGameEnd = (currentScore >= 100 || state.extraChanceActivated) &&
                        newScores
                            .filter(score => score === winnerScore)
                            .length === 1;
                }
            } else if (currentScore >= 100) {
                didGameEnd = true;
            }

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
                gameState: didGameEnd ? "end" : "game",
                extraChanceActivated: state.extraChanceActivated || currentScore >= 100,

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

        // Updates the configs
        case "UPDATE_CONFIGS":
            return {
                ...state,
                configs: Object.assign({}, state.configs, action.payload)
            }

        // Sets the number of clean slate uses
        case "SET_CLEAN_SLATE_USES":
            return {
                ...state,
                cleanSlateUses: action.payload
            }

        // Runs clean slate
        case "CLEAN_SLATE":
            const newRollsLeft = state.rollsLeft - 1;

            return {
                ...state,
                cleanSlateUses: state.cleanSlateUses + 1,

                // When this happens it uses a roll
                rollsLeft: newRollsLeft,

                // Resets the dice
                dice: diceSides.map(sides => Die(sides, newRollsLeft === 0))
            }

        // Runs desperation
        case "DESPERATION":
            return {
                ...state,

                // Player cannot roll again this turn
                rollsLeft: 0,

                // The current player used desperation
                desperationUsed: state.desperationUsed.map((used, index) => index === state.currentIndex ? true : used),
                desperationActivated: true,

                // Resets the dice
                dice: diceSides.map(sides => Die(sides, true))
            }

        // Sets if desperation was activated this turn
        case "SET_DESPERATION_ACTIVATED":
            return {
                ...state,

                desperationActivated: action.payload
            }

        // Sets if extra chance is activated
        case "SET_EXTRA_CHANCE_ACTIVATED":
            return {
                ...state,

                extraChanceActivated: action.payload
            }

        default:
            return state;
    }
}