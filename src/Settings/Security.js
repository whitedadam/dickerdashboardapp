import { Col, Container, Form, Row } from "reactstrap";
import React from "react";
import * as emailjs from "emailjs-com";
import { Card, FormGroup } from "@mui/material";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

export default function Security({ userAuth }) {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jjjq44n",
        "template_8g7oem6",
        e.target,
        "user_8TRknzbUmpANb1CJDvJnJ"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <>
      {/* Reset Password Card */}
      <Card
        style={{ width: "500px", margin: "auto", marginTop: "25px" }}
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
            <Form id="loginForm" onSubmit={sendEmail}>
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
                      Reset Password
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
                      placeholder="Enter email..."
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: "-8px", alignContent: "center" }}>
                  <Col>
                    <Button
                      type="submit"
                      fullWidth
                      className="btn btn info"
                      variant="contained"
                      sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
                    >
                      Send Reset Link
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Container>
        </body>
      </Card>
      {/* Return to Settings/Dashboard Card */}
      {userAuth ? (
        <Card
          style={{
            margin: "25px auto auto",
            display: "table",
            padding: "inherit",
          }}
          sx={{ boxShadow: 3 }}
        >
          <Button
            component={Link}
            to="/settings"
            className="button button1"
            sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
            style={{
              height: "30px",
              width: "250px",
              margin: "auto",
              color: "black",
            }}
          >
            Return
          </Button>
        </Card>
      ) : (
        <Card
          style={{
            margin: "25px auto auto",
            display: "table",
            padding: "inherit",
          }}
          sx={{ boxShadow: 3 }}
        >
          <Button
            component={Link}
            to="/settings"
            className="button button1"
            sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
            style={{
              height: "30px",
              width: "250px",
              margin: "auto",
              color: "black",
            }}
          >
            Return to Settings
          </Button>
        </Card>
      )}
    </>
  );
}
