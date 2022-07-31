import "./Header.css"

import { A } from "hookrouter"

import { capitalize } from "../../utils.js"

// Main header component for the app
export default () => {
    // Array of names for pages
    const pageNames = ["home", "basics", "game", "strategy"]

    // Array of link objects to use
    const links = pageNames.map(pageName =>
        <A className="header-item" key={pageName} href={`/${pageName}`}>{capitalize(pageName)}</A>
    );

    return (
        <div className="header" style={{ gridTemplateColumns: `repeat(${links.length}, auto)` }}>
            {links}
        </div>
    );
}