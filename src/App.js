import { React, useState } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
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
import GeneralSettings from "./Settings/GeneralSettings";
import NewPasswordPage from "./Settings/NewPasswordPage";

function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // console.log({ userAuth });

  return (
    <Router>
      <Container className={"app"}>
        {userAuth ? (
          <>
            <Nav userAuth={userAuth} isAdmin={isAdmin} setUserAuth={setUserAuth} setIsAdmin={setIsAdmin}/>
            <Switch>
              <Row>
                <Col>                  
                  <Route exact path="/dashboard">
                    <Dashboard /> 
                  </Route>
                  <Route exact path="/adminDashboard">
                    <AdminDashboard /> 
                  </Route>
                  <Route exact path="/adminSettings">
                    <AdminSettings /> 
                  </Route>
                  <Route exact path="/settings">
                    <Settings userAuth={userAuth} isAdmin={isAdmin} />
                  </Route>
                  <Route exact path="/adminDash">
                    <AdminDashboard /> 
                  </Route>
                  <Route exact path="/security">
                    <Security /> 
                  </Route>
                  <Route exact path="/notifications">
                    <Notifications /> 
                  </Route>
                  <Route exact path="/general">
                    <GeneralSettings /> 
                  </Route>
                  <Route>
                    <Redirect to={isAdmin ? "/adminDash" : "/dashboard"} />
                  </Route>
                </Col>
              </Row>
            </Switch>
          </>
        ) : (

            <Switch>
              <Route exact path="/">
                <Login
                  userAuth={userAuth}
                  setUserAuth={setUserAuth}
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                />
              </Route>
              <Route exact path="/resetPassword">
                <Reset/>
              </Route>
              <Route exact path="/createAccount">
                <CreateAccount/>
              </Route>
            </Switch>
        )}
      </Container>
    </Router>
  );
}

export default App;
