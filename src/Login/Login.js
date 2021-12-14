import React from "react";
import {Button, Form, FormGroup, Input, NavLink} from "reactstrap";
import {Col, Container, Row} from 'reactstrap';
import Dashboard from "../Dashboard";
import AdminDashboard from "../AdminDashboard";

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            email: '',
            password: '',
            auth: false,
            isAdmin: false,
            admin: {
                name: 'Admin'
            },
            merchant: {
                name: 'Bob'
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        // this.checkCredentials = this.checkCredentials.bind(this);
    }

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

    login(event) {
        event.preventDefault();

        let email = this.state.email;
        let password = this.state.password;

        const admin = {
            id: 1,
            email: 'admin@dicker.com',
            password: 'admin',
            name: 'Admin',
            loginAttempts: 0,
            lockoutEnabled: false,
            isAdmin: true
        }
        const merchant = {
            id: 2,
            email: 'firstcheck@lastcheck.test',
            password: '12345',
            name: 'Bob',
            loginAttempts: 0,
            lockoutEnabled: false,
            isAdmin: false
        }

        console.log(email + ' ' + password + ' ' + admin.email);

        if (admin.email === email && admin.password === password) {
            event.preventDefault();
            console.log('you\'re in, admin :)');
            this.setState({auth: true, isAdmin: true});
        }
        if (admin.email === email && admin.password !== password) {
            event.preventDefault();
            admin.loginAttempts+=1;
            console.log(admin.loginAttempts);
            console.log('you stink,you\'re not admin >:|');
        }
        if (merchant.email === email && merchant.password === password) {
            event.preventDefault();
            console.log('you\'re in, merchant :)');
            this.setState({auth: true});
        }
        if (merchant.email === email && merchant.password !== password) {
            event.preventDefault();
            merchant.loginAttempts+=1;
            console.log(merchant.loginAttempts);
            console.log('you stink,you\'re not merchant >:|');
        }

        if (merchant.email !== email && admin.email !== email) {
            event.preventDefault();
            console.log('invalid creds dummy :P');
        }

        if (admin.loginAttempts === 3) {
            event.preventDefault();
            console.log('haha you\'re done for. >:3');
            admin.lockoutEnabled = true;
        }

        if (merchant.loginAttempts === 3) {
            event.preventDefault();
            console.log('haha you\'re done for. >:3');
            merchant.lockoutEnabled = true;
        }

    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value } );
    }

    render() {
        if (this.state.auth === false) {
            return(
                <Container className={'loginContainer'}>

                    <Form id="form" onSubmit={this.login}>
                        <Row>
                            <Col><h1 style={{alignContent: "center"}}>Login</h1></Col>
                        </Row>
                        <FormGroup style={{backgroundColor: "", alignContent: "center"}}>
                            <Row>
                                <Col><Input type='email' name='email' id='email' value={this.state.email} onChange={this.handleChange} placeholder='Enter email...' /></Col>
                            </Row>
                            <Row>
                                <Col><Input type='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} placeholder='Enter password...'/></Col>
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
        } else if (this.state.auth === true) {
            if (this.state.isAdmin === false) {
                return <Dashboard />;
            } else {
                return <AdminDashboard />
            }
        }
    }
}

export default Login;