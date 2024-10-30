import { useNavigate } from "react-router-dom";
import { CurrentPlayer, Faction, GameResult } from "./game-results";
import { useEffect, useState } from "react";

interface PlayProps {
    addNewGameResult: (gr: GameResult) => void;
    currentPlayers: CurrentPlayer[];
    setTitle: (t: string) => void;
}

export const Play: React.FC<PlayProps> = ({
    addNewGameResult
    , currentPlayers
    , setTitle
}) => {

    useEffect(
        () => setTitle("Play")
        , []
    );    

    const nav = useNavigate();

    const [startTimeState, setStartTimeState] = useState(new Date().toISOString());

    return (
        <div>
            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title text-sm"
                    >
                        Enter starships and bases destroyed each turn...
                    </h2>
                    <table
                        className="table"
                    >
                        <thead
                            className="text-lg"
                        >
                            <tr>
                                <th>
                                    Turn
                                </th>
                                {
                                    currentPlayers.map(x => (
                                        <th
                                            key={x.name}
                                            className="text-center"
                                        >
                                            {x.name}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody
                            className="text-3xl"
                        >
                            <tr>
                                <td>1</td>
                                <td>
                                    <div className="flex flex-col text-center">
                                        <p>0</p>
                                        <p>0</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col text-center">
                                        <p>0</p>
                                        <p>0</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className="flex flex-col text-center">
                                        <p>0</p>
                                        <p>0</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col sm:w-48 bg-error">
                                        <div className="flex items-center join">
                                            <button
                                                className="btn btn-xs btn-outline join-item"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <p
                                                className="text-xl join-item text-center"
                                            >0</p>
                                            <button
                                                className="btn btn-xs btn-outline join-item"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-3 mt-3 join">
                                            <button
                                                className="btn btn-xs btn-outline join-item"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <p
                                                className="text-xl join-item text-center"
                                            >0</p>
                                            <button
                                                className="btn btn-xs btn-outline join-item"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex join mt-3">
                                            <button className="btn btn-outline btn-sm join-item">
                                                &lt;
                                            </button>
                                            <button className="btn btn-outline btn-sm join-item grow">
                                                Next &gt;
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                className="text-lg text-neutral-content text-center"
                            >
                                <th>
                                    Totals
                                </th>
                                <th>
                                    0 <br /> 0
                                </th>
                                <th>
                                    0 <br /> 0
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className="card bg-base-100 shadow-xl mb-3"
            >
                <div
                    className="card-body p-3 overflow-x-hidden"
                >
                    <h2
                        className="card-title"
                    >
                        Game Over
                    </h2>

                    <div
                        className="flex flex-col"
                    >
                        {
                            currentPlayers.map(x => (
                                <button
                                    key={x.name}
                                    className="btn btn-lg btn-outline mb-3 ml-3 flex-nowrap overflow-hidden"
                                    onClick={() => {
                                        addNewGameResult({
                                            startTime: startTimeState,
                                            endTime: new Date().toISOString(),
                                            winner: x.name,
                                            players: currentPlayers.map(y => y.name),
                                            turns: []
                                        });
                                        nav(-2);
                                    }}
                                >
                                    <div
                                        className="text-nowrap"
                                    >
                                        {x.name} Won
                                    </div>
                                    <div
                                        className={`badge badge-outline ${x.faction === "Rebel" || x.faction === "Republic" ? 'badge-error' : 'badge-info'}`}
                                    >
                                        {x.faction}
                                    </div>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
