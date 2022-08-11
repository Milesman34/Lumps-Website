import "./CleanSlateButton.css"
import "../../../../../../common.css"
import { useDispatch } from "react-redux"
import { cleanSlate } from "../../../../../../redux/actions/game";

export default () => {
    const dispatch = useDispatch();

    // Clean slate function
    const handleClick = () => {
        dispatch(cleanSlate());
    }

    return (
        <div className="flex-center-row">
            <div onClick={handleClick} className="clean-slate-button app-button flex-center-column">
                Clean Slate
            </div>
        </div>
    )
}