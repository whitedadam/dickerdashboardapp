import React from "react";
import {Switch, Router, Route} from 'react-router-dom'
import Login from "./Login";
import Nav from "./Nav";
import './App.css';
import Dashboard from "./Dashboard";

function App() {
  return (
      <div>
          <div className={'navContainer'}>
            <Nav />
          </div>
        <Login/>
          <div className={'dashboardContainer'}>
              <Dashboard/>
          </div>
      </div>
  )
}

export default App;
