import BasicsPage from "./components/pages/basics/BasicsPage"
import GamePage from "./components/pages/game/GamePage"
import HomePage from "./components/pages/home/HomePage"
import StrategyPage from "./components/pages/strategy/StrategyPage"

// Routes to help with switching between key pages
const routes = {
	"/home": () => <HomePage />,
	"/basics": () => <BasicsPage />,
	"/game*": () => <GamePage />,
	"/strategy": () => <StrategyPage />,
	"*": () => <HomePage />
};

export default routes;