import React, { useState } from "react";
import "./AdminDashboard.css";
import {
  Col,
  Container,
  Row,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import AdminDickers from "./AdminDashboardComponents/AdminDickersChart";
import { useGetData } from "../api/useGetData";
import AdminAccountMenu from "../AdminAccountMenu/AdminAccountMenu";
import dickerLogoSquare from "../images/dickerLogoSquare.png";

const acceptedOffersUrl = "/api/accepted-offers";

const AdminDashboard = ({ userAuth, isAdmin, setUserAuth }) => {
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
    <Container className="AdminDashboard">
      {/* Header Row */}
      <Row>
        {/* Welcome Col */}
        <Col sm={10} style={{ margin: "auto", display: "inline-flex" }}>
          <img
            src={dickerLogoSquare}
            alt={"dicker logo"}
            style={{
              height: "35px",
              width: "35px",
              "margin-right": "5px",
            }}
          />
          <h3>Welcome, Admin!</h3>
        </Col>
        {/* Menu Col */}
        <Col sm={2}>
          <AdminAccountMenu
            userAuth={userAuth}
            isAdmin={isAdmin}
            setUserAuth={setUserAuth}
          />
        </Col>
      </Row>
      {/* Date Filter Row */}
      <Row xs={12}>
        <Card
          style={{
            width: "100%",
            "box-shadow": "3px 3px 3px",
          }}
        >
          <CardHeader>
            <h5>Date Filter</h5>
            <p>Default setting is last 365 days</p>
          </CardHeader>
          <CardBody>
            <Form inline>
              <FormGroup className="mb-3">
                <Label
                  for={"startDateFilter"}
                  style={{
                    paddingRight: "5px",
                  }}
                >
                  Start Date:
                </Label>
                <Input
                  type={"date"}
                  id={"startDateFilter"}
                  name={"startDateFilter"}
                  onChange={handleStartDateChange}
                  bsSize={"sm"}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <Label
                  for={"endDateFilter"}
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "20px",
                  }}
                >
                  End Date:
                </Label>
                <Input
                  type={"date"}
                  id={"endDateFilter"}
                  name={"endDateFilter"}
                  onChange={handleEndDateChange}
                  bsSize={"sm"}
                />
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Row>
      {/* Spacer Row for Formatting */}
      <Row></Row>
      {/* DICKER Totals Row */}
      <Row xs={12}>
        <Card
          style={{
            width: "100%",
            "box-shadow": "3px 3px 3px",
          }}
        >
          <CardHeader>
            <h5>DICKER Totals</h5>
          </CardHeader>
          <CardBody>
            {acceptedOffersData ? (
              <AdminDickers
                filterStartDate={filterStartDate}
                filterEndDate={filterEndDate}
                acceptedOffersData={acceptedOffersData}
              />
            ) : null}
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
