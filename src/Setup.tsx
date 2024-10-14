import { useNavigate } from "react-router-dom";

interface SetupProps {
    previousPlayers: string[];
}

export const Setup: React.FC<SetupProps> = ({previousPlayers}) => {

    console.log(previousPlayers);
    
    const myNav = useNavigate();

    return (
        <div>
            <h1
                className='text-2xl font-bold mb-3'
            >
                Setup
            </h1>
            <button
                className="btn btn-primary mb-3"
                onClick={() => myNav("/play")}
            >
                Start Playing
            </button>
        </div>
    );
};