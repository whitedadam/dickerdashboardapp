import React from "react";
import { Container } from "reactstrap";
import Security from "../Settings/Security";

const Reset = ({ userAuth }) => {
  return (
    <Container className={"resetPassContainer"}>
      <Security userAuth={userAuth} />
    </Container>
  );
};

export default Reset;
