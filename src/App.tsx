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
              , startTime: ""
              , endTime: ""
              , didTheThing: false // true and up again ! ! !
          }
          , {
              turnNumber: 1
              , player: "Jack"
              , startTime: ""
              , endTime: ""
              , didTheThing: false
          }
          , {
              turnNumber: 2
              , player: "Tom"
              , startTime: ""
              , endTime: ""
              , didTheThing: true
          }
          , {
              turnNumber: 2
              , player: "Jack"
              , startTime: ""
              , endTime: ""
              , didTheThing: false
          }
          , {
              turnNumber: 3
              , player: "Tom"
              , startTime: ""
              , endTime: ""
              , didTheThing: true
          }
          , {
              turnNumber: 3
              , player: "Jack"
              , startTime: ""
              , endTime: ""
              , didTheThing: false
          }
      ]
  }
  , {
      startTime: "2024-10-20T20:25:47.024Z"
      , endTime: "2024-10-20T20:35:37.024Z"
      , winner: "Tom"
      , players: [
          "Tom"
          , "Jack"
      ]
      , turns: [
          {
              turnNumber: 1
              , player: "Tom"
              , startTime: ""
              , endTime: ""
              , didTheThing: false // true and see avg go up
          }
          , {
              turnNumber: 1
              , player: "Jack"
              , startTime: ""
              , endTime: ""
              , didTheThing: false // true and see avg not change
          }
          , {
              turnNumber: 2
              , player: "Tom"
              , startTime: ""
              , endTime: ""
              , didTheThing: true
          }
          , {
              turnNumber: 2
              , player: "Jack"
              , startTime: ""
              , endTime: ""
              , didTheThing: false
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
          currentPlayers={[...currentPlayers, {name: "Biggie", faction: "Empire"}]}
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
        {
          title === AppTitle && (
            <span className="badge badge-xs ml-1 mb-3 p-3 text-nowrap">
              COMPANION APP
            </span>
          )
        }
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
