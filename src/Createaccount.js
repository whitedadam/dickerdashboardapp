import React from "react";
import {NavLink} from "reactstrap";
import {Col, Container, Row} from 'reactstrap';

class Create extends React.Component{
    render() {
        return(
            <Container className={'accountContainer'}>
                <div id="accountForm">
                    <Row>
                        <h2>Enter your information to create a merchant account!</h2>
                    </Row>
                    <form>
                        <Row>
                            <p>Email address:</p>
                            <input type='email' name='createEmail' placeholder='Enter email...' />
                        </Row>
                        <Row>
                            <p>Password:</p>
                            <input type='password' name='createPass' placeholder='Enter password...' />
                        </Row>
                        <Row>
                            <p>Confirm password:</p>
                            <input type='password' name='confirmPass' placeholder='Enter password again...' />
                        </Row>
                        <Row>
                            <p>Merchant name:</p>
                            <input type='text' name='createName' placeholder='Enter merchant name...' />
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

export default Create;