import GameConfigs from "./subpages/configs/GameConfigs"
import GameComponent from "./subpages/game/GameComponent"

// Routes to switch between aspects of the game
const routes = {
    "/game": () => <GameComponent />,
    "/configs": () => <GameConfigs />
};

export default routes;