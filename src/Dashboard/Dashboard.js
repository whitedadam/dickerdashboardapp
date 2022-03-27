import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Spinner,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import { useGetData } from "../api/useGetData";
import {
  PotentialDickersChart,
  DickersParticipatedChart,
  SuccessfulDickersChart,
  DickersRedeemedChart,
} from "./DashboardComponents";
import AccountMenu from "../ProfileIcon/profileIcon";

const acceptedOffersUrl = "/accepted-offers";
// const offersUrl = "/offers";

// get all the data you need at once, and then pass down what is relevant to the component

const Dashboard = () => {
  const [acceptedOffersData, acceptedOffersIsLoading] =
    useGetData(acceptedOffersUrl);

  const setDefaultStartDateFilter = () => {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);
    let startDateString = startDate.toISOString().split("T")[0];
    return startDateString;
  };
  const [filterStartDate, setFilterStartDate] = useState(
    setDefaultStartDateFilter
  );

  const setDefaultEndDateFilter = () => {
    let endDate = new Date();
    endDate.setDate(endDate.getDate());
    let endDateString = endDate.toISOString().split("T")[0];
    return endDateString;
  };
  const [filterEndDate, setFilterEndDate] = useState(setDefaultEndDateFilter);

  const handleStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
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
    <Container style={{ position: 'relative', paddingTop: '125px', right: '150px', bottom: '90px'}} className={"dashboardContainer"}>
      <AccountMenu/>
      <Row>
        <Col style={{
          position: 'relative',
          bottom: '90px'
        }}>
          <h3>Welcome to your dashboard!</h3>
        </Col>
        <Col style={{
          right: '555px',
          paddingBottom: '20px'
        }}>
          <h5>Date Filter:</h5>
          <Form inline>
            <FormGroup className="mb-3">
              <Label for={"startDateFilter"} style={{
                paddingRight: '5px'
              }}>Start Date:</Label>
              <Input
                type={"date"}
                id={"startDateFilter"}
                name={"startDateFilter"}
                onChange={handleStartDateChange}
                bsSize={"sm"}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for={"endDateFilter"} style={{
                paddingRight: '5px',
                paddingLeft: '20px'
              }}>End Date:</Label>
              <Input
                type={"date"}
                id={"endDateFilter"}
                name={"endDateFilter"}
                onChange={handleEndDateChange}
                bsSize={"sm"}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"8"}>
          <h5>DICKERs Participated In</h5>
          {acceptedOffersData ? (
            <DickersParticipatedChart
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
            />
          ) : null}
        </Col>
        <Col xs={"4"}>
          <h5>DICKERs Redeemed</h5>
          {acceptedOffersData ? (
            <DickersRedeemedChart
              acceptedOffersData={acceptedOffersData}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
            />
          ) : null}
        </Col>
      </Row>
      <Row>{/* Spacer Row for Formatting */}</Row>
      <Row className="mb-3">
        <Col xs={"4"}>
          <h5>DICKERs Accepted</h5>
          {acceptedOffersData ? (
            <SuccessfulDickersChart
              acceptedOffersData={acceptedOffersData}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
            />
          ) : null}
        </Col>
        <Col xs={"8"}>
          <h5>Potential DICKERs</h5>
          {acceptedOffersData ? (
            <PotentialDickersChart
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
