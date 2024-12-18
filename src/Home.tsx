import { useNavigate } from "react-router-dom";
import { 
    LeaderboardEntry
    , GeneralFactsDisplay 
} from "./game-results";
import { useEffect } from "react";

export const AppTitle = "SW Deckbuilding";
// DRY, TLA...
// Three Letter Acronym
// Don't Repeat Yourself ! ! !

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    generalFactsData: GeneralFactsDisplay;
    setTitle: (t: string) => void;
    factionLeaderboardData: LeaderboardEntry[];
    baseCountFacts: {bases: number, games: number, avgDuration: string, avgTurns: string}[];
    gamesPlayedByMonthData: {month: string, gameCount: number}[];
    starshipFacts: {avgWinningPlayerBasesDestroyed: string, avgLosingPlayerBasesDestroyed: string};
    sabotageOrBountyFacts: {avgWinningPlayerSabotageOrBounty: string, avgLosingPlayerSabotageOrBounty: string};
    gameResults: {timestamp: string, winner: string, loser: string}[];
}

export const Home: React.FC<HomeProps> = ({
    leaderboardData
    , generalFactsData
    , setTitle
    , factionLeaderboardData
    , baseCountFacts
    , gamesPlayedByMonthData
    , starshipFacts
    , sabotageOrBountyFacts
    , gameResults
}) => {

    useEffect(
        () => setTitle(AppTitle)
        , []
    );

    // Use a react hook for navigation...
    const nav = useNavigate();

    return (
        <div>
            <button
                className="btn btn-lg btn-neutral mb-3 w-full"
                onClick={() => nav("/setup")}
            >
                Play
            </button>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title"
                    >
                        General Facts
                    </h2>
                    <table
                        className="table"
                    >
                        <tbody>
                            <tr>
                                <td>
                                    Total Games
                                </td>
                                <th>
                                    {generalFactsData.totalGames}
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    Last Played
                                </td>
                                <th>
                                    {generalFactsData.lastPlayed}
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    Shortest Game
                                </td>
                                <th>
                                    {generalFactsData.shortestGame}
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    Longest Game
                                </td>
                                <th>
                                    {generalFactsData.longestGame}
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    Average Game
                                </td>
                                <th>
                                    {generalFactsData.averageGame}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                    {
                        leaderboardData.length > 0
                            ? (
                                <table
                                    className="table"
                                >
                                    <thead>
                                        <tr>
                                            <th>W</th>
                                            <th>L</th>
                                            <th>AVG</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            leaderboardData.map(x =>(
                                                <tr
                                                    key={x.name}
                                                >
                                                    <td>
                                                        {x.wins}
                                                    </td>
                                                    <td>
                                                        {x.losses}
                                                    </td>
                                                    <td>
                                                        {x.avg}
                                                    </td>
                                                    <td>
                                                        {x.name}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                            : (
                                <p>
                                    Play a game to see the leaderboard!
                                </p>
                            )
                    }
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title"
                    >
                        Faction Leaderboard
                    </h2>
                    {
                        factionLeaderboardData.length > 0
                            ? (
                                <table
                                    className="table"
                                >
                                    <thead>
                                        <tr>
                                            <th>W</th>
                                            <th>L</th>
                                            <th>AVG</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            factionLeaderboardData.map(x =>(
                                                <tr
                                                    key={x.name}
                                                >
                                                    <td>
                                                        {x.wins}
                                                    </td>
                                                    <td>
                                                        {x.losses}
                                                    </td>
                                                    <td>
                                                        {x.avg}
                                                    </td>
                                                    <td>
                                                        {x.name}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                            : (
                                <p>
                                    Gotta play a game to see this leaderboard : - )
                                </p>
                            )
                    }
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title"
                    >
                        Games to X Bases
                    </h2>
                    {
                        baseCountFacts.length > 0
                            ? (
                                <table
                                    className="table table-md"
                                >
                                    <thead>
                                        <tr>
                                            <th>BASES</th>
                                            <th>GAMES</th>
                                            <th>AVG TIME / TURNS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            baseCountFacts.map(x =>(
                                                <tr
                                                    key={x.bases}
                                                >
                                                    <td>
                                                        {x.bases}
                                                    </td>
                                                    <td>
                                                        {x.games}
                                                    </td>
                                                    <td>
                                                        {x.avgDuration} / {x.avgTurns}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                            : (
                                <p>
                                    Play some games...
                                </p>
                            )
                    }
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title"
                    >
                        Games by Month
                    </h2>
                    {
                        gamesPlayedByMonthData.length > 0
                            ? (
                                <table
                                    className="table"
                                >
                                    <thead>
                                        <tr>
                                            <th>MONTH</th>
                                            <th>GAMES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            gamesPlayedByMonthData.map(x =>(
                                                <tr
                                                    key={x.month}
                                                >
                                                    <td>
                                                        {x.month}
                                                    </td>
                                                    <td>
                                                        {x.gameCount}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                            : (
                                <p>
                                    Yep, play a game dummy : - )
                                </p>
                            )
                    }
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title text-sm"
                    >
                        Do winners use more starships?
                    </h2>
                    <p 
                        className="text-sm font-light"
                    >
                        If so, losers may be destroying more starships per game out of necessity...
                    </p>
                    <table
                        className="table"
                    >
                        <tbody>
                            <tr>
                                <td>
                                    Losers destroy
                                </td>
                                <td>
                                    {starshipFacts.avgWinningPlayerBasesDestroyed} starships/game
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Winners destroy
                                </td>
                                <td>
                                    {starshipFacts.avgLosingPlayerBasesDestroyed} starships/game
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title text-sm"
                    >
                        Do winners sabotage or bounty more?
                    </h2>
                    <table
                        className="table"
                    >
                        <tbody>
                            <tr>
                                <td>
                                    Winners sabotage or bounty
                                </td>
                                <td>
                                    {sabotageOrBountyFacts.avgWinningPlayerSabotageOrBounty} items/game
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Losers sabotage or bounty
                                </td>
                                <td>
                                    {sabotageOrBountyFacts.avgLosingPlayerSabotageOrBounty} items/game
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title"
                    >
                        All Games
                    </h2>
                    {
                        gameResults.length > 0
                            ? (
                                <table
                                    className="table"
                                >
                                    <thead>
                                        <tr>
                                            <th>DATE</th>
                                            <th>W</th>
                                            <th>L</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            gameResults.map(x =>(
                                                <tr
                                                    key={x.timestamp}
                                                >
                                                    <td>
                                                        {new Date(x.timestamp).toLocaleString("en-US")}
                                                    </td>
                                                    <td>
                                                        {x.winner}
                                                    </td>
                                                    <td>
                                                        {x.loser}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                            : (
                                <p>
                                    Yep, play some games ! ! !
                                </p>
                            )
                    }
                </div>
            </div>
        </div>
    );
};