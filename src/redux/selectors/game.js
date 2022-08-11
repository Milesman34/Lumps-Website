import { calculateScore, canRollDice, getWinningPlayer, isTurnOver, numMoreDiceToKeep } from "../../utils";

// Selects the scores of the game
const selectScores = state => state.game.scores;

// Selects the current score the player has
const selectCurrentScore = state => calculateScore(state.game.dice);

// Selects the current game state
const selectGameState = state => state.game.gameState;

// Selects if the game is being played
const selectBeingPlayed = state => state.game.gameState === "game";

// Selects the index of the current player
const selectCurrentIndex = state => state.game.currentIndex;

// Selects the dice
const selectDice = state => state.game.dice;

// Selects the number of rolls left
const selectRollsLeft = state => state.game.rollsLeft;

// Selects how many more dice the player must keep
const selectNumMoreDiceToKeep = state => numMoreDiceToKeep(state.game.dice, state.game.rollsLeft, state.game.cleanSlateUses);

// Can the player roll the dice?
const selectCanRollDice = state => canRollDice(state.game.dice, state.game.rollsLeft, state.game.cleanSlateUses);

// Is the player's turn over?
const selectIsTurnOver = state => isTurnOver(state.game.dice, state.game.rollsLeft);

// Selects the winning player
const selectWinningPlayer = state => getWinningPlayer(state.game.scores);

// Selects the number of players
const selectNumPlayers = state => state.game.numPlayers;

// Selects the scoreboard
const selectScoreboard = state => state.game.scoreboard;

// Selects the game's configs
const selectConfigs = state => state.game.configs;

// Selects if clean slate can be used (it must be enabled and the player has used it fewer times and their turn isn't over)
const selectCanUseCleanSlate = state =>
    state.game.configs.cleanSlate.enabled &&
    !isTurnOver(state.game.dice, state.game.rollsLeft) &&
    state.game.cleanSlateUses < state.game.configs.cleanSlate.perTurn;

export {
    selectBeingPlayed,
    selectCanRollDice,
    selectCanUseCleanSlate,
    selectConfigs,
    selectCurrentIndex,
    selectCurrentScore,
    selectDice,
    selectGameState,
    selectIsTurnOver,
    selectNumMoreDiceToKeep,
    selectNumPlayers,
    selectRollsLeft,
    selectScoreboard,
    selectScores,
    selectWinningPlayer
}