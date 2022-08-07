import { useSelector } from "react-redux"
import { selectCurrentIndex, selectCurrentScore, selectDice, selectRollsLeft } from "../../../../../redux/selectors/game"
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

    // Returns the text used to display the number of rolls left
    const rollsLeftText = rolls => rolls === 2 ? "2 Rolls Left" : rolls === 1 ? "1 Roll Left" : "No Rolls Left";

    // Current list of dice
    const dice = useSelector(selectDice);

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
                {rollsLeftText(rollsLeft)}
            </div>

            <div className="game-dice-container">
                {dieComponents}
            </div>
        </div>
    );
}