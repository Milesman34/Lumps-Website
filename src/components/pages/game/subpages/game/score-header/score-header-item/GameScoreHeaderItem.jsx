import { pluralized } from "../../../../../../../utils";
import "./GameScoreHeaderItem.css"

import "../../../../../../../common.css"

// Header item for the game score header
export default ({ score, name, minimum, maximum }) => {
    // Extra classes to use
    const extraClass = minimum === 0 ?
        "" : (score === maximum ?
            "maximum-item" : score === minimum ?
                "minimum-item" : "");

    return (
        <div className="game-score-header-item flex-center-column">
            <div className="game-score-header-id-text flex-center-column">{name}</div>
            <div className={"game-score-header-score-text flex-center-column" + extraClass}>{pluralized(score, "point")}</div>
        </div>
    );
}