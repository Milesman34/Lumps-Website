import "./HomePage.css"
import "../pages.css"

import { A } from "hookrouter"

// Main page for the website
export default () => {
    return (
        <div className="page">
            <div className="home-page-header">Lumps</div>

            <p className="home-page-content">
                Lumps is a die-rolling game where the goal is to reach 100 points. You can get points from groups or runs of numbers. You get 3 rolls per turn, and must keep some dice each turn. The dice have different numbers of sides, affecting strategy.
            </p>

            <div className="home-page-links">
                <p>For more information, click <A href="/basics">here</A></p>
                <p>To play the game on this website, click <A href="/game/game">here</A></p>
                <p>To read about game strategy, click <A href="/strategy">here</A></p>
            </div>
        </div>
    );
}