import { useState } from "react";
import { Form, FormGroup, NavLink, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./Login.css"; // Tell webpack that Button.js uses these styles
import { Card } from "@mui/material";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

const Login = ({
  userAuth,
  setUserAuth,
  isAdmin,
  setIsAdmin,
  merchantId,
  setMerchantId,
}) => {
  const [state, setState] = useState({
    // submitted with login form
    email: "",
    password: "",
  });

  // Post route used to log user in.
  const axiosPost = async () => {
    // Grabbing user inputs as args for POST
    const user = {
      username: state.email,
      password: state.password,
    };
    // Post Route returns PasswordHash, Admin, and MerchantId
    try {
      let response = await axios.post("/api/login", { user });
      console.log(response);
      let userInfo = response.data;
      console.log(userInfo);

      // Password is correct, logging user in. Taking user to Merchant dash.
      setUserAuth(true);

      // User is admin, taking user to Admin dash.
      setIsAdmin(userInfo.isAdmin);

      // If user has MerchantId, assigning that to state value.
      setMerchantId(userInfo.merchantId);
    } catch (err) {
      // Resetting variables to ensure nothing sneaks through
      setUserAuth(false);
      setIsAdmin(false);
      setMerchantId(0);
      alert("Invalid login info! Check your password or email and try again.");
    }
  };

  // Called when login form is submitted
  const login = (event) => {
    event.preventDefault();

    let email = state.email;
    let password = state.password;

    // call to server to authenticate.
    const user = {
      username: email,
      password: password,
    };

    // Logging to track data capture
    console.log("logging in ", user);

    // Axios method to post login to server
    axiosPost();
  };

  // Capturing form inputs within state.
  const handleChange = (event) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  // If user not authorized then displaying login form.
  if (!userAuth) {
    return (
      <Card
        style={{ width: "500px", margin: "auto", marginTop: "300px" }}
        sx={{ boxShadow: 3 }}
      >
        <body id="loginBody">
          <Container className={"loginContainer"}>
            {/* <TestComponent /> */}
            <Paper
              sx={{
                boxShadow: 0,
                marginLeft: "166px",
                marginRight: "auto",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <img src={dickerLogoSquare} alt={"dicker logo"} />
            </Paper>
            <Form id="loginForm" onSubmit={login}>
              <FormGroup
                style={{ backgroundColor: "", alignContent: "center" }}
              >
                <Row>
                  <Col>
                    <Typography
                      fontWeight="bold"
                      id="loginHeader"
                      component="h1"
                      variant="h5"
                      align="center"
                    >
                      Sign in
                    </Typography>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      type="email"
                      name="email"
                      required
                      autoFocus
                      margin="normal"
                      label="Email Address"
                      id="email"
                      fullWidth
                      value={state.email}
                      onChange={handleChange}
                      placeholder="Enter email..."
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                      type="password"
                      name="password"
                      id="password"
                      required
                      margin="normal"
                      fullWidth
                      label="Password"
                      value={state.password}
                      onChange={handleChange}
                      placeholder="Enter password..."
                    />
                  </Col>
                </Row>
                <Row>
                  <FormControlLabel
                    sx={{ marginLeft: "6px" }}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Row>
                <Row style={{ marginTop: "-8px", alignContent: "center" }}>
                  <Col>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <NavLink
                    style={{ marginLeft: "85px" }}
                    to="/resetPassword"
                    tag={Link}
                  >
                    Forgot Password?
                  </NavLink>
                  <NavLink
                    style={{ marginRight: "auto" }}
                    to="/createAccount"
                    tag={Link}
                  >
                    Create Account
                  </NavLink>
                </Row>
              </FormGroup>
            </Form>
          </Container>
        </body>
      </Card>
    );
  }

  return null;
};

export default Login;
