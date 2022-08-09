import { useSelector } from "react-redux";
import { selectGameState } from "../../../../../redux/selectors/game";
import "./GameScoreboard.css"
import "../../../../../common.css"

export default () => {
    const gameState = useSelector(selectGameState);

    return (
        <div className="game-scoreboard-container">
            {gameState === "start" ?
                <div className="game-scoreboard-placeholder flex-center-column">
                    No game being played!
                </div> :

                <div className="game-scoreboard">
                    Scoreboard
                </div>
            }
        </div>
    );
}