import { useSelector } from "react-redux";
import { selectGameState, selectNumPlayers, selectPlayerNames, selectScoreboard } from "../../../../../redux/selectors/game";
import "./GameScoreboard.css"
import "../../../../../common.css"

export default () => {
    // Gets the current game state
    const gameState = useSelector(selectGameState);

    // Gets the number of players
    const numPlayers = useSelector(selectNumPlayers);

    // Gets the scoreboard
    const scoreboard = useSelector(selectScoreboard);

    // Gets the player names
    const playerNames = useSelector(selectPlayerNames);

    // Headers for the table that display the players
    const playerHeaders = Array(numPlayers)
        .fill(0)
        .map((_, index) =>
            <div className="scoreboard-player-header-item flex-center-column" key={index}>
                {playerNames[index]}
            </div>
        );

    // Gets the current maximum and minimum score
    // We only need to check the last 2 rows of the scoreboard
    const lastTwo = scoreboard.length === 1 ?
        scoreboard[0] :
        scoreboard[scoreboard.length - 2]
            .concat(scoreboard[scoreboard.length - 1]);

    // For minimums we check the last non-null value of each column
    // We need to check if the length is 1 so that it doesn't go over it and cause issues
    const lastNonNull = scoreboard.length === 1 ?
        scoreboard[0] :
        scoreboard[scoreboard.length - 1]
            .map((score, index) =>
                score === null ?
                    scoreboard[scoreboard.length - 2][index] : score
            )

    const maximum = Math.max.apply(null, lastTwo);

    const minimum = Math.min.apply(null, lastNonNull);

    // Gets the rows for the table
    const scoreboardRows = scoreboard
        .map((scoreboardRow, index) => {
            // Check if this is the only row or it is not the last row
            if (scoreboard.length === 1 || index < scoreboard.length - 1 || scoreboardRow[0] !== null) {
                return <div key={index} className="scoreboard-score-row" style={{ gridTemplateColumns: `repeat(${numPlayers}, auto)` }}>
                    {
                        scoreboardRow
                            .map((column, index2) => {
                                // Figures out what class should be used for minimum/maximum
                                let textClass = ""

                                // We need to check if the index of this one is in the last two (and if its in the 2nd to last one, the one after it must be empty)
                                if (index === scoreboard.length - 1 || (index === scoreboard.length - 2 && scoreboard[scoreboard.length - 1][index2] === null)) {
                                    textClass = column === maximum ?
                                        "maximum-item" : column === minimum ?
                                            "minimum-item" : "";
                                }

                                return <div key={index2} className="flex-center-column" style={{ borderRight: "2px solid black" }}>
                                    <div className={"scoreboard-score-item flex-center-column " + textClass}>
                                        {column === null ? "--" : column}
                                    </div>
                                </div>
                            }
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
                        <div className="scoreboard-score-row">
                            {playerHeaders}
                        </div>
                        
                        {scoreboardRows}
                    </div>
                </div>
            }
        </div>
    );
}