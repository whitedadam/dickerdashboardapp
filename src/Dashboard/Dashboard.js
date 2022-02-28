import React from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
import { useGetData } from "../api/useGetData";
import {
  PotentialDickersChart,
  DickersParticipatedChart,
  SuccessfulDickersChart,
  DickersRedeemedChart,
} from "./DashboardComponents";

const url = "/accepted-offers";

// get all the data you need at once, and then pass down what is relevant to the component

const Dashboard = () => {
  const [data, isLoading] = useGetData(url);

  if (isLoading)
    return (
      <Container>
        <Col>
          <Row></Row>
          <Row>
            <Spinner color={"warning"}></Spinner>Loading chart data...
          </Row>
          <Row></Row>
        </Col>
      </Container>
    );

  return (
    <Container className={"dashboardContainer"}>
      <Row>
        <Col>
          <h3>Dashboard</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"8"}>
          <h5>DICKERs Participated In</h5>
          {data ? <DickersParticipatedChart /> : null}
        </Col>
        <Col xs={"4"}>
          <h5>DICKERs Redeemed</h5>
          {data ? <DickersRedeemedChart data={data} /> : null}
        </Col>
      </Row>
      <Row>{/* Spacer Row for Formatting */}</Row>
      <Row className="mb-3">
        <Col xs={"4"}>
          <h5>DICKERs Accepted</h5>
          {data ? <SuccessfulDickersChart data={data} /> : null}
        </Col>
        <Col xs={"8"}>
          <h5>Potential DICKERs</h5>
          {data ? <PotentialDickersChart /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
