import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";
import React from "react";
import CreateAccount from "../CreateAccount";

class Security extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: "secondary",
    };

    this.onHover = this.onHover.bind(this);
    this.onHoverLeave = this.onHoverLeave.bind(this);
  }

  onHover() {
    this.setState((state) => ({
      buttonColor: "primary"
    }));
  }

  onHoverLeave() {
    this.setState((state) => ({
      buttonColor: "secondary"
    }));
  }

  render() {
    return (
      <Container className={"accountContainer"}>
        <Form id="emailResetForm">
          <Col>
            <h1>
              <small>Reset Password</small>
            </h1>
            <Row>
              <br />
              <Col>
                <small>
                  Enter your account email address and username to reset
                  password
                </small>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Username: </Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter username..."
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Email:</Label>
                <Input type="text" name="email" placeholder="Enter email..." />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Confirm Email:</Label>
                <Input
                  type="email"
                  name="confirmEmail"
                  placeholder="Enter email again..."
                />
              </Col>
            </Row>
            <Row style={{ alignContent: "center" }}>
              <Col>
                <Button
                  onMouseEnter={this.onHover}
                  onMouseLeave={this.onHoverLeave}
                  color={this.state.buttonColor}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Col>
        </Form>
      </Container>
    );
  }
}

export default Security;
