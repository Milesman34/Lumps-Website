import { current } from "@reduxjs/toolkit";

// Capitalizes a string
const capitalize = string => string[0].toUpperCase() + string.slice(1).toLowerCase()

// Returns a pluralized statement based on a number and the string
const pluralized = (number, string) => `${number} ${Math.abs(number) === 1 ? string : string + "s"}`;

// Returns if a number is even
const isEven = num => num % 2 === 0;

// Randint between a and b
const randint = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// Calculates the current score based on a set of dice
const calculateScore = dice => {
    // Sorts the dice first
    const sorted = [...dice].map(die => die.value).sort((a, b) => (a - b));

    // Running score
    let score = 0;

    // Are all dice the same in terms of evenness/oddness
    let areAllEvenOrOdd = true;

    // Tracks previous die
    let previous = sorted[0];

    // Is the current die even?
    let isDieEven = isEven(previous)

    // Length of the current run
    let runLength = 1;

    // Length of the current group of the same number
    let groupLength = 1;

    // Now we iterate over the rest of the die
    sorted.slice(1).forEach(die => {
        // Check if the current die matches the previous die in evenness/oddness
        if (isEven(die) !== isDieEven)
            areAllEvenOrOdd = false;

        // Look for pairs/groups of numbers
        if (previous === die) {
            score += die;
            groupLength++;

            // 10 point bonus for groups of 6-8
            if (groupLength >= 6)
                score += 10;
        } else {
            // Reset running group length
            groupLength = 1;

            // Checks for runs
            if (die === previous + 1) {
                runLength++;

                // 10 point bonus for runs of 6-8
                if (runLength >= 6)
                    score += 10;
            } else {
                // Resets run length
                runLength = 1;
            }
        }

        // Sets the previous die
        previous = die;
    });

    // 6 point bonus for all dice even/odd
    if (areAllEvenOrOdd)
        score += 6

    return score;
}

// Rolls a die to generate a random value based on its sides
const rollDie = die => ({
    ...die,
    value: randint(1, die.sides)
});

export {
    calculateScore,
    capitalize,
    isEven,
    pluralized,
    randint,
    rollDie
}