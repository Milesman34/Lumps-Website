import { useSelector } from "react-redux";
import { selectCurrentIndex, selectCurrentScore } from "../../../../../redux/selectors/game";
import "./GameComponent.css"

import GameScoreHeader from "./score-header/GameScoreHeader"

export default () => {
    // Current score
    const currentScore = useSelector(selectCurrentScore);

    // Index of current player
    const currentIndex = useSelector(selectCurrentIndex);

    return (
        <div className="game-component">
            <GameScoreHeader />

            <div className="game-turn-display">
                Player {currentIndex + 1}'s Turn
            </div>

            <div className="game-score-display">
                Score:  {currentScore}
            </div>
        </div>
    );
}