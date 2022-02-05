import React from "react";
import {
  PotentialDickersChart,
  DickersParticipatedChart,
  SuccessfulDickersChart,
  DickersRedeemedChart,
} from "./DashboardComponents/index";
import { Col, Container, Row } from "reactstrap";

const Dashboard = (userAuth, isAdmin) => {
  return (
    <Container className={"dashboardContainer"}>
      <Row>
        <Col>
          <h3>Dashboards</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={"auto"}>
          <PotentialDickersChart />
        </Col>
        <Col xs={"auto"}>
          <DickersRedeemedChart />
        </Col>
      </Row>
      <Row>
        <Col xs={"auto"}>
          <SuccessfulDickersChart />
        </Col>
        <Col xs={"auto"}>
          <DickersParticipatedChart />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
