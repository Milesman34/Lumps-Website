import { useDispatch, useSelector } from "react-redux"
import { selectCurrentIndex, selectCurrentScore, selectDice, selectGameState, selectIsTurnOver, selectRollsLeft, selectWinningPlayer } from "../../../../../redux/selectors/game"
import "./GameComponent.css"
import "../../../../../common.css"

import DieComponent from "./die/DieComponent"
import GameScoreHeader from "./score-header/GameScoreHeader"
import GameRollButton from "./roll-button/GameRollButton"
import EndTurnButton from "./end-turn-button/EndTurnButton"
import { resetGame, setGameState } from "../../../../../redux/actions/game"

export default () => {
    // Dispatch to use
    const dispatch = useDispatch();

    // Current score
    const currentScore = useSelector(selectCurrentScore);

    // Index of current player
    const currentIndex = useSelector(selectCurrentIndex);

    // Number of rolls left in this turn
    const rollsLeft = useSelector(selectRollsLeft);

    // Is the player's turn over
    const isTurnOver = useSelector(selectIsTurnOver);

    // Current game state
    const gameState = useSelector(selectGameState);

    // Current winning player
    const winningPlayer = useSelector(selectWinningPlayer);

    // Current list of dice
    const dice = useSelector(selectDice);

    // Returns the text used to display the number of rolls left
    const rollsLeftText = () => {
        if (isTurnOver) {
            return "No Rolls Left";
        } else if (rollsLeft === 2) {
            return "2 Rolls Left";
        } else {
            return "1 Roll Left";
        }
    }

    // Restarts the game
    const restartGame = () => {
        resetGame(dispatch);
    }

    // Moves the game to the starting screen
    const goToStart = () => {
        dispatch(setGameState("start"));
    }

    // List of die components to render
    const dieComponents = dice.map((die, index) => <DieComponent key={index} index={index} die={die} />);

    // The core game component to render
    const gameComponent = <div>
        <div className="game-display-text game-turn-display">
            Player {currentIndex + 1}'s Turn
        </div>

        <div className="game-display-text game-score-display">
            Score: {currentScore}
        </div>

        <div className="game-display-text game-rolls-left-display">
            {rollsLeftText()}
        </div>

        <div className="game-dice-container flex-center-row">
            {dieComponents}
        </div>

        {isTurnOver || <GameRollButton />}

        <EndTurnButton />
    </div>

    // The component to render on game end
    const gameEndComponent = <div>
        <div className="winner-display flex-center">
            Player {winningPlayer + 1} wins!
        </div>

        <div className="flex-center-column">
            <button onClick={restartGame} className="end-restart-button app-button">
                Restart Game
            </button>

            <button onClick={goToStart} className="end-start-screen-button app-button">
                Go to Start Screen
            </button>
        </div>
    </div >

    return (
        <div className="game-component">
            <GameScoreHeader />

            {
                gameState === "game" ? gameComponent : gameEndComponent
            }
        </div>
    );
}