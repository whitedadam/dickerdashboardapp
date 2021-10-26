import React from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Col, Container, Row} from 'reactstrap';

class Reset extends React.Component{
    render() {
        return(
            <Container className={'resetPassContainer'}>
                <Form id="resetForm">
                    <Row>
                        <Col>
                            <h2>Enter your account email address to the receive reset email!</h2>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for={'resetEmail'}>Email:</Label>
                        <Input type='email' name='resetEmail' placeholder='Enter email...' />
                        <Button>Submit</Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default Reset;