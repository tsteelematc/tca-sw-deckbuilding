import { useNavigate } from "react-router-dom";

interface HomeProps {
    numGames: number;
}

export const Home: React.FC<HomeProps> = ({
    // Demonstrating renaming the destructured prop to foo, show off : - )
    numGames: foo
}) => {

    // Use a react hook for navigation...
    const nav = useNavigate();

    return (
        <div>
            <h1
                className='text-2xl font-bold mb-3'
            >
                Home ({foo} games played)
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