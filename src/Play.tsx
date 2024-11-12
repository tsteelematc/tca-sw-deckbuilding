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
                        className="card-title text-sm font-light"
                    >
                        Enter turn info after taking your turn...
                    </h2>

                    {
                        turns.map((x, i) => (
                            <div
                                className="flex gap-3 mb-3"
                                key={`${x.turnNumber}~${x.player}`}
                            >
                                <div
                                className="align-top text-2xl"
                                >
                                    {x.turnNumber}
                                </div>
                                <div
                                    className="text-2xl123"
                                >
                                    <div
                                        className="flex flex-col gap-3"
                                    >
                                        <h3 className="text-2xl font-bold123">
                                            {x.player}
                                        </h3>
                                        {
                                            turns.length - 1 === i
                                                ? (
                                                    <label
                                                        className="flex gap-3"
                                                    >
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
                                                : x.didTheThing ? "1 base destroyed" : "0 bases destroyed"
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div 
                        className="join mt-10"
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
