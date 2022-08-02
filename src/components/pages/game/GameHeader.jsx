import Header from "../../common/header/Header";

// Creates the main header
export default () => {
    // Route objects for the main header
    const routeObjects = [
        {
            name: "Game",
            route: `/game/game`
        },
        {
            name: "Scoreboard",
            route: "/game/scoreboard"
        },
        {
            name: "Configs",
            route: "/game/configs"
        }
    ];

    return (
        <Header routeObjects={routeObjects} classPrefix="game" />
    );
}