import { useSelector } from "react-redux";
import { selectGameComponentRoute } from "../redux/selectors/game";
import Header from "./common/header/Header";

// Creates the main header
export default () => {
    // Selects the game component route
    const route = useSelector(selectGameComponentRoute);

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
            route: `/game/${route}`
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