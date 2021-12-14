import React from "react";
import {Button, Form, FormGroup, Input, NavLink} from "reactstrap";
import {Col, Container, Row} from 'reactstrap';
import Dashboard from "../Dashboard";

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            form: {
                email: '',
                password: ''
            },
            users: {
                admin: {
                    id: 1,
                    email: 'admin@dicker.com',
                    password: 'admin',
                    name: 'Admin',
                    loginAttempts: 0,
                    lockoutEnabled: false,
                    isAdmin: true
                },
                merchant: {
                    id: 2,
                    email: 'firstcheck@lastcheck.test',
                    password: '12345',
                    name: 'Bob',
                    loginAttempts: 0,
                    lockoutEnabled: false,
                    isAdmin: false
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.checkCredentials = this.checkCredentials.bind(this);
    }


    state = {
        data: null,
        form: {
            email: '',
            password: ''
        },
        users: {
            admin: {
                id: 1,
                email: 'admin@dicker.com',
                password: 'admin',
                name: 'Admin',
                loginAttempts: 0,
                lockoutEnabled: false,
                isAdmin: true
            },
            merchant: {
                id: 2,
                email: 'firstcheck@lastcheck.test',
                password: '12345',
                name: 'Bob',
                loginAttempts: 0,
                lockoutEnabled: false,
                isAdmin: false
            }
        }
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

    checkCredentials(email, password) {

        console.log(email, password);

       Object.keys(this.state.users).forEach(user => function (email, password) {
           if (user.email.contains(email) && user.password.contains(password)) {
               console.log('you\'re in :)');
               return true;
           } else if (user.email.contains(email) && !user.password.contains(password))
               this.setState(user.loginAttempts++);
                console.log('you stink >:|');
                if (user.loginAttempts === 3) {
                    console.log('haha you\'re done for. >:3');
                    this.setState( { user: { lockoutEnabled: true } });
                }
               return false;
        });

        return false;
    }

    login(email, password, event) {
        if (this.checkCredentials(email, password)) {
            // event.preventDefault();
            return <Dashboard/>;
        }


    }

    handleChange(event) {
        this.setState({ form: { [event.target.name]: event.target.value } });
    }

    render() {
        return(
            <Container className={'loginContainer'}>
                <Form id="form" onSubmit={this.login(this.state.form.email, this.state.form.password)}>
                    <Row>
                        <Col><h1 style={{alignContent: "center"}}>Login</h1></Col>
                    </Row>
                    <FormGroup style={{backgroundColor: "", alignContent: "center"}}>
                        <Row>
                            <Col><Input type='email' name='email' value={this.state.form.email} onChange={this.handleChange} placeholder='Enter email...' /></Col>
                        </Row>
                        <Row>
                            <Col><Input type='password' name='password' value={this.state.form.password} onChange={this.handleChange} placeholder='Enter password...'/></Col>
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