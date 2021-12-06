import React from "react";
import {Button, Form, FormGroup, Input, NavLink} from "reactstrap";
import {Col, Container, Row} from 'reactstrap';

class Login extends React.Component{

    state = {
        data: null
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

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
                    <p className="App-intro">{this.state.data}</p>
                    <NavLink href="./resetPassword">Forgot Password?</NavLink>
                    <NavLink href="./CreateAccount">Create Account</NavLink>
                </Form>
            </Container>
        );
    }
}

export default Login;