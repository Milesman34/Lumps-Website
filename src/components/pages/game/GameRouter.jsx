import GameConfigs from "./subpages/configs/GameConfigs"
import GameComponent from "./subpages/game/GameComponent"
import GameScoreboard from "./subpages/scoreboard/GameScoreboard"
import GameStartScreen from "./subpages/start/GameStartScreen";

// Routes to switch between aspects of the game
const routes = {
    "/game": () => <GameComponent />,
    "/start": () => <GameStartScreen />,
    "/scoreboard": () => <GameScoreboard />,
    "/configs": () => <GameConfigs />
};

export default routes;