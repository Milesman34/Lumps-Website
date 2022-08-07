import { useSelector } from "react-redux"
import { selectCurrentIndex, selectCurrentScore, selectDice, selectIsTurnOver, selectRollsLeft } from "../../../../../redux/selectors/game"
import "./GameComponent.css"

import DieComponent from "./die/DieComponent"
import GameScoreHeader from "./score-header/GameScoreHeader"
import GameRollButton from "./roll-button/GameRollButton"
import EndTurnButton from "./end-turn-button/EndTurnButton"

export default () => {
    // Current score
    const currentScore = useSelector(selectCurrentScore);

    // Index of current player
    const currentIndex = useSelector(selectCurrentIndex);

    // Number of rolls left in this turn
    const rollsLeft = useSelector(selectRollsLeft);

    // Is the player's turn over
    const isTurnOver = useSelector(selectIsTurnOver);

    // Current list of dice
    const dice = useSelector(selectDice);

    // Returns the text used to display the number of rolls left
    const rollsLeftText = () => {
        if (isTurnOver) {
            return "No Rolls Left";
        } else if (rollsLeft === 2) {
            return "2 Rolls Left";
        } else {
            return "1 Roll Left";
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

            {isTurnOver || <GameRollButton />}

            <EndTurnButton />
        </div>
    );
}