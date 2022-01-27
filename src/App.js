import { React, useState } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "./App.css";
import Login from "./Login";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Reset from "./Reset";
import CreateAccount from "./CreateAccount";
import AdminSettings from "./AdminSettings";
import AdminDashboard from "./AdminDashboard";
import NavEmpty from "./NavEmpty";

function App() {
  
  const [userAuth, setUserAuth] = useState(true);
  
  
    return (
    <Router>
      <Container className={"app"}>
        {userAuth ? <Nav /> : <NavEmpty />}
        <Switch>
            <Row>
              <Col>
                <Route exact path="/">
                  <Login userAuth={userAuth} />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/resetPassword">
                  <Reset />
                </Route>
                <Route exact path="/createAccount">
                  <CreateAccount />
                </Route>
                <Route exact path="/AdminDashboard">
                  <AdminDashboard />
                </Route>
                <Route exact path="/AdminSettings">
                  <AdminSettings />
                </Route>
                <Route exact path="/settings">
                  <Settings />
                </Route>
                <Route exact path="/adminDash">
                  <AdminDashboard />
                </Route>
                <Route exact path="/adminSettings">
                  <AdminSettings />
                </Route>
              </Col>
            </Row>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
