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
    avgThingsPerWin: number;
}

export const Home: React.FC<HomeProps> = ({
    leaderboardData
    , generalFactsData
    , setTitle
    , avgThingsPerWin
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
                        Avg Things Per Win
                    </h2>
                    <h1
                        className="text-5xl font-bold"
                    >
                        {avgThingsPerWin}
                    </h1>
                </div>
            </div>            
        </div>
    );
};