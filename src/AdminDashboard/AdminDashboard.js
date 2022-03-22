import React, { useState } from "react";
import "./AdminDashboard.css";
import {
  Col,
  Container,
  NavItem,
  NavLink,
  Row,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import adminData from "../mock-data.json";
import { Link } from "react-router-dom";
import AdminDickers from "./AdminDashboardComponents/AdminDickersChart";
import acceptedoffers from '../api/SampleData/accepted-offers.json'

// const acceptedOffersUrl = "/api/accepted-offers";

const AdminDashboard = ({ userAuth, isAdmin }) => {
  const [merch] = useState(adminData);
  const [acceptedOffersData, acceptedOffersIsLoading] =
    [acceptedoffers, false];

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
    <Container className="AdminDashboard">
      <Row>
        <Col>
          <h3>Welcome, {merch[1].firstName}!</h3>
        </Col>
        <Col>
          <h5>Date Filter:</h5>
          <Form inline>
            <FormGroup className="mb-3">
              <Label for={"startDateFilter"}>Start Date</Label>
              <Input
                type={"date"}
                id={"startDateFilter"}
                name={"startDateFilter"}
                onChange={handleStartDateChange}
                bsSize={"sm"}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for={"endDateFilter"}>End Date</Label>
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
      <Row>
        <h5>DICKER Totals</h5>
        {acceptedOffersData ? (
          <AdminDickers
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            acceptedOffersData={acceptedOffersData}
          />
        ) : null}
      </Row>
      <Row>
        <Col>
          <NavItem className="adminDashNav">
            <NavLink tag={Link} to="/adminSettings">
              Admin Settings
            </NavLink>
          </NavItem>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
