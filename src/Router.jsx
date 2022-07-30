import BasicsPage from "./components/pages/basics/BasicsPage"
import GamePage from "./components/pages/game/GamePage"
import HomePage from "./components/pages/home/HomePage"

// Routes to help with switching between key pages
const routes = {
	"/home": () => <HomePage />,
	"/basics": () => <BasicsPage />,
	"/game": () => <GamePage />
};

export default routes;