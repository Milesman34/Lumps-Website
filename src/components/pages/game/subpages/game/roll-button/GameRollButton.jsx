import "./GameRollButton.css"

import { selectCanRollDice, selectNumMoreDiceToKeep } from "../../../../../../redux/selectors/game";
import { useSelector } from "react-redux";

// Component for the button that rolls the dice
export default () => {
    // Can the player roll the dice
    const canRoll = useSelector(selectCanRollDice);

    // How many more dice must the player keep
    const howManyMore = useSelector(selectNumMoreDiceToKeep);

    // Text for the roll dice button
    const rollDiceText = () => {
        if (canRoll) {
            return "Roll Dice";
        } else if (howManyMore === 1) {
            return "You must keep 1 more die"
        } else {
            return `You must keep ${howManyMore} more dice`
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <div className={`roll-dice-button ${canRoll ? "roll-dice-can-roll" : "roll-dice-cannot-roll"}`}>
                {rollDiceText()}
            </div>
        </div>
    );
}