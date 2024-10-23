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

    const [startTimeState, setStartTimeState] = useState(new Date().toISOString());
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Play</h1>
            <div className="card bg-base-100 shadow-xl mt-3 mb-5 overflow-hidden">
                <div className="card-body flex justify-items-center123 -m-5">
                    <h2 className="card-title">Hmm...</h2>
                    <p
                        className="text-xs"
                    >
                        Didn't like Force Tracker or Counters... 
                        <br />
                        <br />
                        Using the real game pieces was better in play testing... 
                        <br />
                        <br />
                        But will come up with something else worth tracking, stay tuned ! ! !
                    </p>

                </div>
            </div>
            <div
                className="flex flex-col"
            >
                {
                    currentPlayers.map(x => (
                        <button
                            key={x.name}
                            className="btn btn-outline mb-3 ml-3 flex-nowrap overflow-hidden"
                            onClick={() => {
                                addNewGameResult({
                                    startTime: startTimeState,
                                    endTime: new Date().toISOString(),
                                    winner: x.name,
                                    players: currentPlayers.map(y => y.name),
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
    );
};
