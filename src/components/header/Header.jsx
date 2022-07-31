import "./Header.css"

import { A } from "hookrouter"

import { capitalize } from "../../utils.js"

import { setHeaderHeight } from "../../redux/actions"

import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

// Main header component for the app
export default () => {
    // Redux dispatch
    const dispatch = useDispatch();

    // Ref for this element
    const elementRef = useRef(null);

    // This effect should run on every resize, updating the header height as needed
    useEffect(() => {
        const updateSize = () => {
            dispatch(setHeaderHeight(elementRef.current.offsetHeight));
        };

        window.addEventListener("resize", updateSize);

        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, [])

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