import { calculateScore, canRollDice, isTurnOver, numMoreDiceToKeep } from "../../utils";

// Selects the scores of the game
const selectScores = state => state.game.scores;

// Selects the current score the player has
const selectCurrentScore = state => calculateScore(state.game.dice);

// Returns if the game is being played
const selectBeingPlayed = state => state.game.isBeingPlayed;

// Selects the index of the current player
const selectCurrentIndex = state => state.game.currentIndex;

// Selects the dice
const selectDice = state => state.game.dice;

// Selects the number of rolls left
const selectRollsLeft = state => state.game.rollsLeft;

// Selects how many more dice the player must keep
const selectNumMoreDiceToKeep = state => numMoreDiceToKeep(state.game.dice, state.game.rollsLeft);

// Can the player roll the dice?
const selectCanRollDice = state => canRollDice(state.game.dice, state.game.rollsLeft);

// Is the player's turn over?
const selectIsTurnOver = state => isTurnOver(state.game.dice, state.game.rollsLeft);

export {
    selectBeingPlayed,
    selectCanRollDice,
    selectCurrentIndex,
    selectCurrentScore,
    selectDice,
    selectIsTurnOver,
    selectNumMoreDiceToKeep,
    selectRollsLeft,
    selectScores
}