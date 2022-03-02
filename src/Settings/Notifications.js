import { React, useState } from "react";
import {Button, Col, Container, Form, Input, Label, Row} from "reactstrap";
import * as emailjs from "emailjs-com";

const Notifications = () => {

  const sendEmail = (e) =>{
    e.preventDefault();


    emailjs.sendForm('service_jjjq44n', 'template_go8u5rq', e.target ,
        'user_8TRknzbUmpANb1CJDvJnJ')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    e.target.reset()
  }

  return (
    <Container className={"notificationOption"}>
      <form onSubmit={sendEmail}>
        <Col>
          <h1>
            <small>Update Notification Settings</small>
          </h1>
          <Row>
            <br />
            <Col>
              <small>
                Enter your account email address to update notifications:
              </small>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Name: </Label>
              <Input
                  type="text"
                  name="name"
                  placeholder="Enter First Name..."
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Email:</Label>
              <Input type="text" name="email" placeholder="Enter email..." />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input type="checkbox" name="directEmail" />
              <Label>Allow emails to be sent directly to you</Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input type="checkbox" name="pushNotifications" />
              <Label> Allow push notifications from Dicker Dashboard</Label>
            </Col>
          </Row>
          <Row style={{ alignContent: "center" }}>
            <Col>
              <div className = "col-8 pt-3 mx-auto">
                <button>
                  <input type = "submit" className="btn btn info"  value ='submit'></input>
                </button>
              </div>
            </Col>
          </Row>
        </Col>
      </form>
    </Container>
  );
};

export default Notifications;
