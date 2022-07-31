import Header from "./common/header/Header";

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
        route: "/game/game"
    },
    {
        name: "Strategy",
        route: "/strategy"
    }
];

// Creates the main header
export default () => {
    return (
        <Header routeObjects={routeObjects} classPrefix="main" />
    );
}