import { useNavigate } from "react-router-dom";

interface HomeProps {
    numberOfGames: number;
}

export const Home: React.FC<HomeProps> = ({
    numberOfGames
}) => {

    // Use a react hook for navigation...
    const nav = useNavigate();

    return (
        <div>
            <h1
                className='text-2xl font-bold mb-3'
            >
                Home ({numberOfGames} games played)
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