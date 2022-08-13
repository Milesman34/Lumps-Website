import "./StrategyPage.css"
import "../pages.css"

// Main page for the website
export default () => {
    // Data for the probability table (array of rows)
    const probabilityTable = [
        ["", "4 Sides", "6 Sides", "8 Sides", "10 Sides"],
        ["1", "1/4", "1/6", "1/8", "1/10"],
        ["2", "1/4", "1/6", "1/8", "1/10"],
        ["3", "1/4", "1/6", "1/8", "1/10"],
        ["4", "1/4", "1/6", "1/8", "1/10"],
        ["5", "", "1/6", "1/8", "1/10"],
        ["6", "", "1/6", "1/8", "1/10"],
        ["7", "", "", "1/8", "1/10"],
        ["8", "", "", "1/8", "1/10"],
        ["9", "", "", "", "1/10"],
        ["10", "", "", "", "1/10"]
    ]

    return (
        <div className="page-container">
            <div className="page app-page">
                <div className="app-page-heading">Strategy</div>

                <div className="app-page-content">
                    <p>There are many elements of strategy within Lumps. </p>
                    <p>The player must consider what dice they want to keep, and whether they should take risks or play it safe.</p>
                    <p>The scores of the other players and what variations they use also affect strategies.</p>
                </div>

                <div className="app-page-h2">Dice Probabilities</div>

                <div className="app-page-content">
                    <p>Sometimes you will want to roll a specific number. Since the dice have different numbers of sides, you will want to roll the dice that give you better odds of getting what you want.</p>

                    <p>If you want to get groups of a number, you are better off rolling lower dice.</p>

                    <div className="app-page-linebreak" />

                    <p>Here is a table of all dice and the odds of rolling each number:</p>

                    <div className="app-page-table">
                        {
                            probabilityTable.map((row, index) =>
                                <div key={index} className="app-page-table-row">
                                    {
                                        row.map((col, index2) =>
                                            <div key={index2}
                                                className="flex-center-column app-page-table-column"
                                                style={{
                                                    width: index2 === 0 ? 30 : 120,
                                                    fontWeight: (index === 0 || index2 === 0) ? "bold" : "lighter"
                                                }}
                                            >{col}</div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>

                    <p>If you need to roll 2 specific dice, you can multiply the odds for each option, then add them together.</p>
                    <div className="app-page-linebreak" />
                    <p>For example, if you had a 4 and a 6-sided die to roll, and needed a 2 and a 3, your odds would be (1/4*1/6 + 1/4*1/6 = 1/12).</p>
                    <p>However, if you needed a 3 and a 5, your odds would be only (1/4*1/6 = 1/24), because the 4-sided die can't roll a 5.</p>
                </div>

                <div className="app-page-h2">Runs</div>

                <div className="app-page-content">
                    <p>Runs are pretty valuable (worth 10/20/30 points), but are risky. If you attempt to get a run and fail, you probably won't get many points that turn.</p>
                    <p>There are two types of runs, inside and outside.</p>
                    <p>With inside runs, like (1 2 3 4 6), you need to roll a specific number (in this case a 5).</p>
                    <p>With outside runs like (2 3 4 5 6), you can roll two possible numbers (in this case a 1 or 7).</p>
                    <p>Inside runs are more difficult, as your odds of getting the run is less likely.</p>

                    <div className="app-page-linebreak" />

                    <p>Whether or not to go for a run can depend on what dice you have available, the current game situation, or what other ways you could produce points that turn.</p>
                    <p>For example, with the roll (2 2 3 4 5 5 6 9), it would be smart to go for the run.</p>
                    <p>With the roll (1 3 3 4 5 7 7 9), it would likely be better to keep the 3's and 7's and attempt to get pairs of those and other odd numbers. </p>

                    <div className="app-page-linebreak" />

                    <p>Runs of 7 or 8 are more valuable. However, unlike a run of 6 where you may have 2 rolls to get the run, with these you only have 1 chance.</p>
                    <p>If you fail, you most likely won't get many points.</p>

                    <div className="app-page-linebreak" />

                    <p>Regardless, if you want to go for a run, you need to optimize which dice you roll. You want to roll the dice which have the best chance of getting the numbers you need.</p>
                </div>

                <div className="app-page-h2">Groups of 6+</div>

                <div className="app-page-content">
                    <p>Getting groups of 6+ are pretty valuable, but even if you can't pull it off, you can still get plenty of points.</p>
                    <p>For example, with (3 3 3 3 3), even if you don't get another 3, you still get 12 points plus whatever else you rolled.</p>
                    <p>Going for these also makes it easier to get the all even/odd bonus.</p>

                    <div className="app-page-linebreak" />

                    <p>However, there are some cases where it may not be worth it, such as if the group in question is all 1's, or if you have other ways to produce points.</p>
                    <p>With 5's and 6's, it is much harder to get 6 of a kind, but even 4 or 5 of them still produces a lot of points on its own.</p>
                    <p>Meanwhile with 1's, the risk is too high if you don't get at least 6, and even 6 1's is only worth 15 points total.</p>

                    <div className="app-page-linebreak" />

                    <p>You should roll whichever dice make it easier to get the number you are aiming for. You should also try to get the all odd/even bonus to give you plenty of points even if you don't get 6+ of a kind.</p>
                </div>

                <div className="app-page-h2">All Odd/Even Bonus</div>

                <div className="app-page-content">
                    <p>The all odd/even bonus is only worth 6 points, but usually when you get it you get plenty of other points via pairs.</p>
                    <p>Depending on the value of the number groups in your first roll, it may be smart to go for the all odd/even bonus, so you can get those 6 points plus whatever you get from groups.</p>
                </div>

                <div className="app-page-h2">Situationals and Strategy</div>

                <div className="app-page-content">
                    <p>The game situation affects your decisions. If you think someone is about to win before you can take another turn, you can be more aggressive.</p>
                    <p>Meanwhile, if you have a large lead, it may be better to play more conservatively and avoid any awful turns.</p>
                    <p>Most likely, your goal should be to reach 100 points in 6 turns or less, although this can vary based on how well your opponents are playing.</p>

                    <div className="app-page-linebreak" />

                    <p>When someone is close to 100 points, they may play in a risk-averse manner to avoid failing to reach 100 points and giving their opponents more chances.</p>
                    <p>However, if they are playing with the Extra Chance rules and it is a close game, they can't do this and need to get enough points to pass any other players.</p>
                    <p>It is important to determine whether you will likely get another turn or not, based on the number of players, their scores, and what house rules you are playing with. If you most likely won't get another turn, you must play aggressively and go for big scores.</p>
                </div>

                <div className="app-page-heading">Variations</div>
                
                <div className="app-page-h2">Clean Slate</div>

                <div className="app-page-content">
                    <p>With Clean Slate enabled, you can decide to re-roll your dice during a turn. However, you must keep more dice.</p>
                    <p>Usually, you will only want to do this when you have a terrible roll and believe the next roll will give you more points.</p>
                    <p>However, if you are desperate late in the game, you can do this to hope for a really big turn.</p>
                </div>

                <div className="app-page-h2">Desperation</div>
                        
                <div className="app-page-content">
                    <p>With Desperation enabled, you can throw out your results from a turn and replace them with a single roll.</p>
                    <p>Usually you should only do this after a terrible turn, since you probably won't get too many points from this.</p>
                    <p>However, later in the game, you can use this as a last-ditch attempt to win.</p>

                    <div className="app-page-linebreak" />

                    <p>If you are playing with only 1 use of desperation per player, then you should decide if your roll is really bad enough to justify using it, or if you should save it for later.</p>
                    <p>However, if you wait too long, then you may not have a good opportunity to use it due to being too far behind. So it is important to weigh your options and the game situation.</p>
                </div>
            </div>
        </div>
    );
}