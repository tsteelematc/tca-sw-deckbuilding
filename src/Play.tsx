import { useNavigate } from "react-router-dom";
import { CurrentPlayer, Faction, GameResult } from "./game-results";
import { useState } from "react";

interface PlayProps {
    addNewGameResult: (gr: GameResult) => void;
    currentPlayers: CurrentPlayer[];
}

export const Play: React.FC<PlayProps> = ({ 
    addNewGameResult 
    , currentPlayers
}) => {

    const nav = useNavigate();
    const [selectedForceTrackPosition, setSelectedForceTrackPosition] =
        useState(7);
    const [redOnTop, setRedOnTop] = useState(true);
    const [resourceCount, setResourceCount] = useState(0);
    const [damageCount, setDamageCount] = useState(0);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Play</h1>
            <div className="card bg-base-100 shadow-xl mt-3 mb-5 overflow-hidden">
                <div className="card-body flex justify-items-center123 -m-5">
                    <div className="flex items-center text-nowrap">
                        <h2 className="card-title">Force Tracker</h2>
                        <button
                            className="btn btn-outline btn-xs ml-3"
                            onClick={() => {
                                setRedOnTop(!redOnTop);
                                setSelectedForceTrackPosition(
                                    selectedForceTrackPosition > 4
                                        ? 7 - selectedForceTrackPosition + 1
                                        : selectedForceTrackPosition < 4
                                            ? 7 - selectedForceTrackPosition + 1
                                            : 4
                                );
                            }}
                        >
                            Swap Colors
                        </button>
                    </div>
                    <div className="flex flex-auto justify-center md:justify-start">
                        <div className="flex flex-col items-center">
                            <p className={`${selectedForceTrackPosition === 1 ? 'font-semibold' : 'font-thin'} mr-40`}>+1 Resource</p>
                            <div className="flex flex-col">
                                <ul className="steps mr-20">
                                    <li
                                        className={`step ${redOnTop ? "step-error" : "step-info"}`}
                                        data-content={selectedForceTrackPosition === 1 ? "●" : ""}
                                        onClick={() => setSelectedForceTrackPosition(1)}
                                    />
                                    <li
                                        className={`step ${redOnTop ? "step-error" : "step-info"}`}
                                        data-content={selectedForceTrackPosition === 2 ? "●" : ""}
                                        onClick={() => setSelectedForceTrackPosition(2)}
                                    />
                                    <li
                                        className={`step ${redOnTop ? "step-error" : "step-info"}`}
                                        data-content={selectedForceTrackPosition === 3 ? "●" : ""}
                                        onClick={() => setSelectedForceTrackPosition(3)}
                                    />
                                </ul>
                                <ul className="steps">
                                    <li
                                        className="step"
                                        data-content={selectedForceTrackPosition === 4 ? "●" : ""}
                                        onClick={() => setSelectedForceTrackPosition(4)}
                                    />
                                </ul>
                                <ul className="steps ml-20">
                                    <li
                                        className={`step ${!redOnTop ? "step-error" : "step-info"}`}
                                        data-content={selectedForceTrackPosition === 5 ? "●" : ""}
                                        onClick={() => setSelectedForceTrackPosition(5)}
                                    />
                                    <li
                                        className={`step ${!redOnTop ? "step-error" : "step-info"}`}
                                        data-content={selectedForceTrackPosition === 6 ? "●" : ""}
                                        onClick={() => setSelectedForceTrackPosition(6)}
                                    />
                                    <li
                                        className={`step ${!redOnTop ? "step-error" : "step-info"}`}
                                        data-content={selectedForceTrackPosition === 7 ? "●" : ""}
                                        onClick={() => setSelectedForceTrackPosition(7)}
                                    />
                                </ul>
                            </div>
                            <p className={`${selectedForceTrackPosition === 7 ? 'font-semibold' : 'font-thin'} ml-40`}>+1 Resource</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl mt-3 mb-5 overflow-hidden">
                <div className="card-body flex justify-items-center123 -m-5">
                    <h2 className="card-title text-nowrap">Turn Counters</h2>
                    <div className="stats stats-vertical bg-base-200">
                        <div className="stat">
                            <div className="stat-title">Resources</div>
                            <div className="stat-value text-success">{resourceCount}</div>
                            <div className="stat-actions flex align-center">
                                <button
                                    className="btn btn-md btn-outline btn-light"
                                    onClick={() => setResourceCount(resourceCount - 1)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    className="btn btn-md btn-outline btn-md mx-5 font-light"
                                    onClick={() => setResourceCount(0)}
                                >
                                    Clear
                                </button>
                                <button
                                    className="btn btn-md btn-outline"
                                    onClick={() => setResourceCount(resourceCount + 1)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Damage</div>
                            <div className="stat-value text-error">{damageCount}</div>
                            <div className="stat-actions flex align-center">
                                <button
                                    className="btn btn-md btn-outline"
                                    onClick={() => setDamageCount(damageCount - 1)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                    </svg>

                                </button>
                                <button
                                    className="btn btn-md btn-outline btn-md mx-5 font-light"
                                    onClick={() => setDamageCount(0)}
                                >
                                    Clear
                                </button>
                                <button
                                    className="btn btn-md btn-outline"
                                    onClick={() => setDamageCount(damageCount + 1)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                currentPlayers.map(x => (
                    <button
                        key={x.name}
                        className="btn btn-primary mb-3 ml-3"
                        onClick={() => {
                            addNewGameResult({
                                startTime: "",
                                endTime: "",
                                winner: x.name,
                                players: currentPlayers.map(y => y.name),
                            });
                            nav(-2);
                        }}
                    >
                        {x.name} ({x.faction}) Won
                    </button>
                ))
            }
        </div>
    );
};
