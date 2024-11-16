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

    //
    // React hooks...
    //

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

    //
    // Calculated state...
    //

    const playersWithDestroyedBaseTotals = currentPlayers.map(x => ({
        name: x.name
        , destroyedBaseTotal: turns 
            .filter(
                y => y.player === x.name
            )
            .map(
                y => y.basesDestroyedCount
            )
            .reduce(
                (acc, y) => acc + y
                , 0
            )
    }));

    // Blank if tied, only allow a "winning" player button to be pressed
    // if the player is winning ! ! ! i-o-g : - )
    //
    // Ugly index hard coded assumption : - (
    const leadingPlayer = playersWithDestroyedBaseTotals[0].destroyedBaseTotal > playersWithDestroyedBaseTotals[1].destroyedBaseTotal
        ? playersWithDestroyedBaseTotals[0].name
        : playersWithDestroyedBaseTotals[1].destroyedBaseTotal > playersWithDestroyedBaseTotals[0].destroyedBaseTotal
            ? playersWithDestroyedBaseTotals[1].name
            : ""
    ;

    //
    // Helper functions...
    //

    const updateSabotageOrBountyItemCount = (
        player: string
        , turnNumber: number
        , delta: number
    ) => setTurns(
        turns.map(
            x => ({
                ...x
                , sabotageOrBountyItemCount: player === x.player && turnNumber === x.turnNumber
                    ? x.sabotageOrBountyItemCount === 0 && delta < 0 
                        ? 0 
                        : x.sabotageOrBountyItemCount + delta 
                    : x.sabotageOrBountyItemCount
            })
        )
    );

    const updateStarshipsDestroyedCount = (
        player: string
        , turnNumber: number
        , delta: number
    ) => setTurns(
        turns.map(
            x => ({
                ...x
                , starshipsDestroyedCount: player === x.player && turnNumber === x.turnNumber
                    ? x.starshipsDestroyedCount === 0 && delta < 0 
                        ? 0 
                        : x.starshipsDestroyedCount + delta 
                    : x.starshipsDestroyedCount
            })
        )
    );

    const updateBasesDestroyedCount = (
        player: string
        , turnNumber: number
        , delta: number
    ) => setTurns(
        turns.map(
            x => ({
                ...x
                , basesDestroyedCount: player === x.player && turnNumber === x.turnNumber
                    ? x.basesDestroyedCount === 0 && delta < 0 
                        ? 0 
                        : x.basesDestroyedCount === 1 && delta > 0
                            ? 1
                            : x.basesDestroyedCount + delta 
                    : x.basesDestroyedCount
            })
        )
    );

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
                                                                <button 
                                                                    className="btn btn-sm btn-outline join-item"
                                                                    onClick={() => updateSabotageOrBountyItemCount(
                                                                        x.player
                                                                        , x.turnNumber
                                                                        , -1
                                                                    )}
                                                                >
                                                                    -
                                                                </button>
                                                                <span 
                                                                    className="join-item text-xl w-8 text-center"
                                                                >
                                                                    {x.sabotageOrBountyItemCount}
                                                                </span>
                                                                <button 
                                                                    className="btn btn-sm btn-outline join-item"
                                                                    onClick={() => updateSabotageOrBountyItemCount(
                                                                        x.player
                                                                        , x.turnNumber
                                                                        , +1
                                                                    )}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <span
                                                                className="ml-1 mt-1 text-sm text-nowrap">sabotage/bounty items</span>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <div className="join flex">
                                                            <button 
                                                                    className="btn btn-sm btn-outline join-item"
                                                                    onClick={() => updateStarshipsDestroyedCount(
                                                                        x.player
                                                                        , x.turnNumber
                                                                        , -1
                                                                    )}
                                                                >
                                                                    -
                                                                </button>
                                                                <span 
                                                                    className="join-item text-xl w-8 text-center"
                                                                >
                                                                    {x.starshipsDestroyedCount}
                                                                </span>
                                                                <button 
                                                                    className="btn btn-sm btn-outline join-item"
                                                                    onClick={() => updateStarshipsDestroyedCount(
                                                                        x.player
                                                                        , x.turnNumber
                                                                        , +1
                                                                    )}
                                                                >
                                                                    +
                                                                </button>

                                                            </div>
                                                            <span
                                                                className="ml-1 mt-1 text-sm text-nowrap">starship(s) destroyed</span>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <div className="join flex">
                                                            <button 
                                                                    className="btn btn-sm btn-outline join-item"
                                                                    onClick={() => updateBasesDestroyedCount(
                                                                        x.player
                                                                        , x.turnNumber
                                                                        , -1
                                                                    )}
                                                                >
                                                                    -
                                                                </button>
                                                                <span 
                                                                    className="join-item text-xl w-8 text-center"
                                                                >
                                                                    {x.basesDestroyedCount}
                                                                </span>
                                                                <button 
                                                                    className="btn btn-sm btn-outline join-item"
                                                                    onClick={() => updateBasesDestroyedCount(
                                                                        x.player
                                                                        , x.turnNumber
                                                                        , +1
                                                                    )}
                                                                >
                                                                    +
                                                                </button>

                                                            </div>
                                                            <span
                                                                className="ml-1 mt-1 text-sm text-nowrap">base(s) destroyed (1 max)</span>
                                                        </div>
                                                    </div>
                                                )
                                                : (
                                                    <div className="flex flex-col gap-3 text-sm">
                                                        <div>
                                                            {x.sabotageOrBountyItemCount} sabotage/bounty items
                                                        </div>
                                                        <div>
                                                            {x.starshipsDestroyedCount} starship(s) destroyed
                                                        </div>
                                                        <div>
                                                            {x.basesDestroyedCount} base(s) destroyed
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
                            // disabled={turns.length <= 1}
                            onClick={() => turns.length > 1 && setTurns(turns.slice(0, -1))}
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
                                <div
                                    key={x.name} 
                                    className="flex flex-col gap-3 mb-5 text-sm"
                                >
                                    <h2
                                        className="font-lg font-bold"
                                    >
                                        {x.name}
                                    </h2>
                                    <div
                                        className="ml-3"
                                    >
                                        {
                                            turns
                                                .filter(
                                                    y => y.player === x.name
                                                )
                                                .map(
                                                    y => y.sabotageOrBountyItemCount
                                                )
                                                .reduce(
                                                    (acc, y) => acc + y
                                                    , 0
                                                )
                                        } sabotage/bounty items
                                    </div>
                                    <div
                                        className="ml-3"
                                    >
                                    {
                                            turns
                                                .filter(
                                                    y => y.player === x.name
                                                )
                                                .map(
                                                    y => y.starshipsDestroyedCount
                                                )
                                                .reduce(
                                                    (acc, y) => acc + y
                                                    , 0
                                                )
                                        } starship(s) destroyed
                                    </div>
                                    <div
                                        className="ml-3"
                                    >
                                    {
                                            turns
                                                .filter(
                                                    y => y.player === x.name
                                                )
                                                .map(
                                                    y => y.basesDestroyedCount
                                                )
                                                .reduce(
                                                    (acc, y) => acc + y
                                                    , 0
                                                )
                                        } base(s) destroyed
                                    </div>
                                    <button
                                        key={x.name}
                                        className={`btn btn-lg ${x.name === leadingPlayer ? "btn-neutral" : "btn-outline"} mb-3 ml-3 flex-nowrap overflow-hidden`}
                                        onClick={() => {

                                            if (x.name !== leadingPlayer) {
                                                // Do nothing... Maybe obvious to user that player is behind ? ? ?
                                                return;
                                            }

                                            addNewGameResult({
                                                startTime: startTimeState,
                                                endTime: new Date().toISOString(),
                                                winner: x.name,
                                                winningFaction: x.faction,
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

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
