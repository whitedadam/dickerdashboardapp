import React from "react";
import {NavLink} from "reactstrap";
import {Col, Container, Row} from 'reactstrap';

class Reset extends React.Component{
    render() {
        return(
            <Container className={'resetPassContainer'}>
                <div id="resetForm">
                    <Row>
                        <h2>Enter your account email address to the receive reset email!</h2>
                    </Row>
                    <form>
                        <Row>
                            <input type='email' name='resetEmail' placeholder='Enter email...' />
                        </Row>
                        <Row style={{alignContent: "center"}}>
                            <button>Submit</button>
                        </Row>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Reset;