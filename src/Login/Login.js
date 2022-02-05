import React, { useState } from "react";
import { Button, Form, FormGroup, Input, NavLink } from "reactstrap";
import { Col, Container, Row } from "reactstrap";
import Dashboard from "../Dashboard";
import AdminDashboard from "../AdminDashboard";
import Nav from "../Nav";

const Login = ({ userAuth, setUserAuth, isAdmin, setIsAdmin }) => {
  const [state, setState] = useState({
    data: null,
    email: "",
    password: "",
    auth: false,
    isAdmin: false,
    admin: {
      name: "Admin",
    },
    merchant: {
      name: "Bob",
    },
  });

  const login = (event) => {
    event.preventDefault();

    let email = state.email;
    let password = state.password;

    const admin = {
      id: 1,
      email: "admin@dicker.com",
      password: "admin",
      name: "Admin",
      loginAttempts: 0,
      lockoutEnabled: false,
      isAdmin: true,
    };
    const merchant = {
      id: 2,
      email: "firstcheck@lastcheck.test",
      password: "12345",
      name: "Bob",
      loginAttempts: 0,
      lockoutEnabled: false,
      isAdmin: false,
    };

    console.log(email + " " + password + " " + admin.email);

    if (admin.email === email && admin.password === password) {
      event.preventDefault();
      console.log("login successful");
      // setState({ ...state, auth: true, isAdmin: true });
      setUserAuth(true);
      setIsAdmin(true);
    }
    if (admin.email === email && admin.password !== password) {
      event.preventDefault();
      admin.loginAttempts += 1;
      console.log(admin.loginAttempts);
      console.log("login failed");
    }
    if (merchant.email === email && merchant.password === password) {
      event.preventDefault();
      console.log("login successful");
      // setState({ ...state, auth: true });
      setUserAuth(true);
    }
    if (merchant.email === email && merchant.password !== password) {
      event.preventDefault();
      merchant.loginAttempts += 1;
      console.log(merchant.loginAttempts);
      console.log("login failed");
    }

    if (merchant.email !== email && admin.email !== email) {
      event.preventDefault();
      console.log("login failed");
    }

    if (admin.loginAttempts === 3) {
      event.preventDefault();
      console.log("haha you're done for. >:3");
      admin.lockoutEnabled = true;
    }

    if (merchant.loginAttempts === 3) {
      event.preventDefault();
      console.log("haha you're done for. >:3");
      merchant.lockoutEnabled = true;
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  if (userAuth === false) {
    return (
      <Container className={"loginContainer"}>
        <Form id="form" onSubmit={login}>
          <FormGroup style={{ backgroundColor: "", alignContent: "center" }}>
            <Row>
              <Col>
                <h1 style={{ alignContent: "center" }}>Login</h1>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="Enter email..."
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={state.password}
                  onChange={handleChange}
                  placeholder="Enter password..."
                />
              </Col>
            </Row>
            <Row style={{ alignContent: "center" }}>
              <Col>
                <Button>Login</Button>
              </Col>
            </Row>
            <p className="App-intro">{state.data}</p>
            <Row>
              <NavLink href="./resetPassword">Forgot Password?</NavLink>
              <NavLink href="./CreateAccount">Create Account</NavLink>
            </Row>
          </FormGroup>
        </Form>
      </Container>
    );
  } else if (userAuth === true) {
    if (isAdmin === false) {
      return <Dashboard userAuth={userAuth} isAdmin={isAdmin}/>;
    } else {
      return <AdminDashboard userAuth={userAuth} isAdmin={isAdmin}/>;
    }
  }
};

export default Login;
