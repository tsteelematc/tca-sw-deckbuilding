import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import {Home} from "./Home";

// const Home = () => (
//   <div>
//     Hello From Func Component ! ! !
//   </div>  
// );

const router = createHashRouter(
  [
    {
      path: '/'
      // , element: <div>Hello ! ! !</div>
      , element: <Home />
    }
    , {
      path: '/setup'
      , element: <h1>Setup</h1>
    }
    , {
      path: '/play'
      , element: <h1>Play</h1>
    }
  ]
);

function App() {
  return (
    <div
      className="App p-3"
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
