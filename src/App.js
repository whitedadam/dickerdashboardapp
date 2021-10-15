import React from "react";
import {Switch, Router, Route} from 'react-router-dom'
import Login from "./Login";
import Nav from "./Nav";
import './App.css';
import Dashboard from "./Dashboard";

function App() {
  return (
      <div className={'appContainer'}>
          <div className={'navContainer'}>
            <Nav />
          </div>
          <div className={'loginContainer'}>
            <Login/>
          </div>
          <div className={'dashboardContainer'}>
            <Dashboard/>
          </div>
      </div>
  )
}

export default App;
