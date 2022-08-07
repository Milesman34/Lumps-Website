import { useSelector } from "react-redux"
import { selectCanRollDice, selectCurrentIndex, selectCurrentScore, selectDice, selectNumMoreDiceToKeep, selectRollsLeft } from "../../../../../redux/selectors/game"
import "./GameComponent.css"

import DieComponent from "./die/DieComponent"
import GameScoreHeader from "./score-header/GameScoreHeader"

export default () => {
    // Current score
    const currentScore = useSelector(selectCurrentScore);

    // Index of current player
    const currentIndex = useSelector(selectCurrentIndex);

    // Number of rolls left in this turn
    const rollsLeft = useSelector(selectRollsLeft);

    // Can the player roll the dice
    const canRoll = useSelector(selectCanRollDice);

    // How many more dice must the player keep
    const howManyMore = useSelector(selectNumMoreDiceToKeep)

    // Current list of dice
    const dice = useSelector(selectDice);

    // Returns the text used to display the number of rolls left
    const rollsLeftText = () => rollsLeft === 2 ? "2 Rolls Left" : rollsLeft === 1 ? "1 Roll Left" : "No Rolls Left";

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

    // List of die components to render
    const dieComponents = dice.map((die, index) => <DieComponent key={index} index={index} die={die} />);

    return (
        <div className="game-component">
            <GameScoreHeader />

            <div className="game-display-text game-turn-display">
                Player {currentIndex + 1}'s Turn
            </div>

            <div className="game-display-text game-score-display">
                Score: {currentScore}
            </div>

            <div className="game-display-text game-rolls-left-display">
                {rollsLeftText()}
            </div>

            <div className="game-dice-container">
                {dieComponents}
            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <div className="roll-dice-button">
                    {rollDiceText()}
                </div>
            </div>
        </div>
    );
}