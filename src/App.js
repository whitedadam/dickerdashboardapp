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
import Notifications from "./Settings/Notifications";
import Security from "./Settings/Security";
import NavEmpty from "./NavEmpty";
import GeneralSettings from "./Settings/GeneralSettings";

function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <Container className={"app"}>
        <Nav userAuth={userAuth} isAdmin={isAdmin} />
        <Switch>
          <Row>
            <Col>
              <Route exact path="/">
                <Login
                  userAuth={userAuth}
                  setUserAuth={setUserAuth}
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                />
                {/*function*/}
              </Route>
              <Route exact path="/dashboard">
                <Dashboard /> {/*function*/}
              </Route>
              <Route exact path="/resetPassword">
                <Reset /> {/*function*/}
              </Route>
              <Route exact path="/createAccount">
                <CreateAccount /> {/*function*/}
              </Route>
              <Route exact path="/AdminDashboard">
                <AdminDashboard /> {/*function*/}
              </Route>
              <Route exact path="/AdminSettings">
                <AdminSettings /> {/*function*/}
              </Route>
              <Route exact path="/Settings">
                <Settings userAuth={userAuth} isAdmin={isAdmin} />{" "}
                {/*function*/}
              </Route>
              <Route exact path="/AdminDash">
                <AdminDashboard /> {/*function*/}
              </Route>
              <Route exact path="/AdminSettings">
                <AdminSettings /> {/*function*/}
              </Route>
              <Route exact path="/Security">
                <Security /> {/*function*/}
              </Route>
              <Route exact path="/Notifications">
                <Notifications /> {/*function*/}
              </Route>
              <Route exact path="/General">
                <GeneralSettings /> {/*function*/}
              </Route>
            </Col>
          </Row>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
