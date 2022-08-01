import { calculateScore } from "../../utils";

// Selects the scores of the game
const selectScores = state => state.game.scores;

// Selects the current score the player has
const selectCurrentScore = state => calculateScore(state.game.dice);

// Selects which route the game component should use
const selectGameComponentRoute = state => state.game.isBeingPlayed ? "game" : "start";

export {
    selectCurrentScore,
    selectGameComponentRoute,
    selectScores
}