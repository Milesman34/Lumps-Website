import "./GamePage.css"

import { useRoutes } from "hookrouter"

import GameHeader from "./GameHeader"

import GameConfigs from "./subpages/configs/GameConfigs"
import GameComponent from "./subpages/game/GameComponent"
import GameScoreboard from "./subpages/scoreboard/GameScoreboard"
import GameStartScreen from "./subpages/start/GameStartScreen"
import { useSelector } from "react-redux"
import { selectGameState } from "../../../redux/selectors/game"

// Main page for the website
export default () => {
    // Gets the current game state
    const state = useSelector(selectGameState);

    // Routes to switch between aspects of the game (this is stored in here so I can use React hooks)
    const router = {
        "/game": () => state === "start" ?
            <GameStartScreen /> : <GameComponent />,

        "/scoreboard": () => <GameScoreboard />,
        "/configs": () => <GameConfigs />
    };

    const routeResult = useRoutes(router);

    return (
        <div className="game-page">
            <GameHeader />
            {routeResult}
        </div>
    );
}