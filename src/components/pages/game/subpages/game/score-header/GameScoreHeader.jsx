import { useSelector } from "react-redux";
import { selectScores } from "../../../../../../redux/selectors/game";
import "./GameScoreHeader.css"

import GameScoreHeaderItem from "./score-header-item/GameScoreHeaderItem";

// This component displays the scores of the game
export default () => {
    const scores = useSelector(selectScores);

    // Gets the minimum and maximum scores
    const minimum = Math.min.apply(null, scores);
    const maximum = Math.max.apply(null, scores);

    // Score elements to display
    const scoreElements = scores.map((score, index) => <GameScoreHeaderItem key={index} score={score} id={index + 1} minimum={minimum} maximum={maximum} />);

    return (
        <div className="game-score-header" style={{ gridTemplateColumns: `repeat(${scores.length}, auto)` }}>
            {scoreElements}
        </div>
    );
}