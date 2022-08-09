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
            <th className="scoreboard-player-header" key={number}>
                Player {number}
            </th>
        );

    // Gets the remaining rows for the table
    const remainingRows = scoreboard
        .map((scoreboardRow, index) => {
            // Check if this is the only row or it is not the last row
            if (scoreboard.length === 1 || index < scoreboard.length - 1 || scoreboardRow[0] !== null) {
                return <tr className="scoreboard-score-row" key={index}>
                    {
                        scoreboardRow
                            .map((column, index2) =>
                                <th key={index2}>
                                    {column === null ? "--" : column}
                                </th>
                            )
                    }
                </tr>
            }
        });

    return (
        <div className="game-scoreboard-container">
            {gameState === "start" ?
                <div className="game-scoreboard-placeholder flex-center-column">
                    No game being played!
                </div> :

                <div className="game-scoreboard">
                    <table className="scoreboard-table">
                        <tr>
                            {playerHeaders}
                        </tr>

                        {remainingRows}
                    </table>
                </div>
            }
        </div>
    );
}