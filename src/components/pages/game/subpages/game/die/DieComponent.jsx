import { useDispatch, useSelector } from "react-redux"
import { selectDieGraphicsEnabled } from "../../../../../../redux/selectors/game"
import { toggleDieWillBeLocked } from "../../../../../../redux/actions/game"
import "./DieComponent.css"
import "../../../../../../common.css"

// Component for a Die object
export default ({ die, index }) => {
    // Dispatch to use
    const dispatch = useDispatch();

    // Gets if die graphics are enabled
    const dieGraphicsEnabled = useSelector(selectDieGraphicsEnabled)

    // Returns the color class to use
    const colorClass = die.isLocked ? "die-locked" : die.willBeLocked ? "die-will-be-locked" : "die-unlocked"

    // Returns the HTML for a square die
    // Parameter determines if it should display the number of sides
    const makeSquareDie = (displaySides = true) =>
        <div onClick={handleClick} className={`die flex-center-column ${colorClass}`}>
            <div className="die-value">{die.value}</div>

            {displaySides && <div className="die-sides">Sides: {die.sides}</div>}
        </div>;

    // Returns the div to use for the dice if graphics are enabled
    const getGraphicsDiv = sides => {
        // Squares use the default die side
        if (sides === 6) {
            return makeSquareDie(false);
        } else {
            // Gets the list of polygon points
            const polygonPoints = sides === 4 ?
                "50,0 0,100 100,100" : sides === 8 ?
                    "25,0 75,0 100,50 75,100 25,100 0,50" :
                    "50,0 100,30 100,70 50,100 0,70 0,30";

            return <div className="die-svg-container">
                <svg height="100" width="100" className="die-svg">
                    <polygon points={polygonPoints} onClick={handleClick} className={`die-polygon flex-center-column ${colorClass}`}>
                    </polygon>
                </svg>

                <div className="die-value die-polygon-value flex-center-column">{die.value}</div>
            </div>;
        }
    }

    // Handles a click
    const handleClick = event => {
        event.preventDefault();

        // Toggles if this die will be locked, if the die isn't already locked
        if (!die.isLocked) {
            dispatch(toggleDieWillBeLocked(index));
        }
    }

    // We need to check if die graphics are enabled or not
    return dieGraphicsEnabled ? getGraphicsDiv(die.sides) : makeSquareDie();
    // <div onClick={handleClick} className={`shaped-die flex-center-column ${colorClass}`}>
    //     <div className="die-value">{die.value}</div>
    // </div>
}