import { pluralized } from "../../../../../../../utils";
import "./GameScoreHeaderItem.css"

// Header item for the game score header
export default ({ score, id }) => {
    return (
        <div className="game-score-header-item flex-center-column">
            <div className="game-score-header-id-text">Player {id}</div>
            <div className="game-score-header-score-text">{pluralized(score, "point")}</div>
        </div>
    );
}