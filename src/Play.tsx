import { useNavigate } from "react-router-dom";
import { GameResult } from "./game-results";
import { useState } from "react";

interface PlayProps {
    addNewGameResult: (gr: GameResult) => void;
}

export const Play: React.FC<PlayProps> = ({ addNewGameResult }) => {
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
                            onClick={() => setRedOnTop(!redOnTop)}
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
                            <div className="stat-actions">
                                <button
                                    className="btn btn-md btn-outline btn-light"
                                    onClick={() => setResourceCount(resourceCount - 1)}
                                >
                                    -
                                </button>
                                <button
                                    className="btn btn-md btn-outline btn-sm mx-5"
                                    onClick={() => setResourceCount(0)}
                                >
                                    0
                                </button>
                                <button
                                    className="btn btn-md btn-outline"
                                    onClick={() => setResourceCount(resourceCount + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Damage</div>
                            <div className="stat-value text-error">{damageCount}</div>
                            <div className="stat-actions">
                                <button
                                    className="btn btn-md btn-outline"
                                    onClick={() => setDamageCount(damageCount - 1)}
                                >
                                    -
                                </button>
                                <button
                                    className="btn btn-md btn-outline btn-sm mx-5"
                                    onClick={() => setDamageCount(0)}
                                >
                                    0
                                </button>
                                <button
                                    className="btn btn-md btn-outline"
                                    onClick={() => setDamageCount(damageCount + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-primary mb-3"
                onClick={() => {
                    addNewGameResult({
                        startTime: "",
                        endTime: "",
                        winner: "Barbie",
                        players: ["Barbie", "Ken"],
                    });
                    nav(-2);
                }}
            >
                Game Over
            </button>
        </div>
    );
};
