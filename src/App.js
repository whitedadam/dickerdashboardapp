import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import Settings from './Settings';
import AdminDashboard from "./AdminDashboard/adminDash";
import AdminSettings from "./AdminSettings/adminSettings";
import './App.css';
import {Col, Container, Row} from "reactstrap";
import Reset from "./Reset";
import CreateAccount from "./CreateAccount";

function App() {
  return (

    <Router>
      <Container className={'app'}>
                  <Row>
                    <Col xl={'auto'}><Nav /></Col>
                  </Row>
          <Switch>
              <React.Fragment>
                  <Row>
                      <Col>
                          <Route exact path='/'>
                              <Login />
                          </Route>
                          <Route exact path='/dashboard'>
                              <Dashboard />
                          </Route>
                          <Route exact path='/resetPassword'>
                              <Reset />
                          </Route>
                          <Route exact path='/createAccount'>
                              <CreateAccount />
                          </Route>
                          <Route exact path='/settings'>
                              <Settings />
                          </Route>
                          <Route exact path='/adminDash'>
                              <AdminDashboard />
                          </Route>
                          <Route exact path='/adminSettings'>
                              <AdminSettings />
                          </Route>
                      </Col>
                  </Row>
              </React.Fragment>
          </Switch>
      </Container>
    </Router>
  );

}

export default App;
