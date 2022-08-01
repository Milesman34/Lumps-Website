import "./GameComponent.css"

import GameScoreHeader from "./score-header/GameScoreHeader"

export default () => {
    return (
        <div className="game-component">
            <GameScoreHeader />
        </div>
    );
}