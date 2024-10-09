import { useNavigate } from "react-router-dom";
import { LeaderboardEntry } from "./game-results";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
}

export const Home: React.FC<HomeProps> = ({
    leaderboardData
}) => {

    console.log(leaderboardData);

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
        </div>
    );
};