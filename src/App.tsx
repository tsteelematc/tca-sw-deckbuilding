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

  const [darkMode, setDarkMode] = useState(false);
    
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
      data-theme={darkMode ? "dark" : "light"}
    >
      <div 
        className="navbar bg-base-200 overflow-hidden flex flex-row"
      >
        <h1 
          className="text-2xl font-bold text-nowrap">
            { title }
        </h1>
        <label 
          className="swap swap-rotate ml-auto"
        >
          <input 
            type="checkbox"
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)}
          />
          <svg
            className="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
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
