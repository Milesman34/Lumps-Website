import "./EndTurnButton.css"

export default () => {
    // Handles clicks
    const handleClick = event => {
        event.preventDefault();
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <div onClick={handleClick} className="end-turn-button">
                End Turn
            </div>
        </div>  
    );
}