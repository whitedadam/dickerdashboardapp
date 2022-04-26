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
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { useGetData } from "../api/useGetData";
import {
  PotentialDickersChart,
  DickersParticipatedChart,
  AcceptedDickersChart,
  DickersRedeemedChart,
} from "./DashboardComponents";
import AccountMenu from "../AccountMenu/AccountMenu";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import { useGetDataWithParam } from "../api/useGetDataWithParam";

const businessesURL = "/api/businesses";
const acceptedOffersUrl = "/api/accepted-offers";
// get all the data you need at once, and then pass down what is relevant to the component

const Dashboard = ({
  userAuth,
  isAdmin,
  setUserAuth,
  setIsAdmin,
  merchantId,
}) => {
  // Pulling data from the AcceptedOffers Table

  const [acceptedOffersData, acceptedOffersIsLoading] =
    useGetData(acceptedOffersUrl);

  // Pulling businesses from the Business table
  const [businesses, businessesIsLoading] = useGetDataWithParam(
    businessesURL,
    merchantId
  );

  // Functions that will allow the user to dynamically change the start and end dates of data filtering.
  const setDefaultStartDateFilter = () => {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);
    let startDateString = startDate.toISOString().split("T")[0];
    return startDateString;
  };
  // The start date of the date filter.
  const [filterStartDate, setFilterStartDate] = useState(
    setDefaultStartDateFilter
  );

  const setDefaultEndDateFilter = () => {
    let endDate = new Date();
    endDate.setDate(endDate.getDate());
    let endDateString = endDate.toISOString().split("T")[0];
    return endDateString;
  };
  // The end date of the date filter.
  const [filterEndDate, setFilterEndDate] = useState(setDefaultEndDateFilter);

  // Functions that dytnamically update the data filtering as users enter new dates into date filter
  const handleStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  // Removes irrelevant businesses from businesses
  const filterBusinesses = () => {
    try {
      // Deep copy of businesses
      let unfilteredArray = JSON.parse(JSON.stringify(businesses));

      // if business.Merchant_FK === merchantId, it's a relevant business and we keep it
      let filteredArray = unfilteredArray.filter((business) => {
        return business.Merchant_FK === merchantId;
      });

      return filteredArray;
    } catch (err) {}
  };
  // Array of businesses that are filtered by logged in user's merchantId
  const filteredBusinesses = filterBusinesses();

  // Function filters out offers that are not from logged in merchants businesses
  const filterAcceptedOffersByBusiness = () => {
    // final out arr holds all filtered offers
    let finalFilteredBusinessArr = [];
    try {
      // for each business that belongs to the merchant
      filteredBusinesses.forEach((business) => {
        // placeholder, wiped after every business search
        let currentBusiness = acceptedOffersData.filter((offer) => {
          // if offer has business id then we know its one the the merchants businesses
          return offer.Business_FK === business.BusinessId;
        });
        // pushing all found offers to finalFilteredBusiness Arr
        currentBusiness.forEach((offer) => {
          finalFilteredBusinessArr.push(offer);
        });
        // wiping array
        currentBusiness = [];
      });
      return finalFilteredBusinessArr;
    } catch (err) {}
  };
  const acceptedOffersDataFilteredByBusiness = filterAcceptedOffersByBusiness();

  // Will hold the app to ensure accepted offer data is pulled before other queries start
  if (acceptedOffersIsLoading)
    return (
      <Container>
        <Col>
          <Row></Row>
          <Row>
            <p>Hello, we're grabbing your data!</p>
            <Spinner color={"warning"}></Spinner>Loading chart data...
          </Row>
          <Row></Row>
        </Col>
      </Container>
    );

  // Will hold the app to ensure businesses data is pulled before other queries start
  if (!acceptedOffersIsLoading && businessesIsLoading) {
    return (
      <Container>
        <Col>
          <Row></Row>
          <Row>
            <p>Hello, we're grabbing your data!</p>
            <Spinner color={"warning"}></Spinner>Loading chart data...
          </Row>
          <Row></Row>
        </Col>
      </Container>
    );
  }
  return (
    <Container
      className={"dashboardContainer"}
      style={{
        width: "100%",
      }}
    >
      {/* Page Heading */}
      <Row>
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
          <h3>Welcome to your DICKER dashboard!</h3>
        </Col>
        <Col sm={2}>
          <AccountMenu
            userAuth={userAuth}
            isAdmin={isAdmin}
            setUserAuth={setUserAuth}
            setIsAdmin={setIsAdmin}
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
      {/* Participated & Redeemed Row */}
      <Row
        className="mb-3"
        style={{
          marginTop: "10px",
          width: "100%",
        }}
      >
        {/* Participated Col */}
        <Col md={8}>
          <Card style={{ "box-shadow": "3px 3px 3px" }}>
            <CardHeader>
              <h5>DICKERs Participated In</h5>
            </CardHeader>
            <CardBody>
              {acceptedOffersData && businesses ? (
                <DickersParticipatedChart
                  filterStartDate={filterStartDate}
                  filterEndDate={filterEndDate}
                  filteredBusinesses={filteredBusinesses}
                  merchantId={merchantId}
                />
              ) : null}
            </CardBody>
          </Card>
        </Col>
        {/* Redeemed Col */}
        <Col md={4}>
          <Card style={{ "box-shadow": "3px 3px 3px" }}>
            <CardHeader>
              <h5>DICKERs Redeemed</h5>
            </CardHeader>
            <CardBody>
              {acceptedOffersData ? (
                <DickersRedeemedChart
                  acceptedOffersData={acceptedOffersDataFilteredByBusiness}
                  filterStartDate={filterStartDate}
                  filterEndDate={filterEndDate}
                  filteredBusinesses={filteredBusinesses}
                />
              ) : null}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* Spacer Row for Formatting */}
      <Row></Row>
      {/* Accepted and Potential Row */}
      <Row className="mb-3" style={{ width: "100%" }}>
        {/* Accepted Col */}
        <Col lg={4}>
          <Card style={{ "box-shadow": "3px 3px 3px" }}>
            <CardHeader>
              <h5>DICKERs Accepted</h5>
            </CardHeader>
            <CardBody>
              {acceptedOffersData ? (
                <AcceptedDickersChart
                  acceptedOffersData={acceptedOffersDataFilteredByBusiness}
                  filterStartDate={filterStartDate}
                  filterEndDate={filterEndDate}
                />
              ) : null}
            </CardBody>
          </Card>
        </Col>
        {/* Potential Col */}
        <Col lg={8}>
          <Card style={{ "box-shadow": "3px 3px 3px" }}>
            <CardHeader>
              <h5>Potential DICKERs</h5>
            </CardHeader>
            <CardBody>
              {acceptedOffersData ? (
                <PotentialDickersChart
                  filterStartDate={filterStartDate}
                  filterEndDate={filterEndDate}
                />
              ) : null}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
