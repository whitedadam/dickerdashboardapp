import React from "react";
import {Button, Form, FormGroup, Input, NavLink} from "reactstrap";
import {Col, Container, Row} from 'reactstrap';

class Login extends React.Component{
    render() {
        return(
            <Container className={'loginContainer'}>
                <Form id="form">
                    <Row>
                        <Col><h1 style={{alignContent: "center"}}>Login</h1></Col>
                    </Row>
                    <FormGroup style={{backgroundColor: "", alignContent: "center"}}>
                        <Row>
                            <Col><Input type='email' name='email' placeholder='Enter email...' /></Col>
                        </Row>
                        <Row>
                            <Col><Input type='password' name='pwd' placeholder='Enter password...'/></Col>
                        </Row>
                        <Row style={{alignContent: "center"}}>
                            <Col><Button>Login</Button></Col>
                        </Row>
                    </FormGroup>
                    <NavLink href="./resetPassword">Forgot Password?</NavLink>
                    <NavLink href="./CreateAccount">Create Account</NavLink>
                </Form>
            </Container>
        );
    }
}

export default Login;