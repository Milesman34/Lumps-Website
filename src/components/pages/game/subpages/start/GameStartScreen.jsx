import { useState } from "react"
import { useDispatch } from "react-redux"
import { resetGame, setNumPlayers, setPlayerNames } from "../../../../../redux/actions/game"
import { findDuplicate, hasDuplicates, isReservedName } from "../../../../../utils.js"
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
        // Parsed int value for the number of players
        const parsedNumber = parseInt(formData.players);

        // Check if the number can be parsed and is within range
        if (isNaN(parsedNumber) || formData.players.includes(".") || parsedNumber < 1 || parsedNumber > 8) {
            setWarningText("Enter a number between 1 and 8!");
            return;
        }

        // Separates the names by commas, and parses the split names to remove leading/trailing spaces and remove empty names
        const separatedNames = formData.playerNames
            .split(",")
            .map(name => name.trim())
            .filter(name => name !== "");

        // Gets the new names by replacing any names not stated with the defaults
        const newNames = [1, 2, 3, 4, 5, 6, 7, 8]
            .slice(0, parsedNumber)
            .map((number, index) => index < separatedNames.length ? separatedNames[index] : `Player ${number}`);

        // Check for duplicate names
        if (hasDuplicates(newNames)) {
            const duplicate = findDuplicate(newNames);

            // Sets the new warning text, checking if the duplicate is a reserved name
            const reservedText = isReservedName(duplicate, parsedNumber) ? "reserved" : "duplicate";
            console.log(duplicate, reservedText);

            setWarningText(`The name ${duplicate} is a ${reservedText} name!`);
            return;
        }

        dispatch(setNumPlayers(parsedNumber));
        dispatch(setPlayerNames(newNames));
        resetGame(dispatch);
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