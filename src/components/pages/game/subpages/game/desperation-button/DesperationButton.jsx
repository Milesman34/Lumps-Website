import "./DesperationButton.css"
import "../../../../../../common.css"
import { useDispatch } from "react-redux"
import { desperation } from "../../../../../../redux/actions/game";

export default () => {
    const dispatch = useDispatch();

    // Desperation function
    const handleClick = () => {
        dispatch(desperation());
    }

    return (
        <div className="flex-center-row">
            <div onClick={handleClick} className="desperation-button app-button flex-center-column">
                Desperation
            </div>
        </div>
    )
}