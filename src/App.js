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

function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log({ userAuth });

  // if (!userAuth) {
  //   return (
  //     <Login
  //       userAuth={userAuth}
  //       setUserAuth={setUserAuth}
  //       isAdmin={isAdmin}
  //       setIsAdmin={setIsAdmin}
  //     />
  //   );
  // }

  return (
    <Router>
      <Container className={"app"}>
        {userAuth ? (
          <>
            <Nav userAuth={userAuth} isAdmin={isAdmin} setUserAuth={setUserAuth} setIsAdmin={setIsAdmin}/>
            <Switch>
              <Row>
                <Col>
                  {/* <Route exact path="/">
                  <Login
                    userAuth={userAuth}
                    setUserAuth={setUserAuth}
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                  />
                </Route> */}
                  {/*function*/}
                  <Route exact path="/dashboard">
                    <Dashboard /> {/*function*/}
                  </Route>
                  <Route exact path="/resetPassword">
                    <Reset /> {/*function*/}
                  </Route>
                  <Route exact path="/createAccount">
                    <CreateAccount /> {/*function*/}
                  </Route>
                  <Route exact path="/adminDashboard">
                    <AdminDashboard /> {/*function*/}
                  </Route>
                  <Route exact path="/adminSettings">
                    <AdminSettings /> {/*function*/}
                  </Route>
                  <Route exact path="/settings">
                    <Settings userAuth={userAuth} isAdmin={isAdmin} />{" "}
                    {/*function*/}
                  </Route>
                  <Route exact path="/adminDash">
                    <AdminDashboard /> {/*function*/}
                  </Route>
                  <Route exact path="/adminSettings">
                    <AdminSettings /> {/*function*/}
                  </Route>
                  <Route exact path="/security">
                    <Security /> {/*function*/}
                  </Route>
                  <Route exact path="/notifications">
                    <Notifications /> {/*function*/}
                  </Route>
                  <Route exact path="/general">
                    <GeneralSettings /> {/*function*/}
                  </Route>
                  <Route>
                    <Redirect to="/dashboard" />
                  </Route>
                </Col>
              </Row>
            </Switch>
          </>
        ) : (
          <Login
            userAuth={userAuth}
            setUserAuth={setUserAuth}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        )}
      </Container>
    </Router>
  );
}

export default App;
