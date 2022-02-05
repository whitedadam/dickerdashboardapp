import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Col, Container, Row } from "reactstrap";

const CreateAccount = () => {
  return (
    <Container className={"accountContainer"}>
      <Form id="accountForm">
        <FormGroup>
          <Row>
            <Col>
              <h2>Enter your information to create a merchant account!</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Email address:</Label>
              <Input
                type="email"
                name="createEmail"
                placeholder="Enter email..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Password:</Label>
              <Input
                type="password"
                name="createPass"
                placeholder="Enter password..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Confirm password:</Label>
              <Input
                type="password"
                name="confirmPass"
                placeholder="Enter password again..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Merchant name:</Label>
              <Input
                type="text"
                name="createName"
                placeholder="Enter merchant name..."
              />
            </Col>
          </Row>
          <Row style={{ alignContent: "center" }}>
            <Col>
              <Button>Submit</Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateAccount;
