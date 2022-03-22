import React, {useState} from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Col, Container, Row } from "reactstrap";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const handleOnSubmit = async() => {
    const request = {
      email, password
    }
    const response = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify(request)
    })
    const data = await response.json()
    console.log(data)
  };

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
              <Button type={"submit"} onSubmit={handleOnSubmit}>Submit</Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateAccount;
