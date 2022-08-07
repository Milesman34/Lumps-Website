import "./DieComponent.css"

// Component for a Die object
export default ({ die }) => {
    return (
        <div className="die">
            {die.value}
        </div>
    );
}