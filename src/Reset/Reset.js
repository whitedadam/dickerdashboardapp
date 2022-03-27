import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Col, Container, Row } from "reactstrap";
import Security from "../Settings/Security";

const Reset = () => {
  return (
    <Container className={"resetPassContainer"}>
      <Security />
    </Container>
  );
};

export default Reset;
