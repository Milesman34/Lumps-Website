import { useDispatch } from "react-redux"
import { toggleDieWillBeLocked } from "../../../../../../redux/actions/game"
import "./DieComponent.css"
import "../../../../../../common.css"

// Component for a Die object
export default ({ die, index }) => {
    // Dispatch to use
    const dispatch = useDispatch();

    // Returns the color class to use
    const colorClass = die.isLocked ? "die-locked" : die.willBeLocked ? "die-will-be-locked" : "die-unlocked"

    // Handles a click
    const handleClick = event => {
        event.preventDefault();

        // Toggles if this die will be locked, if the die isn't already locked
        if (!die.isLocked) {
            dispatch(toggleDieWillBeLocked(index));
        }
    }

    return (
        <div onClick={handleClick} className={`die flex-center-column ${colorClass}`}>
            <div className="die-value">{die.value}</div>
            <div className="die-sides">Sides: {die.sides}</div>
        </div>
    );
}