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

// Returns the number of dice that will be locked
const selectNumDiceWillBeLocked = state => state.game.dice.filter(die => die.willBeLocked).length;

// Selects how many more dice the player must keep
const selectNumMoreDiceToKeep = state => {
    const mustKeep = selectNumDiceMustKeep(state);
    const willBeLocked = selectNumDiceWillBeLocked(state);

    return mustKeep - willBeLocked;
}

// Can the player roll the dice?
const selectCanRollDice = state => {
    const mustKeep = selectNumDiceMustKeep(state);
    const willBeLocked = selectNumDiceWillBeLocked(state);

    return willBeLocked >= mustKeep;
}

// Is the player's turn over?
const selectIsTurnOver = state => {
    const numUnlocked = selectNumUnlockedDice(state);
    const rollsLeft = selectRollsLeft(state);

    // If there are only 2 dice left, then there aren't any decisions for the player to make
    return numUnlocked <= 2 || rollsLeft === 0;
}

export {
    selectBeingPlayed,
    selectCanRollDice,
    selectCurrentIndex,
    selectCurrentScore,
    selectDice,
    selectIsTurnOver,
    selectNumDiceMustKeep,
    selectNumMoreDiceToKeep,
    selectNumUnlockedDice,
    selectNumDiceWillBeLocked,
    selectRollsLeft,
    selectScores
}