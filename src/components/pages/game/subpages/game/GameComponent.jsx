import { useSelector } from "react-redux"
import { selectCurrentIndex, selectCurrentScore, selectDice, selectNumDiceMustKeep, selectRollsLeft } from "../../../../../redux/selectors/game"
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

    // Number of dice you must keep
    const numDiceMustKeep = useSelector(selectNumDiceMustKeep);

    // Current list of dice
    const dice = useSelector(selectDice);

    // Returns the text used to display the number of rolls left
    const rollsLeftText = () => rollsLeft === 2 ? "2 Rolls Left" : rollsLeft === 1 ? "1 Roll Left" : "No Rolls Left";

    // Returns the text used to display the number of dice you must keep
    const diceKeepText = () => numDiceMustKeep === 1 ? "You must keep 1 die" : rollsLeft > 0 ? `You must keep ${numDiceMustKeep} dice` : ""; 

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

            <div className="game-display-text game-dice-keep-display">
                {diceKeepText()}
            </div>

            <div className="game-dice-container">
                {dieComponents}
            </div>
        </div>
    );
}