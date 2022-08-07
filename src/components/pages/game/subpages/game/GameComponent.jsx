import { useSelector } from "react-redux"
import { selectCurrentIndex, selectCurrentScore, selectDice } from "../../../../../redux/selectors/game"
import "./GameComponent.css"

import DieComponent from "./die/DieComponent"
import GameScoreHeader from "./score-header/GameScoreHeader"

export default () => {
    // Current score
    const currentScore = useSelector(selectCurrentScore);

    // Index of current player
    const currentIndex = useSelector(selectCurrentIndex);

    // Current list of dice
    const dice = useSelector(selectDice);

    // List of die components to render
    const dieComponents = dice.map((die, index) => <DieComponent key={index} die={die} />);

    return (
        <div className="game-component">
            <GameScoreHeader />

            <div className="game-turn-display">
                Player {currentIndex + 1}'s Turn
            </div>

            <div className="game-score-display">
                Score:  {currentScore}
            </div>

            <div className="game-dice-container">
                {dieComponents}
            </div>
        </div>
    );
}