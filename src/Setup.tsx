import { useNavigate } from "react-router-dom";

export const Setup = () => {

    const nav = useNavigate();

    return (
        <div
            className="prose sm:prose-2xl"
        >
            <h1
                className=""
            >
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