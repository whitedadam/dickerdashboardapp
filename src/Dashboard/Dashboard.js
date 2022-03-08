import React from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
import { useGetData } from "../api/useGetData";
import {
  PotentialDickersChart,
  DickersParticipatedChart,
  SuccessfulDickersChart,
  DickersRedeemedChart,
} from "./DashboardComponents";

const acceptedOffersUrl = "/accepted-offers";
// const offersUrl = "/offers";

// get all the data you need at once, and then pass down what is relevant to the component

const Dashboard = () => {
  const [acceptedOffersData, acceptedOffersIsLoading] = useGetData(acceptedOffersUrl);
  // const [offersData, offersDataIsLoading] = useGetData(offersUrl);

  if (acceptedOffersIsLoading)
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
          {acceptedOffersData ? <DickersParticipatedChart /> : null}
        </Col>
        <Col xs={"4"}>
          <h5>DICKERs Redeemed</h5>
          {acceptedOffersData ? <DickersRedeemedChart acceptedOffersData={acceptedOffersData} /> : null}
        </Col>
      </Row>
      <Row>{/* Spacer Row for Formatting */}</Row>
      <Row className="mb-3">
        <Col xs={"4"}>
          <h5>DICKERs Accepted</h5>
          {acceptedOffersData ? <SuccessfulDickersChart acceptedOffersData={acceptedOffersData} /> : null}
        </Col>
        <Col xs={"8"}>
          <h5>Potential DICKERs</h5>
          {acceptedOffersData ? <PotentialDickersChart /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
