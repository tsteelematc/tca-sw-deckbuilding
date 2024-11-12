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
            , sabotageOrBountyItemCount: 0
            , starshipsDestroyedCount: 0
            , basesDestroyedCount: 0
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
                                                    <div
                                                        className="flex flex-col gap-3"
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className="join flex">
                                                                <button className="btn btn-sm btn-outline join-item">-</button>
                                                                <span className="join-item text-xl w-8 text-center">0</span>
                                                                <button className="btn btn-sm btn-outline join-item">+</button>
                                                            </div>
                                                            <span
                                                                className="ml-1 mt-1 text-sm text-nowrap">Sabotage/bounty items</span>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <div className="join flex">
                                                                <button className="btn btn-sm btn-outline join-item">-</button>
                                                                <span className="join-item text-xl w-8 text-center">0</span>
                                                                <button className="btn btn-sm btn-outline join-item">+</button>
                                                            </div>
                                                            <span
                                                                className="ml-1 mt-1 text-sm text-nowrap">Starship(s) destroyed</span>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <div className="join flex">
                                                                <button className="btn btn-sm btn-outline join-item">-</button>
                                                                <span className="join-item text-xl w-8 text-center">0</span>
                                                                <button className="btn btn-sm btn-outline join-item">+</button>
                                                            </div>
                                                            <span
                                                                className="ml-1 mt-1 text-sm text-nowrap">Base(s) destroyed (1 max)</span>
                                                        </div>
                                                    </div>
                                                )
                                                : (
                                                    <div className="flex flex-col gap-3 text-sm">
                                                        <div>
                                                            0 Sabotage/bounty items
                                                        </div>
                                                        <div>
                                                            0 Starship(s) destroyed
                                                        </div>
                                                        <div>
                                                            0 Base(s) destroyed
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div
                        className="join mt-10 ml-auto"
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
                                    , sabotageOrBountyItemCount: 0
                                    , starshipsDestroyedCount: 0
                                    , basesDestroyedCount: 0
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
