import { useState } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Reset from "./Reset";
import CreateAccount from "./CreateAccount";
import AdminSettings from "./AdminSettings";
import AdminDashboard from "./AdminDashboard";
import Notifications from "./Settings/Notifications";
import Security from "./Settings/Security";
import GeneralSettings from "./Settings/GeneralSettings";
import Footer from "./Footer/Footer";

function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [merchantId, setMerchantId] = useState();

  return (
    <Router>
      <Container
        className={"app"}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        {!userAuth ? (
          <Switch>
            <Route exact path="/">
              <Login
                userAuth={userAuth}
                setUserAuth={setUserAuth}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                merchantId={merchantId}
                setMerchantId={setMerchantId}
              />
            </Route>
            <Route exact path="/resetPassword">
              <Reset userAuth={userAuth} />
            </Route>
            <Route exact path="/createAccount">
              <CreateAccount />
            </Route>
          </Switch>
        ) : (
          <>
            <Switch>
              <Row>
                <Col>
                  <Route exact path="/dashboard">
                    <Dashboard merchantId={merchantId} />
                  </Route>
                  <Route exact path="/adminDashboard">
                    <AdminDashboard />
                  </Route>
                  <Route exact path="/adminSettings">
                    <AdminSettings />
                  </Route>
                  <Route exact path="/settings">
                    <Settings userAuth={userAuth} isAdmin={isAdmin} merchantId={merchantId}/>
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
                  <Route exact path="/createAccount">
                    <CreateAccount />
                  </Route>
                  <Route>
                    <Redirect to={isAdmin ? "/adminDash" : "/dashboard"} />
                  </Route>
                </Col>
              </Row>
            </Switch>
          </>
        )}
        <Row>
          <Col style={{ alignContent: "right"}}>
            <Footer />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
