import GameConfigs from "./subpages/configs/GameConfigs"
import GameComponent from "./subpages/game/GameComponent"
import GameScoreboard from "./subpages/scoreboard/GameScoreboard";

// Routes to switch between aspects of the game
const routes = {
    "/game": () => <GameComponent />,
    "/scoreboard": () => <GameScoreboard />,
    "/configs": () => <GameConfigs />
};

export default routes;