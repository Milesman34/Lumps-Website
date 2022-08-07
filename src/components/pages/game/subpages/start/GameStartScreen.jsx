import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsBeingPlayed, setNumPlayers } from "../../../../../redux/actions/game";
import "./GameStartScreen.css"

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
            dispatch(setIsBeingPlayed(true));   

            dispatch(setNumPlayers(parsed));
        }
    }

    // Handles changes to the input
    const handleChange = event => {
        setPlayersText(event.target.value);
    }

    return (
        <div className="game-start-screen">
            <input type="text" placeholder="Number of Players (1-8)" onChange={handleChange} name="players" value={playersText} className="game-start-input" />

            {warningText === "" ? <span className="game-start-warning"></span> : <div className="game-start-warning">{warningText}</div>}

            <button onClick={startGame} className="game-start-button">Start Game</button>
        </div>
    );
}