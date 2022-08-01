import { useSelector } from "react-redux";
import { selectGameComponentRoute } from "../../../redux/selectors/game";
import Header from "../../common/header/Header";

// Creates the main header
export default () => {
    // Component route for the game component
    const route = useSelector(selectGameComponentRoute);

    // Route objects for the main header
    const routeObjects = [
        {
            name: "Game",
            route: `/game/${route}`
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