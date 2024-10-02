import { useNavigate } from "react-router-dom";

export const Play = () => {

    const nav = useNavigate();

    return (
        <div>
            <h1>
                Play and Collect Data
            </h1>
            <button
                className="btn btn-primary"
                // onClick={() => nav('/')}
                onClick={() => nav(-2)}
            >
                Game Over
            </button>
        </div>
    );
};