import "./NavigationHeader.css"

import { capitalize } from "../../../utils.js"

// This header can be used to navigate between parts of a page
export default ({ links, name }) => {
    // List of link elements
    const linkElements = links.map((link, index) => <a key={index} className="navigation-header-item" href={`#${name}/${link}`}>{capitalize(link)}</a>);

    // The top offset for the element's position is calculated from the header's height
    const offset = 30;

    return (
        <div className="navigation-header" style={{ top: offset }}>
            {linkElements}
        </div>
    );
}