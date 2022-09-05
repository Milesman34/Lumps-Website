import { useDispatch, useSelector } from "react-redux"
import { selectCanUseCleanSlate, selectCanUseDesperation, selectCurrentIndex, selectCurrentScore, selectDice, selectGameState, selectIsTurnOver, selectPlayerNames, selectRollsLeft, selectWinningPlayer } from "../../../../../redux/selectors/game"
import "./GameComponent.css"
import "../../../../../common.css"

import DieComponent from "./die/DieComponent"
import GameScoreHeader from "./score-header/GameScoreHeader"
import GameRollButton from "./roll-button/GameRollButton"
import EndTurnButton from "./end-turn-button/EndTurnButton"
import { resetGame, setGameState } from "../../../../../redux/actions/game"
import CleanSlateButton from "./clean-slate-button/CleanSlateButton"
import DesperationButton from "./desperation-button/DesperationButton"

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

    // Is the clean slate button enabled
    const cleanSlateEnabled = useSelector(selectCanUseCleanSlate);

    // Is the desperation button enabled
    const desperationEnabled = useSelector(selectCanUseDesperation);

    // Current player names
    const playerNames = useSelector(selectPlayerNames);

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
            {playerNames[currentIndex]}'s Turn
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

        {isTurnOver ? <div style={{ height: 75, marginTop: "1%" }} /> : <GameRollButton />}

        <EndTurnButton />

        {cleanSlateEnabled && <CleanSlateButton />}

        {desperationEnabled && <DesperationButton />}

        {!(cleanSlateEnabled || desperationEnabled) && <div style={{ height: 75, marginTop: "1%" }} />}

        <div className="flex-center-row">
            <button onClick={() => confirm("Do you want to exit the game?") && goToStart()} className="exit-game-button app-button">
                Exit Game
            </button>
        </div>
    </div>

    // The component to render on game end
    const gameEndComponent = <div>
        <div className="winner-display flex-center">
            {playerNames[winningPlayer]} wins!
        </div>

        <div className="flex-center-column">
            <button onClick={restartGame} className="end-restart-button app-button">
                Restart Game
            </button>

            <button onClick={goToStart} className="end-start-screen-button app-button">
                Change number of players
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