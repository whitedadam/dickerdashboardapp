import { Col, Container, Input, Label, Row } from "reactstrap";
import * as emailjs from "emailjs-com";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import { Card } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Notifications = () => {
  // Sends an email using emailjs plugin with SMTP
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jjjq44n",
        "template_go8u5rq",
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
      {/* Notifications Card */}
      <Card
        style={{ width: "500px", margin: "auto", marginTop: "25px" }}
        sx={{ boxShadow: 3 }}
      >
        <Container className={"notificationOption"}>
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
          <form onSubmit={sendEmail}>
            <Col>
              <Typography
                fontWeight="bold"
                id="loginHeader"
                component="h1"
                variant="h5"
                align="center"
              >
                Update Notification Settings
              </Typography>
              <Row style={{ marginTop: "15px", alignContent: "center" }}>
                <br />
                <Col>
                  <small>
                    Enter your account email address to update notifications:
                  </small>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col>
                  <Label>Name: </Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter First Name..."
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col>
                  <Label>Email:</Label>
                  <Input
                    type="text"
                    name="email"
                    placeholder="Enter email..."
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col>
                  <Input type="checkbox" name="directEmail" />
                  <Label>Allow emails to be sent directly to you</Label>
                </Col>
              </Row>
              <Row style={{ marginTop: "-35px", alignContent: "center" }}>
                <Col>
                  <div className="col-8 pt-3 mx-auto">
                    <Grid container justify="center">
                      <Button
                        type="submit"
                        fullWidth
                        className="btn btn info"
                        variant="contained"
                        sx={{ backgroundColor: "#d9c07c", mt: 3, mb: 2 }}
                      >
                        Update Notifications
                      </Button>
                    </Grid>
                  </div>
                </Col>
              </Row>
            </Col>
          </form>
        </Container>
      </Card>
      {/* Return to Settings Card */}
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
          style={{ height: "30px", width: "250px", margin: "auto", color: "black" }}
        >
          Return to Settings
        </Button>
      </Card>
    </>
  );
};

export default Notifications;
