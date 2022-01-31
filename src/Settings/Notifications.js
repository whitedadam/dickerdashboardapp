import React from "react";
import { Button, Col, Container, Form, Row } from "reactstrap";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      form: {
        email: "",
        password: "",
      },
      userOption: "none",
      isGeneralSetting: false,
      isSecurity: false,
      isNotification: false,
      resetHidden: true,
      isToggleOn: false,
      isAllowPushOn: false,
      users: {
        admin: {
          id: 1,
          email: "admin@dicker.com",
          password: "admin",
          name: "Admin",
          phoneNumber: "(904)-456-3452",
          loginAttempts: 0,
          lockoutEnabled: false,
          isAdmin: true,
          allowEmail: "allowing",
          allowData: "not allowing",
        },
        merchant: {
          id: 2,
          email: "firstcheck@lastcheck.test",
          password: "12345",
          name: "Bob",
          phoneNumber: "(904)-675-6234",
          loginAttempts: 0,
          lockoutEnabled: false,
          isAdmin: false,
          allowEmail: "not allowing",
          allowData: "allowing",
        },
      },
    };

    this.handleClickAllowNotification =
      this.handleClickAllowNotification.bind(this);
    this.handleClickAllowPush = this.handleClickAllowPush.bind(this);
  }
  handleClickAllowNotification() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  handleClickAllowPush() {
    this.setState((state) => ({
      isAllowPushOn: !state.isAllowPushOn,
    }));
  }

  render() {
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
                  onClick={this.handleClickAllowNotification}
                  color={this.state.isToggleOn ? "success" : "secondary"}
                >
                  {this.state.isToggleOn ? "ON" : "OFF"}
                </Button>
                <br />
              </body>
            </Row>
            <Row>
              <body>
                <br />
                <small>
                  Do you want to turn on push notifications from Dicker
                  Dashboard?
                </small>
                <Button
                  onClick={this.handleClickAllowPush}
                  color={this.state.isAllowPushOn ? "success" : "secondary"}
                >
                  {this.state.isAllowPushOn ? "ON" : "OFF"}
                </Button>
              </body>
            </Row>
          </Col>
        </Form>
      </Container>
    );
  }
}

export default Notifications;
