import React, { useState } from "react";
import ResizableBox from "./ResizableBoxSmall";
import {
  ButtonDropdown,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
// import PropTypes from "prop-types";

//
// ReactStrap install
// npm install --save bootstrap@^4.0.0 reactstrap
//

const SuccessfulDickersChart = () => {
  let data = [
    {
      label: "Dickers",
      datum: [
        {
          timeframe: "YTD",
          deals: 15,
        },
        {
          timeframe: "Past Month",
          deals: 6,
        },
        {
          timeframe: "This Week",
          deals: 4,
        },
        {
          timeframe: "Today",
          deals: 2,
        },
      ],
    },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [currentDataTimeFrame, setCurrentDataTimeFrame] = useState(
    data[0].datum[0].timeframe
  ); // data[0].datum[0];
  const [currentDataDeals, setCurrentDataDeals] = useState(
    data[0].datum[0].deals
  );
  const handleClick = (e, currentData) => {
    let id = e.target.id;
    console.log(id);
    if (id === "ytd") {
      setCurrentDataTimeFrame((prevState) => data[0].datum[0].timeframe);
      setCurrentDataDeals((prevState) => data[0].datum[0].deals);
    }
    if (id === "month") {
      setCurrentDataTimeFrame((prevState) => data[0].datum[1].timeframe);
      setCurrentDataDeals((prevState) => data[0].datum[1].deals);
    }
    if (id === "week") {
      setCurrentDataTimeFrame((prevState) => data[0].datum[2].timeframe);
      setCurrentDataDeals((prevState) => data[0].datum[2].deals);
    }
    if (id === "today") {
      setCurrentDataTimeFrame((prevState) => data[0].datum[3].timeframe);
      setCurrentDataDeals((prevState) => data[0].datum[3].deals);
    }
  };

  return (
    <Container>
      <Row>
        <ResizableBox>
          <Row>
            <Col>
              <h5>Successful DICKERs</h5>
            </Col>
            <Col> </Col>
          </Row>
          <Row fluid>
            <Col lg={0}>
              <h5>{currentDataTimeFrame}</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={4}> </Col>
            <Col lg={0}>
              <h1>{currentDataDeals}</h1>
            </Col>
            <Col xs={4}> </Col>
          </Row>
        </ResizableBox>
      </Row>
      <Row>
        <Col> </Col>
        <Col> </Col>
        <Col>
          <ButtonDropdown
            isOpen={dropdownOpen}
            onClick={toggle}
            id={"successDropdown"}
          >
            <DropdownToggle caret>Filter Timeline</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select Date Filter</DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"ytd"}
                value={data[0].datum[0]}
              >
                YTD
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"month"}
                value={data[0].datum[1]}
              >
                This Month
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"week"}
                value={data[0].datum[2]}
              >
                This Week
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"today"}
                value={data[0].datum[3]}
              >
                Today
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessfulDickersChart;
