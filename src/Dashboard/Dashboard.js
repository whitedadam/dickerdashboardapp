import React, { useState } from "react";
import { Col, Container, Row, Spinner, Input } from "reactstrap";
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
  const [acceptedOffersData, acceptedOffersIsLoading] =
    useGetData(acceptedOffersUrl);

  const setDefaultDateFilter = () => {
    let pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 365);
    let pastDateString = pastDate.toISOString().split("T")[0];
    return pastDateString;
  };
  const [filterDate, setFilterDate] = useState(setDefaultDateFilter);

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

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
        <Col>
          <h5>Date Filter:</h5>
          <Input
            type={"date"}
            id={"dateFilter"}
            name={"dateFilter"}
            onChange={handleDateChange}
          ></Input>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"8"}>
          <h5>DICKERs Participated In</h5>
          {acceptedOffersData ? <DickersParticipatedChart filterDate={filterDate} /> : null}
        </Col>
        <Col xs={"4"}>
          <h5>DICKERs Redeemed</h5>
          {acceptedOffersData ? (
            <DickersRedeemedChart acceptedOffersData={acceptedOffersData} filterDate={filterDate} />
          ) : null}
        </Col>
      </Row>
      <Row>{/* Spacer Row for Formatting */}</Row>
      <Row className="mb-3">
        <Col xs={"4"}>
          <h5>DICKERs Accepted</h5>
          {acceptedOffersData ? (
            <SuccessfulDickersChart acceptedOffersData={acceptedOffersData} filterDate={filterDate} />
          ) : null}
        </Col>
        <Col xs={"8"}>
          <h5>Potential DICKERs</h5>
          {acceptedOffersData ? <PotentialDickersChart filterDate={filterDate} /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
