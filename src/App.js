import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import Settings from './Settings';
import './App.css';

function App() {
  return (

    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/dashboard'>
          <Dashboard />
        </Route>
        <Route exact path='/settings'>
          <Settings />
        </Route>
      </Switch>
    </Router>
  );

}

export default App;
