import { randint } from "../../../utils";

// This object represents a die in the game
export default (sides, locked=false) => ({
    // Value of the die
    value: randint(1, sides),

    // Number of sides on the die
    sides,

    // Is the die currently locked?
    isLocked: locked,

    // Will the current die be locked when the next roll happens?
    willBeLocked: false
});