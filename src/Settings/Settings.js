import { React, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Settings = () => {
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
    <Container className="Settings">
      <h1>Merchant Settings</h1>
      <Row>
        <Col className="NavigationGeneralSettings">
          <Button
            className="GeneralSettingsButton"
            onClick={handleClickGeneralSettings}
          >
            <Link to="/general">User Profile</Link>
          </Button>
        </Col>
        <Col className="NavigationSecurity">
          <Button className="SecurityButton" onClick={handleClickSecurity}>
            <Link to="/security">Reset Password</Link>
          </Button>
        </Col>
        <Col className="NavigationNotification">
          <Button
            className="NotificationButton"
            onClick={handleClickNotification}
          >
            <Link to="/notifications">Notification</Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
