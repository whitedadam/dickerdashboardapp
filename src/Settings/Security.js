import {Button, Col, Container, Form, Input, Label, Row} from "reactstrap";
import React from "react";
import * as emailjs from 'emailjs-com';
import {Link} from "react-router-dom";

export default function Security(){

  const sendEmail = (e) =>{
    e.preventDefault();


    emailjs.sendForm('service_jjjq44n', 'template_8g7oem6', e.target ,
        'user_8TRknzbUmpANb1CJDvJnJ')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    e.target.reset()
  }


  return (
      <Container className={"accountContainer"}>
        <form onSubmit={sendEmail}>
          <Col>
            <h1>
              <small>Reset Password</small>
            </h1>
            <Row>
              <br />
              <Col>
                <small>
                  Enter your account email address and username to reset
                  password
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
                <Label>Username: </Label>
                <Input
                    type="text"
                    name="username"
                    placeholder="Enter username..."
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
                <Label>Confirm Email:</Label>
                <Input type="email" name="confirmEmail" placeholder="Enter email again..."/>
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
}

