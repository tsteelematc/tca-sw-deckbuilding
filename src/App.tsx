import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from "./Home";
import { Setup } from "./Setup";
import { Play } from "./Play";

import { 
  CurrentPlayer,
  GameResult 
  , getLeaderboard
  , getPreviousPlayers
} from "./game-results";

const dummyGameResults: GameResult[] = [
  {
    startTime: "2024-09-23T15:36:25.123Z"
    , endTime: "2024-09-23T15:46:25.123Z"
    , winner: "Chris B"
    , players: [
      "Chris B"
      , "Caden J"
      , "Peter B"
      , "Swastik A"
      , "Tom"
    ]
  }
  , {
    startTime: "2024-09-23T15:48:25.123Z"
    , endTime: "2024-09-23T15:50:25.123Z"
    , winner: "Tom"
    , players: [
      "Harry"
      , "Hermione"
      , "Ron"
      , "Tom"
    ]
  }
  , {
    startTime: ""
    , endTime: ""
    , winner: "Harry"
    , players: [
      "Harry"
      , "Chris B"
      , "Tom"
    ]
  }
  , {
    startTime: ""
    , endTime: ""
    , winner: "Tom"
    , players: [
      "Tom"
      , "Jack"
    ]
  }
];

const App = () => {

  //
  // React hooks first...
  //
  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [currentPlayers, setCurrentPlayers] = useState<CurrentPlayer[]>([]);
  //
  // Other code... Calculated state...
  //
  const addNewGameResult = (newResult: GameResult) => setGameResults([
    ...gameResults 
    , newResult
  ]);
    
  const myRouter = createHashRouter(
    [
      {
        path: "/",
        element: <Home
          leaderboardData={getLeaderboard(gameResults)} 
        />,
      },
      {
        path: "/setup",
        element: <Setup 
          previousPlayers={getPreviousPlayers(gameResults)}
          setCurrentPlayers={setCurrentPlayers}
        />,
      },
      {
        path: "/play",
        element: <Play 
          addNewGameResult={addNewGameResult}
          currentPlayers={currentPlayers}
        />,
      },
    ]
  );

  //
  // Return the JSX...
  //
  return (
    <div
      className="App p-3"
    >
      <RouterProvider
        router={myRouter}
      />
    </div>
  );
}

export default App;
