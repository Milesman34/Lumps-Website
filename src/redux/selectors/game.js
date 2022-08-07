import { calculateScore } from "../../utils";

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

// Returns the number of dice that are unlocked
const selectNumUnlockedDice = state => state.game.dice.filter(die => !die.isLocked).length;

// Returns the number of dice the player must keep this turn
const selectNumDiceMustKeep = state => {
    const numUnlocked = selectNumUnlockedDice(state);
    const rollsLeft = selectRollsLeft(state);

    switch (rollsLeft) {
        case 0:
            return numUnlocked;
            
        case 1:
            return numUnlocked >= 2 ? 2 : numUnlocked;

        case 2:
            return 4;
    }
}

export {
    selectBeingPlayed,
    selectCurrentIndex,
    selectCurrentScore,
    selectDice,
    selectNumDiceMustKeep,
    selectNumUnlockedDice,
    selectRollsLeft,
    selectScores
}