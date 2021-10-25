import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import Settings from './Settings';
import './App.css';
import {Col, Container, Row} from "reactstrap";

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
                          <Route exact path='/settings'>
                              <Settings />
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
