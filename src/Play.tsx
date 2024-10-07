import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Play = () => {

    const nav = useNavigate();

    const [numberOfGames, setNumberOfGames] = useState(3);

    return (
        <div>
            <h1
                className='text-2xl font-bold mb-3'
                onClick={() => {
                    setNumberOfGames(numberOfGames + 1);
                    console.log(numberOfGames);
                }}
            >
                Play ({numberOfGames} games played)
            </h1>
            <button
                className="btn btn-primary mb-3"
                // onClick={() => nav("/")}
                onClick={() => nav(-2)}
            >
                Game Over
            </button>
        </div>
    );
};