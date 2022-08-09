import { useSelector } from "react-redux";
import { selectGameState, selectNumPlayers, selectScoreboard } from "../../../../../redux/selectors/game";
import "./GameScoreboard.css"
import "../../../../../common.css"

export default () => {
    // Gets the current game state
    const gameState = useSelector(selectGameState);

    // Gets the number of players
    const numPlayers = useSelector(selectNumPlayers);

    // Gets the scoreboard
    const scoreboard = useSelector(selectScoreboard);

    // Headers for the table that display the players
    const playerHeaders = Array(numPlayers)
        .fill(0)
        .map((_, index) => index + 1)
        .map(number =>
            <div className="scoreboard-player-header-item flex-center-column" key={number}>
                Player {number}
            </div>
        );

    // Gets the remaining rows for the table
    const remainingRows = scoreboard
        .map((scoreboardRow, index) => {
            // Check if this is the only row or it is not the last row
            if (scoreboard.length === 1 || index < scoreboard.length - 1 || scoreboardRow[0] !== null) {
                return <div key={index} className="scoreboard-score-row" style={{ gridTemplateColumns: `repeat(${numPlayers}, auto)` }}>
                    {
                        scoreboardRow
                            .map((column, index2) =>
                                <div className="flex-center-column" style={{ borderRight: "2px solid black" }}>
                                    <div key={index2} className="scoreboard-score-item flex-center-column">
                                        {column === null ? "--" : column}
                                    </div>
                                </div>
                            )
                    }
                </div>
            }
        });

    return (
        <div>
            {gameState === "start" ?
                <div className="game-scoreboard-placeholder flex-center-column">
                    No game being played!
                </div> :

                <div className="game-scoreboard">
                    <div className="scoreboard-table">
                        <div className="scoreboard-player-header" style={{ gridTemplateColumns: `repeat(${numPlayers}, auto)` }}>
                            {playerHeaders}
                        </div>

                        {remainingRows}
                    </div>
                </div>
            }
        </div>
    );
}