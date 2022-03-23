import React, {useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Col, Container, Row} from "reactstrap";
import {render} from "react-dom";
import axios from "axios";

export default class registerUser extends React.Component {
    state = {
        regEmail: '',
        createPass: '',
        confirmPass: ''
    }


    handleChange = event => {
        this.setState({
            regEmail: event.target.value,
            createPass: event.target.value,
            confirmPass: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            regEmail: this.state.regEmail,
            createPass: this.state.createPass,
            confirmPass: this.state.confirmPass
        };

        axios.post('/registerNew', {user})
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }

    render() {
        return (
            <Container className={"accountContainer"}>
                <Form id="accountForm" onSubmit={this.handleSubmit}>
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
                                    onChange={this.handleChange}
                                    type="email"
                                    name="regEmail"
                                    placeholder="Enter email..."
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label>Password:</Label>
                                <Input
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                    type="text"
                                    name="createName"
                                    placeholder="Enter merchant name..."
                                />
                            </Col>
                        </Row>
                        <Row style={{alignContent: "center"}}>
                            <Col>
                                <Button type={"submit"}>Submit</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

