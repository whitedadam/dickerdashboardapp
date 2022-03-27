import React, {useState} from "react";
import { Form, FormGroup, Input, Label} from "reactstrap";
import {Col, Container, Row} from "reactstrap";
import {render} from "react-dom";
import axios from "axios";
import { Card } from '@mui/material';
import Paper from '@mui/material/Paper';
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from '@mui/material/Button';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EmailIcon from "@mui/icons-material/Email";

export default class registerUser extends React.Component {
    state = {
        regEmail: '',
        createPass: '',
        confirmPass: ''
    }


    usernameHandleChange = event => {
        this.setState({
            regEmail: event.target.value
        });
    }

    passHandleChange = event => {
        this.setState({
            createPass: event.target.value
        });
    }

    confirmPassHandleChange = event => {
        this.setState({
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
            <Card style={{ width: '500px', margin: 'auto', marginTop: '300px' }} sx={{ boxShadow: 3 }}>
                <Container className={"accountContainer"}>
                    <Paper
                        sx={{ boxShadow: 0, marginLeft: '166px', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }}
                    >
                        <img src={dickerLogoSquare} alt={'dicker logo'} />
                    </Paper>
                    <Form id="accountForm" onSubmit={this.handleSubmit}>
                        <FormGroup style={{ backgroundColor: '', alignContent: 'center' }}>
                            <Row>
                                <Col>
                                    <Typography fontWeight='bold' id='loginHeader' component='h1' variant='h5' align='center'>
                                        Create a DICKER Account
                                    </Typography>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        required
                                        autoFocus
                                        margin='normal'
                                        label='Email Address'
                                        id='email'
                                        fullWidth
                                        onChange={this.usernameHandleChange}
                                        type="email"
                                        name="regEmail"
                                        placeholder='Enter email...'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <LockOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        id='password'
                                        required
                                        margin='normal'
                                        fullWidth
                                        label='Password'
                                        onChange={this.passHandleChange}
                                        type="password"
                                        name="createPass"
                                        placeholder="Enter password..."
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <LockOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        id='password'
                                        required
                                        margin='normal'
                                        fullWidth
                                        label='Password'
                                        onChange={this.confirmPassHandleChange}
                                        type="password"
                                        name="confirmPass"
                                        placeholder="Enter password again..."
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <AddBusinessIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        id='merchantName'
                                        required
                                        margin='normal'
                                        fullWidth
                                        label='Merchant Name'
                                        onChange={this.handleChange}
                                        type="text"
                                        name="merchantName"
                                        placeholder="Enter merchant name..."
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '-8px', alignContent: 'center' }}>
                                <Col>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        sx={{ backgroundColor: '#d9c07c', mt: 3, mb: 2 }}
                                    >
                                        Create Account
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Container>
            </Card>
        );
    }
}

