import { React, useState } from "react";
import { Button, Col, Container, Form, Row } from "reactstrap";

const Notifications = () => {
  const [modules, setModules] = useState({
    isToggleOn: false,
    isAllowPushOn: false
  });
  
  const handleClickAllowNotification = () => {
    setModules(
      {...modules, isToggleOn: !modules.isToggleOn}
    );
  };

  const handleClickAllowPush = () => {
    setModules(
      {...modules, isAllowPushOn: !modules.isAllowPushOn}
    );
  };

  return (
    <Container className={"notificationOption"}>
      <Form id="notificationOptions">
        <Col>
          <Row>
            <h1>Notification Options</h1>
          </Row>
          <Row>
            <body>
              <br />
              <small>
                Do you want to allow emails to be sent directly to you?
              </small>
              <Button
                onClick={handleClickAllowNotification}
                color={modules.isToggleOn ? "success" : "secondary"}
              >
                {modules.isToggleOn ? "ON" : "OFF"}
              </Button>
              <br />
            </body>
          </Row>
          <Row>
            <body>
              <br />
              <small>
                Do you want to turn on push notifications from Dicker Dashboard?
              </small>
              <Button
                onClick={handleClickAllowPush}
                color={modules.isAllowPushOn ? "success" : "secondary"}
              >
                {modules.isAllowPushOn ? "ON" : "OFF"}
              </Button>
            </body>
          </Row>
        </Col>
      </Form>
    </Container>
  );
};

export default Notifications;
