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
                        Enter turn info after taking your turn...
                    </h2>
                    <table
                        className="table table-auto"
                    >
                        <thead>
                            <tr>
                                <th>
                                    Turn #
                                </th>
                                <th>
                                    Turn Info
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                turns.map((x, i) => (
                                    <tr
                                        key={`${x.turnNumber}~${x.player}`}
                                    >
                                        <td
                                        className="align-top"
                                        >
                                            {x.turnNumber}
                                        </td>
                                        <td
                                            className="text-center123"
                                        >
                                            <div
                                                className="flex flex-col gap-3"
                                            >
                                                <h3 className="text-md font-bold">
                                                    {x.player}
                                                </h3>
                                                {
                                                    turns.length - 1 === i
                                                        ? (
                                                            <label>
                                                                <input 
                                                                    type="checkbox" 
                                                                    className="checkbox" 
                                                                    checked={x.didTheThing}
                                                                    onChange={() => setTurns(
                                                                        turns.map((y, i) =>({
                                                                            ...y 
                                                                            , didTheThing: turns.length - 1 === i
                                                                                ? !y.didTheThing 
                                                                                : y.didTheThing
                                                                        }))
                                                                    )}
                                                                />
                                                                Detroyed a base                                                                
                                                            </label>
                                                        )
                                                        : x.didTheThing ? "1" : "0"
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td></td>
                                <td></td>
                                <td
                                    className="text-center"
                                >
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
                                                    , player: currentPlayers[
                                                        turns.length % currentPlayers.length
                                                    ].name
                                                    , didTheThing: false
                                                }
                                            ])}
                                        >
                                            Next &gt;
                                        </button>
                                    </div>                                    
                                </td>
                            </tr>
                            <tr
                                className="font-bold"
                            >
                                <td
                                    className="align-top"
                                >
                                    Totals
                                </td>
                                <td
                                    className="ml-auto bg-error"
                                >
                                    {
                                        currentPlayers.map(x =>(
                                            <div>
                                                <div>
                                                    {x.name}
                                                </div>
                                                <div>
                                                    0 / 0 / 0 (bases / starships / bounties)    
                                                </div>
                                            </div>
                                        ))
                                    }
                                </td>
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
                                            turns: turns
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
