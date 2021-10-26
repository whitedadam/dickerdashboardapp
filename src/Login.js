import React from "react";
import {NavLink} from "reactstrap";
import {Col, Container, Row} from 'reactstrap';

class Login extends React.Component{
    render() {
        return(
            <Container className={'loginContainer'}>
                <div id="form">
                    <Row>
                        <h1 style={{alignContent: "center"}}>Login</h1>
                    </Row>
                    <form style={{backgroundColor: "", alignContent: "center"}}>
                        <Row>
                            <input type='email' name='email' placeholder='Enter email...' />
                        </Row>
                        <Row>
                            <input type='password' name='pwd' placeholder='Enter password...'/>
                        </Row>
                        <Row style={{alignContent: "center"}}>
                            <button>Login</button>
                        </Row>
                    </form>
                    <NavLink href="/resetpassword">Forgot Password?</NavLink>
                    <NavLink href="/createaccount">Create Account</NavLink>
                </div>
            </Container>
        );
    }
}

export default Login;