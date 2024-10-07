import { useNavigate } from "react-router-dom";

export const Play = () => {

    const nav = useNavigate();

    var numberOfGames = 3;

    return (
        <div>
            <h1
                className='text-2xl font-bold mb-3'
                onClick={() => {
                    numberOfGames = numberOfGames + 1;
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