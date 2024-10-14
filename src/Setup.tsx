import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SetupProps {
    previousPlayers: string[];
}

export const Setup: React.FC<SetupProps> = ({previousPlayers}) => {
    
    const myNav = useNavigate();

    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(x => ({
            name: x 
            , checked: false
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
                onClick={() => myNav("/play")}
            >
                Start Playing
            </button>
            <div 
                className="card bg-base-100 shadow-xl"
            >
                <div 
                    className="card-body"
                >
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