import { React, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Settings.css";
import AccountMenu from "../AccountMenu/AccountMenu";

const Settings = ({ userAuth, isAdmin, setUserAuth, setIsAdmin, userId }) => {
  const [modules, setModules] = useState({
    userOption: "none",
    isGeneralSetting: false,
    isSecurity: false,
    isNotification: false,
    resetHidden: true,
    isToggleOn: false,
    isAllowDataOn: false,
  });

  const handleClickGeneralSettings = () => {
    setModules({
      ...modules,
      userOption: "General Setting",
      isGeneralSetting: true,
    });
  };

  const handleClickSecurity = () => {
    setModules({
      ...modules,
      userOption: "Security",
      isSecurity: true,
      resetHidden: !modules.resetHidden,
    });
  };

  const handleClickNotification = () => {
    setModules({
      ...modules,
      userOption: "Notification",
      isNotification: true,
    });
  };

  return (
    <>
      {/* Page Heading */}
      <Row>
        <Col sm={10} style={{ margin: "auto", display: "inline-flex" }}>
          <img
            src={dickerLogoSquare}
            alt={"dicker logo"}
            style={{
              height: "35px",
              width: "35px",
              "margin-right": "5px",
            }}
          />
          <h3>Settings</h3>
        </Col>
        <Col sm={2}>
          <AccountMenu
            userAuth={userAuth}
            isAdmin={isAdmin}
            setUserAuth={setUserAuth}
            setIsAdmin={setIsAdmin}
          />
        </Col>
      </Row>
      {/* Merchant Settings Card */}
      <Card
        style={{ width: "900px", margin: "auto", marginTop: "25px" }}
        sx={{ boxShadow: 3 }}
      >
        <Container className="Settings">
          <Paper
            sx={{
              boxShadow: 0,
              marginLeft: "166px",
              marginRight: "auto",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <img src={dickerLogoSquare} alt={"dicker logo"} class="center" />
          </Paper>
          <Typography
            fontWeight="bold"
            id="loginHeader"
            component="h1"
            variant="h5"
            align="center"
          >
            Merchant Settings
          </Typography>
          <Row>
            <Col className="NavigationGeneralSettings">
              <Button
                className="button button1"
                onClick={handleClickGeneralSettings}
                sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
                style={{ height: "30px", width: "250px", color: "black" }}
              >
                <Link to="/general">User Profile</Link>
              </Button>
            </Col>
            <Col className="NavigationSecurity">
              <Button
                className="button button2"
                onClick={handleClickSecurity}
                sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
                style={{ height: "30px", width: "250px", color: "black" }}
              >
                <Link to="/security">Reset Password</Link>
              </Button>
            </Col>
            <Col className="NavigationNotification">
              <Button
                className="button button3"
                onClick={handleClickNotification}
                sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
                style={{ height: "30px", width: "250px", color: "black" }}
              >
                <Link to="/notifications">Notification</Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
      {/* Return to Dashboard Card */}
      <Card
        style={{
          margin: "25px auto auto",
          display: "table",
          padding: "inherit",
        }}
        sx={{ boxShadow: 3 }}
      >
        <Button
          component={Link}
          to="/dashboard"
          className="button button1"
          sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
          style={{
            height: "30px",
            width: "250px",
            margin: "auto",
            color: "black",
          }}
        >
          Return to Dashboard
        </Button>
      </Card>
    </>
  );
};

export default Settings;
