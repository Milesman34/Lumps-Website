import { useState } from "react"
import { useDispatch } from "react-redux"
import { resetGame, setNumPlayers, setPlayerNames } from "../../../../../redux/actions/game"
import "./GameStartScreen.css"
import "../../../../../common.css"

// Component for the game's start screen
export default () => {
    // Dispatch for this component
    const dispatch = useDispatch();

    // Current form data for the start screen
    const [formData, setFormData] = useState({
        players: "",
        playerNames: ""
    });

    // Current warning text
    const [warningText, setWarningText] = useState("");

    // Starts the game
    const startGame = () => {
        // Parsed int value
        const parsed = parseInt(formData.players);

        // Separates the names by commas, and parses the split names to remove leading/trailing spaces and remove empty names
        const separatedNames = formData.playerNames
            .split(",")
            .map(name => name.trim())
            .filter(name => name !== "");

        // Check if the number can be parsed
        if (isNaN(parsed) || parsed < 1 || parsed > 8) {
            setWarningText("Enter a number between 1 and 8!")
        } else {
            dispatch(setNumPlayers(parsed));
            dispatch(setPlayerNames(separatedNames));
            resetGame(dispatch);
        }
    }

    // Handles changes to the input
    const handleChange = event => {
        setFormData(data => ({
            ...data,
            [event.target.name]: event.target.value
        }));
    }

    // Handles key presses
    const handleKeyPress = event => {
        if (event.key === "Enter") {
            startGame();
        }
    }

    return (
        <div className="game-start-screen flex-center-column">
            <input type="text" placeholder="Number of Players (1-8)" onChange={handleChange} onKeyPress={handleKeyPress} name="players" value={formData.players} className="game-start-input" />

            <input type="text" placeholder="Player Names (comma separated)" onChange={handleChange} onKeyPress={handleKeyPress} name="playerNames" value={formData.playerNames} className="game-start-input" />

            {warningText === "" ? <span className="game-start-warning flex-center-column"></span> : <div className="game-start-warning flex-center-column">{warningText}</div>}

            <button onClick={startGame} className="game-start-button app-button">Start Game</button>
        </div>
    );
}