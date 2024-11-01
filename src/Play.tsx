import { useNavigate } from "react-router-dom";
import { CurrentPlayer, Faction, GameResult, Turn } from "./game-results";
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

    const [turns, setTurns] = useState<Turn[]>([
        {
            turnNumber: 1 
            , player: currentPlayers[0].name
            , startTime: ""
            , endTime: ""
            , didTheThing: false
        }
        , {
            turnNumber: 1 
            , player: currentPlayers[1].name
            , startTime: ""
            , endTime: ""
            , didTheThing: false
        }
    ]);

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
                        Enter turn info as you play...
                    </h2>
                    <table
                        className="table"
                    >
                        <thead>
                            <tr>
                                <th>
                                    Turn #
                                </th>
                                <th>
                                    Player
                                </th>
                                <th>
                                    Did the thing?
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                turns.map((x, i) => (
                                    <tr
                                        key={`${x.turnNumber}~${x.player}`}
                                    >
                                        <td>{x.turnNumber}</td>
                                        <td>{x.player}</td>
                                        <td>
                                            {
                                                turns.length - 1 === i
                                                    ? (
                                                        <label 
                                                            className="cursor-pointer flex"
                                                        >
                                                            <input 
                                                                type="checkbox" 
                                                                className="checkbox" 
                                                                checked={x.didTheThing}
                                                                // onChange={() => setAvailablePlayers(
                                                                //     availablePlayers.map(y =>({
                                                                //         ...y 
                                                                //         , checked: y.name === x.name 
                                                                //             ? !y.checked 
                                                                //             : y.checked
                                                                //     }))
                                                                // )}
                                                            />
                                                        </label>
                                                    )
                                                    : x.didTheThing ? "Yes" : "No"
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div 
                        className="join"
                    >
                        <button
                            className="join-item btn btn-outline btn-sm"
                            disabled={turns.length <= 1}
                            onClick={() => setTurns(turns.slice(0, -1))}
                            // onClick={() => setTurns(turns.filter((x, i) => i < turns.length))}
                        >
                            &lt;
                        </button>
                        <button
                            className="join-item btn btn-outline btn-sm"
                            onClick={() => setTurns([
                                ...turns 
                                , {
                                    turnNumber: turns.length % currentPlayers.length > 0
                                        ? Math.ceil(turns.length / currentPlayers.length)
                                        : (turns.length / currentPlayers.length) + 1
                                    , startTime: ""
                                    , endTime: ""
                                    , player: currentPlayers[
                                        turns.length % currentPlayers.length
                                    ].name
                                    , didTheThing: true
                                }
                            ])}
                        >
                            Next &gt;
                        </button>
                    </div>
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
