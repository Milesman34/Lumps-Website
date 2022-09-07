import "./GameConfigs.css"

import "../../../../../common.css"
import { useEffect, useState } from "react";
import { checkboxLabel } from "../../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { updateConfigs } from "../../../../../redux/actions/game";
import { selectConfigs } from "../../../../../redux/selectors/game";

export default () => {
    // Dispatch object
    const dispatch = useDispatch();

    // Current configs in the game
    const configs = useSelector(selectConfigs);

    // State object for the form data
    const [formData, setFormData] = useState({
        cleanSlateEnabled: configs.cleanSlate.enabled,
        cleanSlatePerTurn: configs.cleanSlate.perTurn.toString(),
        desperationEnabled: configs.desperation.enabled,
        desperationRepeatable: configs.desperation.repeatable,
        extraChance: configs.extraChance,
        dieGraphics: configs.dieGraphics
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

    // Handles changes to form data
    useEffect(() => {
        dispatch(updateConfigs({
            cleanSlate: {
                enabled: formData.cleanSlateEnabled,
                perTurn: parseInt(formData.cleanSlatePerTurn)
            },

            desperation: {
                enabled: formData.desperationEnabled,
                repeatable: formData.desperationRepeatable
            },

            extraChance: formData.extraChance,
            dieGraphics: formData.dieGraphics
        }));

        // Saves to localstorage
        localStorage.setItem("cleanSlateEnabled", formData.cleanSlateEnabled.toString());
        localStorage.setItem("cleanSlatePerTurn", formData.cleanSlatePerTurn);
        localStorage.setItem("desperationEnabled", formData.desperationEnabled.toString());
        localStorage.setItem("desperationRepeatable", formData.desperationRepeatable.toString());
        localStorage.setItem("extraChance", formData.extraChance.toString());
        localStorage.setItem("dieGraphics", formData.dieGraphics.toString());
    }, [formData]);

    return (
        <div className="game-configs flex-center-column">
            <div className="form-area flex-center-column">
                <div className="form-area-title">Clean Slate</div>
                <div className="form-area-description">Clean Slate allows you to re-roll all your dice one or more times per turn. If you do it after your first roll, you will have to keep 6 dice, while if you do it after your second roll, you will have to keep all 8.</div>

                <div className="form-inputs-container">
                    <div className="form-checkbox">
                        <input type="checkbox" id="clean-slate" name="cleanSlateEnabled" checked={formData.cleanSlateEnabled} onChange={handleChange} />
                        <label htmlFor="clean-slate">{checkboxLabel(formData.cleanSlateEnabled)}</label>
                    </div>

                    {
                        formData.cleanSlateEnabled && <div className="form-radio" style={{ margin: 5 }}>
                            <div className="form-radio-title">Clean Slates per turn</div>

                            <div className="form-radio-entry">
                                <input className="form-radio-input" type="radio" checked={formData.cleanSlatePerTurn === "1"} value="1" name="cleanSlatePerTurn" onChange={handleChange} />
                                <div className="form-radio-label">1</div>
                            </div>

                            <div className="form-radio-entry">
                                <input className="form-radio-input" type="radio" checked={formData.cleanSlatePerTurn === "2"} value="2" name="cleanSlatePerTurn" onChange={handleChange} />
                                <div className="form-radio-label">2</div>
                            </div>
                        </div>
                    }
                </div>

                <div className="form-area-title" style={{ margin: 10 }}>Desperation</div>
                <div className="form-area-description">Desperation allows you to re-roll all your dice after the end of a turn.</div>

                <div className="form-inputs-container">
                    <div className="form-checkbox">
                        <input type="checkbox" id="desperation" name="desperationEnabled" checked={formData.desperationEnabled} onChange={handleChange} />
                        <label htmlFor="desperation">{checkboxLabel(formData.desperationEnabled)}</label>
                    </div>

                    {
                        formData.desperationEnabled && <div className="form-checkbox-container">
                            <div className="desperation-description">Should Desperation be possible more than once per game?</div>
                            <div className="form-checkbox">
                                <input type="checkbox" id="desperation-repeatable" name="desperationRepeatable" checked={formData.desperationRepeatable} onChange={handleChange} />
                                <label htmlFor="desperation-repeatable"></label>
                            </div>
                        </div>
                    }
                </div>

                <div className="form-area-title" style={{ margin: 10 }}>Extra Chance</div>
                <div className="form-area-description">Once someone reaches 100 points, everyone else gets another roll if they have not had as many rolls as the current leader. If there is a tie, everyone gets one more roll until the tie is broken.</div>

                <div className="form-inputs-container">
                    <div className="form-checkbox">
                        <input type="checkbox" id="extra-chance" name="extraChance" checked={formData.extraChance} onChange={handleChange} />
                        <label htmlFor="extra-chance">{checkboxLabel(formData.extraChance)}</label>
                    </div>
                </div>

                <div className="form-area-title" style={{ margin: 10 }}>Die Graphics</div>
                <div className="form-area-description">Should the dice have their own shapes based on the number of sides?</div>

                <div className="form-inputs-container">
                    <div className="form-checkbox">
                        <input type="checkbox" id="die-graphics" name="dieGraphics" checked={formData.dieGraphics} onChange={handleChange} />
                        <label htmlFor="die-graphics">{checkboxLabel(formData.dieGraphics)}</label>
                    </div>
                </div>
            </div>
        </div>
    );
}