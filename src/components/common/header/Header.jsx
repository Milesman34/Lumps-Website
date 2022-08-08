import "./Header.css"
import "../../../common.css"

import { A } from "hookrouter"

// Main header component for the app
export default ({ routeObjects, classPrefix}) => {
    // Array of link objects to use
    const links = routeObjects.map(routeObject => 
        <A className={`header-item flex-center-column ${classPrefix}-header-item`} key={routeObject.name} href={routeObject.route}>{routeObject.name}</A>
    );

    return (
        <div className={`header ${classPrefix}-header`} style={{ gridTemplateColumns: `repeat(${links.length}, auto)` }}>
            {links}
        </div>
    )
}