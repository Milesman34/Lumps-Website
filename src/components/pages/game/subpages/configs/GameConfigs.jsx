import "./GameConfigs.css"

import "../../../../../common.css"
import { useState } from "react";
import { checkboxLabel } from "../../../../../utils";

export default () => {
    const [formData, setFormData] = useState({
        cleanSlateEnabled: false,
        cleanSlatePerTurn: 1
    });

    // Handles changes to the form
    const handleChange = event => {
        const target = event.target;

        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="game-configs flex-center-column">
            <div className="form-area flex-center-column">
                <div className="form-area-title">Clean Slate</div>
                <div className="form-area-description">Clean Slate allows you to re-roll all your dice one or more times per turn. If you do it after your first roll, you will have to keep 6 dice, while if you do it after your second roll, you will have to keep all 8.</div>

                <div className="form-checkbox flex-center-row">
                    <input type="checkbox" id="clean-slate" name="cleanSlateEnabled" checked={formData.cleanSlateEnabled} onChange={handleChange} />
                    <label htmlFor="clean-slate">{checkboxLabel(formData.cleanSlateEnabled)}</label>
                </div>
            </div>
        </div>
    );
}