import { navigate } from "hookrouter";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsBeingPlayed } from "../../../../../redux/actions/game";
import "./GameStartScreen.css"

// Component for the game's start screen
export default () => {
    // Dispatch for this component
    const dispatch = useDispatch();
    
    // Current text for the number of players
    const [playersText, setPlayersText] = useState("");

    // Starts the game
    const startGame = () => {
        dispatch(setIsBeingPlayed(true));

        // Navigates to the game
        navigate("/game/game");
    }

    // Handles changes to the input
    const handleChange = event => {
        setPlayersText(event.target.value);
    }

    return (
        <div className="game-start-screen">
            <input type="text" placeholder="Number of Players" onChange={handleChange} name="players" value={playersText} className="game-start-input" />

            <button onClick={startGame} className="game-start-button">Start Game</button>
        </div>
    );
}