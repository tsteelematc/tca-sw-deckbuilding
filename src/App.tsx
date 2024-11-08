import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { AppTitle, Home } from "./Home";
import { Setup } from "./Setup";
import { Play } from "./Play";

import { 
  CurrentPlayer,
  GameResult 
  , getLeaderboard
  , getPreviousPlayers
  , getGeneralFacts
  , getAvgTurnsPerGame
} from "./game-results";

const dummyGameResults: GameResult[] = [
  {
      startTime: "2024-10-20T20:08:47.024Z"
      , endTime: "2024-10-20T20:23:37.024Z"
      , winner: "Tom"
      , players: [
          "Tom"
          , "Jack"
      ]
      , turns: [
          {
              turnNumber: 1
              , player: "Tom"
              , didTheThing: false
          }
          , {
              turnNumber: 1
              , player: "Jack"
              , didTheThing: false
          }
          , {
              turnNumber: 2
              , player: "Tom"
              , didTheThing: true
          }
          , {
              turnNumber: 2
              , player: "Jack"
              , didTheThing: false
          }
          , {
              turnNumber: 3
              , player: "Tom"
              , didTheThing: true
          }
          , {
              turnNumber: 3
              , player: "Jack"
              , didTheThing: false
          }
      ]
  }
  , {
      startTime: "2024-10-20T20:27:47.024Z"
      , endTime: "2024-10-20T20:33:37.024Z"
      , winner: "Jack"
      , players: [
          "Tom"
          , "Jack"
      ]
      , turns: [
          {
              turnNumber: 1
              , player: "Tom"
              , didTheThing: false
          }
          , {
              turnNumber: 1
              , player: "Jack"
              , didTheThing: true
          }
          , {
              turnNumber: 2
              , player: "Tom"
              , didTheThing: true
          }
          , {
              turnNumber: 2
              , player: "Jack"
              , didTheThing: true
          }
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

  const [title, setTitle] = useState(AppTitle);
    
  const myRouter = createHashRouter(
    [
      {
        path: "/",
        element: <Home
          leaderboardData={getLeaderboard(gameResults)}
          generalFactsData={getGeneralFacts(gameResults)} 
          setTitle={setTitle}
          avgTurnsPerGame={getAvgTurnsPerGame(gameResults)}
        />,
      },
      {
        path: "/setup",
        element: <Setup 
          previousPlayers={getPreviousPlayers(gameResults)}
          setCurrentPlayers={setCurrentPlayers}
          setTitle={setTitle}
        />,
      },
      {
        path: "/play",
        element: <Play 
          addNewGameResult={addNewGameResult}
          currentPlayers={currentPlayers}
          setTitle={setTitle}
        />,
      },
    ]
  );

  //
  // Return the JSX...
  //
  return (
    <div
      className="App"
    >
      <div 
        className="navbar bg-base-200 overflow-hidden"
      >
        <h1 
          className="text-2xl font-bold text-nowrap">
            { title }
        </h1>
      </div>
      <div className="p-3">
        <RouterProvider
          router={myRouter}
        />
      </div>      
    </div>
  );
}

export default App;
