import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentPlayer, Faction } from "./game-results";

interface SetupProps {
    previousPlayers: string[];
    setCurrentPlayers: (players: CurrentPlayer[]) => void;
}

interface AvailablePlayer {
    name: string;
    checked: boolean;
    faction: Faction;
}

export const Setup: React.FC<SetupProps> = ({
    previousPlayers
    , setCurrentPlayers
}) => {
    
    const myNav = useNavigate();

    const [availablePlayers, setAvailablePlayers] = useState<AvailablePlayer[]>(
        previousPlayers.map(x => ({
            name: x 
            , checked: false
            , faction: undefined
        }))
    );

    const [newPlayerName, setNewPlayerName] = useState("");

    const validationDialogRef = useRef<HTMLDialogElement | null>(null);

    const validateAndAddNewPlayer = () => {

        // Bail if nothing typed in the name or if there is a duplicate name...
        if (
            newPlayerName.length === 0
            || availablePlayers.some(
                x => x.name.toUpperCase() === newPlayerName.toUpperCase()
            )
        ) {
            validationDialogRef.current?.showModal();
            return;
        }

        setAvailablePlayers(
            [
                ...availablePlayers
                , {
                    name: newPlayerName
                    , checked: true
                    , faction: undefined
                }
            ].sort(
                (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())
            )
        );

        setNewPlayerName("");
    };

    const twoPlayersAndFactionsChosen = 
        availablePlayers.filter(x => x.checked).length === 2
        && availablePlayers.filter(x => x.checked && x.faction).length === 2
    ;

    const setPlayerFaction = (playerName: string, faction: Faction) => setAvailablePlayers(
        availablePlayers.map(x =>({
            ...x 
            , faction: x.name === playerName 
                ? faction 
                : x.faction
        }))
    );

    return (
        <div>
            <h1
                className='text-2xl font-bold mb-3'
            >
                Setup
            </h1>
            <button
                className="btn btn-primary mb-3"
                disabled={!twoPlayersAndFactionsChosen}
                onClick={() => {
                    setCurrentPlayers(
                        availablePlayers
                            .filter(x => x.checked)
                            .map(x => ({
                                name: x.name
                                , faction: x.faction
                            })
                        )
                    );
                    myNav("/play");
                }}
            >
                {
                    !twoPlayersAndFactionsChosen
                        ? "Choose 2 players with factions below"
                        : "Start Playing"
                }
            </button>
            <div 
                className="card bg-base-100 shadow-xl overflow-hidden"
            >
                <div 
                    className="card-body overflow-hidden"
                >
                    <div 
                        className="join"
                    >
                        <input 
                            className="input input-bordered join-item w-full" 
                            placeholder="Enter new player name"
                            value={newPlayerName} 
                            onChange={(e) => setNewPlayerName(e.target.value)}
                        />
                        <button 
                            className="btn join-item"
                            disabled={newPlayerName.length === 0}
                            onClick={validateAndAddNewPlayer}
                        >
                            Add
                        </button>
                    </div>
                    {
                        availablePlayers.map(x => (
                            <div
                                key={x.name}
                            >
                                <div 
                                    className="form-control"
                                >
                                    <label 
                                        className="cursor-pointer flex mt-3"
                                    >
                                        <input 
                                            type="checkbox" 
                                            className="checkbox" 
                                            checked={x.checked}
                                            onChange={() => setAvailablePlayers(
                                                availablePlayers.map(y =>({
                                                    ...y 
                                                    , checked: y.name === x.name 
                                                        ? !y.checked 
                                                        : y.checked
                                                }))
                                            )}
                                        />
                                        <span 
                                            className="label-text ml-3"
                                        >
                                            {x.name}
                                            {
                                                x.checked && x.faction && (
                                                    <div
                                                        className={`badge badge-outline ml-3 ${x.faction === "Rebel" || x.faction === "Republic" ? 'badge-error' : 'badge-info'}`}
                                                    >
                                                        {x.faction}
                                                    </div>
                                                )

                                            }
                                        </span>
                                    </label>
                                </div>
                                {
                                    x.checked && (
                                        <div
                                            className="flex flex-col"
                                        >
                                            <div 
                                                className="join mt-3 ml-10 overflow-hidden"
                                            >
                                                <button 
                                                    className="btn btn-sm btn-outline join-item w-1/2 overflow-hidden flex-nowrap"
                                                    onClick={() => setPlayerFaction(x.name, "Empire")}
                                                >
                                                    <span
                                                        className="text-info"
                                                    >
                                                         ●
                                                    </span>
                                                    Empire
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline join-item w-1/2 overflow-hidden flex-nowrap"
                                                    onClick={() => setPlayerFaction(x.name, "Rebel")}
                                                >
                                                    <span
                                                        className="text-error"
                                                    >
                                                         ●
                                                    </span>
                                                    Rebel
                                                </button>
                                            </div>
                                            <div 
                                                className="join mt-3 ml-10 overflow-hidden"
                                            >
                                                <button 
                                                    className="btn btn-sm btn-outline join-item w-1/2 overflow-hidden flex-nowrap"
                                                    onClick={() => setPlayerFaction(x.name, "Separatist")}
                                                >
                                                    <span
                                                        className="text-info"
                                                    >
                                                         ●
                                                    </span>                                                    
                                                    Separatist
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline join-item w-1/2 overflow-hidden flex-nowrap"
                                                    onClick={() => setPlayerFaction(x.name, "Republic")}
                                                >
                                                    <span
                                                        className="text-error"
                                                    >
                                                         ●
                                                    </span>                                                    
                                                    Republic
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }                                
                            </div>
                        ))
                    }
                </div>
            </div>
            <dialog
                ref={validationDialogRef} 
                className="modal"
            >
                <div 
                    className="modal-box"
                >
                    <form 
                        method="dialog"
                    >
                        <button 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                        </button>
                    </form>
                    <h3 
                        className="font-bold text-lg"
                    >
                        Duplicate player name...
                    </h3>
                    <p 
                        className="py-4"
                    >
                        Choose this player below if it is the same {newPlayerName}, otherwise make it unique, maybe 'Cheating {newPlayerName}' : - O
                    </p>
                </div>
            </dialog>
        </div>
    );
};