import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SetupProps {
    previousPlayers: string[];
    setCurrentPlayers: (players: string[]) => void;
}

export const Setup: React.FC<SetupProps> = ({
    previousPlayers
    , setCurrentPlayers
}) => {
    
    const myNav = useNavigate();

    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(x => ({
            name: x 
            , checked: false
        }))
    );

    const [newPlayerName, setNewPlayerName] = useState("");

    const validateAndAddNewPlayer = () => {

        // Bail if nothing typed in the name or if there is a duplicate name...
        if (
            newPlayerName.length === 0
            || availablePlayers.some(
                x => x.name.toUpperCase() === newPlayerName.toUpperCase()
            )
        ) {
            return;
        }

        setAvailablePlayers(
            [
                ...availablePlayers
                , {
                    name: newPlayerName
                    , checked: true
                }
            ].sort(
                (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())
            )
        );

        setNewPlayerName("");
    };


    return (
        <div>
            <h1
                className='text-2xl font-bold mb-3'
            >
                Setup
            </h1>
            <button
                className="btn btn-primary mb-3"
                onClick={() => {
                    setCurrentPlayers(
                        availablePlayers
                            .filter(x => x.checked)
                            .map(x => x.name)
                    );
                    myNav("/play");
                }}
            >
                Start Playing
            </button>
            <div 
                className="card bg-base-100 shadow-xl"
            >
                <div 
                    className="card-body"
                >
                    <div 
                        className="join"
                    >
                        <input 
                            className="input input-bordered join-item" 
                            placeholder="Enter new player name"
                            value={newPlayerName} 
                            onChange={(e) => setNewPlayerName(e.target.value)}
                        />
                        <button 
                            className="btn join-item"
                            onClick={validateAndAddNewPlayer}
                        >
                            Add
                        </button>
                    </div>
                    {
                        availablePlayers.map(x => (
                            <div 
                                className="form-control"
                                key={x.name}
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
                                    </span>
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};