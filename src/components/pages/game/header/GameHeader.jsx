import Header from "../../../common/header/Header";

// Route objects for the main header
const routeObjects = [
    {
        name: "Game",
        route: "/game/game"
    },
    {
        name: "Configs",
        route: "/game/configs"
    }
];

// Creates the main header
export default () => {
    return (
        <Header routeObjects={routeObjects} classPrefix="game" />
    );
}