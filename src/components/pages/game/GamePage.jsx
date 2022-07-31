import "./GamePage.css"

import { useRoutes } from "hookrouter"

import GameRouter from "./GameRouter"

// Main page for the website
export default () => {
    const routeResult = useRoutes(GameRouter);

    return (
        <div className="game-page">
            {routeResult}
        </div>
    );
}