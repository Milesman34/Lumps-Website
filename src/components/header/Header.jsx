import "./Header.css"

import { A } from "hookrouter"

import { capitalize } from "../../utils.js"

import { useEffect, useRef } from "react"

// Main header component for the app
export default () => {
    // Ref for this element
    const elementRef = useRef(null);

    useEffect(() => {
        console.log(elementRef.current.offsetHeight);
    }, [elementRef])

    // Array of names for pages
    const pageNames = ["home", "basics", "game"]

    // Array of link objects to use
    const links = pageNames.map(pageName =>
        <A className="header-item" key={pageName} href={`/${pageName}`}>{capitalize(pageName)}</A>
    );

    return (
        <div className="header" ref={elementRef} style={{ gridTemplateColumns: `repeat(${links.length}, auto)` }}>
            {links}
        </div>
    );
}