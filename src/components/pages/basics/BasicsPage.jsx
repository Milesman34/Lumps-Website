import "./BasicsPage.css"
import "../pages.css"

import NavigationHeader from "../../common/navigation-header/NavigationHeader"

// Main page for the website
export default () => {
    // List of examples for group scoring
    const groupScoringExamples = [
        "3 3 -> 3 points (2 3's = 3 * 1)",
        "4 4 4 -> 8 points (3 4's = 4 * 2)",
        "1 1 5 5 5 -> 12 points (2 1's and 3 5's = 1 * 1 + 5 * 2 = 11)",
        "5 5 5 5 -> 15 points (4 5's = 5 * 3 = 15)",
        "2 2 2 2 2 2 7 7 -> 27 points (6 2's and 2 7's = 2 * 5 + 7 * 1 + (10 point bonus for 6-of-a-kind) = 27)",
        "3 3 3 3 3 3 3 -> 38 points (7 3's = 3 * 6 + (20 point bonus for 7-of-a-kind) = 38)"
    ];

    // List of examples for run scoring
    const runScoringExamples = [
        "1 2 3 4 5 6 -> 10 points (run of 6 = 10 point bonus)",
        "1 1 2 3 4 4 5 6 -> 15 points (run of 6 + 2 1's + 2 4's = 1 * 1 + 4 * 1 + (10 point bonus for run of 6) = 15)",
        "1 2 3 4 5 6 6 7 -> 26 points (run of 7 + 2 6's = 6 * 1 + (20 point bonus for run of 7) = 26)",
        "2 3 4 5 6 7 8 9 -> 30 points (run of 8 = 30 point bonus)"
    ]

    // List of examples for other scoring
    const otherScoringExamples = [
        "1 3 3 5 7 7 7 9 -> 23 points (2 3's + 3 7's = 3 * 1 + 7 * 2 + (6 point bonus for all odd) = 23)",
        "2 2 4 4 6 6 8 8 -> 26 points (2 2's + 2 4's + 2 6's + 2 8's = 2 * 1 + 4 * 1 + 6 * 1 + 8 * 1 + (6 point bonus for all even) = 26)",
        "1 2 3 4 6 7 8 9 -> 0 points (no pairs or runs)",
        "3 3 5 5 5 5 5 5 -> 44 points (2 3's + 6 5's = 3 * 1 + 5 * 5 + (10 point bonus for 6-of-a-kind) + (6 point bonus for all even) = 44",
        "4 4 4 4 4 4 4 4 -> 64 points (8 4's = 4 * 7 + (30 point bonus for 8-of-a-kind) + (6 point bonus for all even) = 64)"
    ]

    return (
        <div className="page-container">
            <NavigationHeader links={["information", "scoring"]} name="basics" />

            <div className="page">
                <div id="basics/information" className="basics-page-heading">Information</div>  

                <div className="basics-page-content">
                    <p>In Lumps, the goal is to reach 100 points before your opponents. Each player takes turns in order, and you can have any number of players. The player who reaches 100 points first wins.</p>
                    <p>In each turn, you get up to 3 rolls. You must keep at least 4 dice after your first roll, and at least 2 dice after your second roll.</p>
                    <p>There are 2 4-sided dice, 2 6-sided dice, 2 8-sided dice, and 2 10-sided dice.</p>
                </div>

                <div id="basics/scoring" className="basics-page-heading">Scoring</div>

                <div className="basics-page-content">
                    <p>After each turn, calculate your score and add it to your total.</p>

                    <p className="basics-page-h2">Groups</p>

                    <p>If you have 2 or more of the same number, then you score points equal to how many additional dice you have with that number.</p>
                    <p>If you have 6 of the same number, you get a 10 points.</p>
                    <p>If you have 7, you get 20 points, and if you have 8, you get 30 points.</p>
                    <p>These bonuses do not stack with themselves, but stack with other types of bonuses.</p>

                    <p className="basics-page-examples-header">Examples:</p>

                    <ul className="basics-page-examples">
                        {
                            groupScoringExamples.map((example, index) =>
                                <li key={index}>{example}</li>
                            )
                        }
                    </ul>

                    <p className="basics-page-h2">Runs</p>
                    
                    <p>You can get bonus points by having runs of consecutive numbers.</p>
                    <p>These runs can have pairs in them, so (1 2 2 3 4 4 5 6) would be a valid run.</p>
                    <p>If you have a run of 6, you get 10 points.</p>
                    <p>If you have a run of 7, you get 20 points.</p>
                    <p>If you have a run of 8, you get 30 points.</p>
                    <p>Like groups of numbers, these bonuses do not stack with themselves, but stack with other bonuses.</p>

                    <p className="basics-page-examples-header">Examples:</p>

                    <ul className="basics-page-examples">
                        {
                            runScoringExamples.map((example, index) => 
                                <li key={index}>{example}</li>
                            )
                        }
                    </ul>

                    <p className="basics-page-h2">All Even/Odd</p>

                    <p>If all of your dice are even or all of your dice are odd, you get 6 additional points.</p>

                    <p className="basics-page-examples-header">Additional Examples:</p>

                    <ul className="basics-page-examples">
                        {
                            otherScoringExamples.map((example, index) =>
                                <li key={index}>{example}</li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}