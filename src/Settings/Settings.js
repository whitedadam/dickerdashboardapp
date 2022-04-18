import { React, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import {Card} from '@mui/material';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import './Settings.css';

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
      <Card style={{width: '900px', margin: 'auto', marginTop: '25px'}} sx={{boxShadow: 3}}>
        <Container className="Settings">
          <Paper
              sx={{
                boxShadow: 0,
                marginLeft: '166px',
                marginRight: 'auto',
                marginTop: '15px',
                marginBottom: '15px'
              }}
          >
            <img src={dickerLogoSquare} alt={'dicker logo'} class = "center" />
          </Paper>
          <Typography fontWeight='bold' id='loginHeader' component='h1' variant='h5'
                      align='center'>Merchant Settings
          </Typography>
      <Row>
        <Col className="NavigationGeneralSettings">
          <Button
            className="button button1"
            onClick={handleClickGeneralSettings}
            sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
            style={{height: '30px',width: '250px' }}
          >
            <Link to="/general">User Profile</Link>
          </Button>
        </Col>
        <Col className="NavigationSecurity">
          <Button className="button button2" onClick={handleClickSecurity}
                  sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
          style={{height: '30px',width: '250px' }}>
            <Link to="/security">Reset Password</Link>
          </Button>
        </Col>
        <Col className="NavigationNotification">
          <Button
            className="button button3"
            onClick={handleClickNotification}
            sx={{backgroundColor: '#d9c07c', mt: 3, mb: 2}}
            style={{height: '30px',width: '250px' }}
          >
            <Link to="/notifications">Notification</Link>
          </Button>
        </Col>
      </Row>
    </Container>
      </Card>
  );
};

export default Settings;
