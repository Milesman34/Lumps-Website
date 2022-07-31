import "./Header.css"

import { A } from "hookrouter"

// Main header component for the app
export default () => {
    // Array of routes (with names)
    const routeObjects = [
        {
            name: "Home",
            route: "/home"
        },
        {
            name: "Basics",
            route: "/basics"
        },
        {
            name: "Game",
            route: "/game/game"
        },
        {
            name: "Strategy",
            route: "/strategy"
        }
    ]

    // Array of link objects to use
    const links = routeObjects.map(routeObjects =>
        <A className="header-item" key={routeObjects.name} href={routeObjects.route}>{routeObjects.name}</A>
    );

    return (
        <div className="header" style={{ gridTemplateColumns: `repeat(${links.length}, auto)` }}>
            {links}
        </div>
    );
}