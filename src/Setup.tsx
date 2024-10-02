import { useNavigate } from "react-router-dom";

export const Setup = () => {

    const nav = useNavigate();

    return (
        <div>
            <h1>
                Setup
            </h1>
            <button
                className="btn btn-primary"
                onClick={() => nav('/play')}
            >
                Start Playing
            </button>
        </div>
    );
};