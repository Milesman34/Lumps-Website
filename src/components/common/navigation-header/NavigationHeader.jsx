import "./NavigationHeader.css"

import { capitalize } from "../../../utils.js"
import { useSelector } from "react-redux";
import { useEffect } from "react";

// This header can be used to navigate between parts of a page
export default ({ links, name }) => {
    // List of link elements
    const linkElements = links.map((link, index) => <a key={index} className="navigation-header-item" href={`#${name}/${link}`}>{capitalize(link)}</a>);

    // The top offset for the element's position is calculated from the header's height
    // Since position: sticky does not handle this automatically, we need to know the height of the header to place the navigation header at the right position
    const offset = useSelector(state => state.uiAttributes.headerHeight);

    return (
        <div className="navigation-header" style={{ top: offset }}>
            {linkElements}
        </div>
    );
}