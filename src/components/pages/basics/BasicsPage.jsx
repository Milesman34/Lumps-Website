import "../pages.css"

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
            <div className="page app-page">
                <div className="app-page-heading">Information</div>

                <div className="app-page-content">
                    <p>In Lumps, the goal is to reach 100 points before your opponents. Each player takes turns in order, and you can have any number of players. The player who reaches 100 points first wins.</p>
                    <div className="app-page-linebreak" />
                    <p>In each turn, you get up to 3 rolls. You must keep at least 4 dice after your first roll, and at least 2 dice after your second roll.</p>
                    <p>There are 2 4-sided dice, 2 6-sided dice, 2 8-sided dice, and 2 10-sided dice.</p>
                </div>

                <div className="app-page-heading">Where to buy</div>

                <div className="app-page-content">
                    <p><a href="https://continuumgames.com/product/lumps-non-seasonal-edition/#:~:text=The%20dice%20game%20of%20big,score%20the%20most%20points%20possible." target="_blank">Here</a> is a link to the Continuum Games website where you can purchase Lumps. </p>
                </div>

                <div className="app-page-heading">Scoring</div>

                <div className="app-page-content">
                    <p>After each turn, calculate your score and add it to your total.</p>

                    <p className="app-page-h2">Groups</p>

                    <p>If you have 2 or more of the same number, then you score points equal to how many additional dice you have with that number.</p>
                    <div className="app-page-linebreak" />
                    <p>If you have 6 of the same number, you get a 10 points.</p>
                    <p>If you have 7, you get 20 points, and if you have 8, you get 30 points.</p>
                    <p>These bonuses do not stack with themselves, but stack with other types of bonuses.</p>

                    <p className="app-page-examples-header">Examples:</p>

                    <ul className="app-page-examples">
                        {
                            groupScoringExamples.map((example, index) =>
                                <li key={index}>{example}</li>
                            )
                        }
                    </ul>

                    <p className="app-page-h2">Runs</p>

                    <p>You can get bonus points by having runs of consecutive numbers.</p>
                    <p>These runs can have pairs in them, so (1 2 2 3 4 4 5 6) would be a valid run.</p>
                    <div className="app-page-linebreak" />
                    <p>If you have a run of 6, you get 10 points.</p>
                    <p>If you have a run of 7, you get 20 points.</p>
                    <p>If you have a run of 8, you get 30 points.</p>
                    <p>Like groups of numbers, these bonuses do not stack with themselves, but stack with other bonuses.</p>

                    <p className="app-page-examples-header">Examples:</p>

                    <ul className="app-page-examples">
                        {
                            runScoringExamples.map((example, index) =>
                                <li key={index}>{example}</li>
                            )
                        }
                    </ul>

                    <p className="app-page-h2">All Even/Odd</p>

                    <p>If all of your dice are even or all of your dice are odd, you get 6 additional points.</p>

                    <p className="app-page-examples-header">Additional Examples:</p>

                    <ul className="app-page-examples">
                        {
                            otherScoringExamples.map((example, index) =>
                                <li key={index}>{example}</li>
                            )
                        }
                    </ul>
                </div>

                <div className="app-page-heading">Education</div>

                <div className="app-page-content">
                    <p>Lumps can teach people about probability and help them with decision making.</p>
                    <p>Given the possibilities in a turn, players need to evaluate multiple options and decide the best one. With more play, they develop a better understanding of probability, allowing them to make better decisions in-game.</p>
                </div>

                <div className="app-page-heading">Variations</div>

                <div className="app-page-content">
                    <p>There are several variations in how you can play the game.</p>
                    <div className="app-page-linebreak" />
                    <p>For starters, after someone reaches 100 points, you can continue playing until everyone has had the same number of turns. If there is a tie, then each player takes more turns until the tie is broken.</p>
                    <div className="app-page-linebreak" />
                    <p>You can also do Clean Slates, where you can re-roll all of your dice after a roll. If you do that after your first roll, you must keep 6 dice on the next roll. If you do it after your second roll, you must keep all 8. You can decide if a player should be allowed to do this more than once in a turn.</p>
                    <div className="app-page-linebreak" />
                    <p>You can also do Desperation, where you can re-roll all of your dice after the end of your turn, keeping the result. You can decide if a player should be allowed to do this more than once per game.</p>
                </div>
            </div>
        </div>
    );
}