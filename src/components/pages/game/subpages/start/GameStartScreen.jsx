import { useState } from "react"
import { useDispatch } from "react-redux"
import { resetGame, setNumPlayers } from "../../../../../redux/actions/game"
import "./GameStartScreen.css"
import "../../../../../common.css"

// Component for the game's start screen
export default () => {
    // Dispatch for this component
    const dispatch = useDispatch();

    // Current text for the number of players
    const [playersText, setPlayersText] = useState("");

    // Current warning text
    const [warningText, setWarningText] = useState("");

    // Starts the game
    const startGame = () => {
        // Parsed int value
        const parsed = parseInt(playersText);

        // Check if the number can be parsed
        if (isNaN(parsed) || parsed < 1 || parsed > 8) {
            setWarningText("Enter a number between 1 and 8!")
        } else {
            dispatch(setNumPlayers(parsed));
            resetGame(dispatch);
        }
    }

    // Handles changes to the input
    const handleChange = event => {
        setPlayersText(event.target.value);
    }

    // Handles key presses
    const handleKeyPress = event => {
        if (event.key === "Enter") {
            startGame();
        }
    }

    return (
        <div className="game-start-screen flex-center-column">
            <input type="text" placeholder="Number of Players (1-8)" onChange={handleChange} onKeyPress={handleKeyPress} name="players" value={playersText} className="game-start-input" />

            {warningText === "" ? <span className="game-start-warning flex-center-column"></span> : <div className="game-start-warning flex-center-column">{warningText}</div>}

            <button onClick={startGame} className="game-start-button app-button">Start Game</button>
        </div>
    );
}