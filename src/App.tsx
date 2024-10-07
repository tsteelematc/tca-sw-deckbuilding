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

const App = () => {

  const [numberOfGames, setNumberOfGames] = useState(3);

  const myRouter = createHashRouter(
    [
      {
        path: "/",
        element: <Home 
          numberOfGames={numberOfGames}
        />,
      },
      {
        path: "/setup",
        element: <Setup />,
      },
      {
        path: "/play",
        element: <Play
          numberOfGames={numberOfGames}
          setNumberOfGames={setNumberOfGames} 
        />,
      },    
    ]
  );

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
