import {Button, Col, Container, Form, Input, Label, Row} from "reactstrap";
import React from "react";
import CreateAccount from "../CreateAccount";

class Security extends React.Component {
render() {
        return(
            <Container className={'accountContainer'}>
                <Form id="emailResetForm">
                <h1><small>Reset Password</small></h1>
                    <Row>
                        <br/>
                  <Col><small>Enter your account email address and username to reset password</small></Col>
                </Row>
                    <Row>
                        <Col>
                        <label>Username: </label>
                        <input type="text" name="username" placeholder='Enter username...' />
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <Label>Email:</Label>
                        <Input type='text' name='email' placeholder='Enter email...' />
                    </Col>
                </Row>
                    <Row>
                        <Col>
                            <Label>Confirm Email:</Label>
                            <Input type='email' name='confirmEmail' placeholder='Enter email again...' />
                        </Col>
                    </Row>
                    <Row style={{alignContent: "center"}}>
                        <Col>
                            <Button>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
     }
    }

export default Security;