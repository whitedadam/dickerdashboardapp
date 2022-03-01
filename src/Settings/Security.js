import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { React, useState } from "react";

const Security = () => {
  const [buttonColor, setButtonColor] = useState("secondary");

  const onHover = () => {
    setButtonColor("primary");
  };

  const onHoverLeave = () => {
    setButtonColor("secondary");
  };

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
                Enter your account email address and username to reset password
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
                onMouseEnter={onHover}
                onMouseLeave={onHoverLeave}
                color={buttonColor}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
      </Form>
    </Container>
  );
};

export default Security;
