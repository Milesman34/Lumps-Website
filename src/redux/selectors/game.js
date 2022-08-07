import { calculateScore } from "../../utils";

// Selects the scores of the game
const selectScores = state => state.game.scores;

// Selects the current score the player has
const selectCurrentScore = state => calculateScore(state.game.dice);

// Returns if the game is being played
const selectBeingPlayed = state => state.game.isBeingPlayed;

// Selects the index of the current player
const selectCurrentIndex = state => state.game.currentIndex;

export {
    selectBeingPlayed,
    selectCurrentIndex,
    selectCurrentScore,
    selectScores
}