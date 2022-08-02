
import Header from "./common/header/Header";

// Creates the main header
export default () => {
    // Route objects for the main header
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
            route: `/game/game`
        },
        {
            name: "Strategy",
            route: "/strategy"
        }
    ];

    return (
        <Header routeObjects={routeObjects} classPrefix="main" />
    );
}