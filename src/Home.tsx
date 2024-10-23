import { useNavigate } from "react-router-dom";
import { 
    LeaderboardEntry
    , GeneralFactsDisplay 
} from "./game-results";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    generalFactsData: GeneralFactsDisplay;
}

export const Home: React.FC<HomeProps> = ({
    leaderboardData
    , generalFactsData
}) => {

    // Use a react hook for navigation...
    const nav = useNavigate();

    return (
        <div>
            <h1
                className='text-2xl font-bold mb-3'
            >
                Home
            </h1>
            <button
                className="btn btn-primary mb-3"
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
                className="card bg-base-100 shadow-xl"
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
        </div>
    );
};