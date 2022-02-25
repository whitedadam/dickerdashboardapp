import React, { useState, useEffect } from "react";
import ResizableBox from "./ResizableBoxSmall";
import {
  ButtonDropdown,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from "reactstrap";

const DickersRedeemedChart = ({ data: newData }) => {
  const today = new Date();

  // Filter Accepted Offer Data into YTD Offers
  const filterDataYTD = () => {
    let totalDickers = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 365);

    // console.log(newData);
    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalDickers++;
        }
      });
      // console.log(newData);
    } catch (err) {
      // console.log("err loading data");
    }

    return totalDickers;
  };

  // Output Filtered YTD Data
  const YTD = filterDataYTD();

  // Filter Accepted Offer Data into YTD Offers
  const filterDataMonth = () => {
    let totalDickers = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 31);

    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalDickers++;
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }

    return totalDickers;
  };

  // Output Filtered Month Data
  const monthOffers = filterDataMonth();

  // Filter Accepted Offer Data into Weekly Offers
  const filterDataWeek = () => {
    let totalDickers = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 7);

    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalDickers++;
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }

    return totalDickers;
  };

  // Output Filtered Weekly Data
  const weeklyOffers = filterDataWeek();

  // Filter Accepted Offer Data into Todays Offers
  const filterDataToday = () => {
    let totalDickers = 0;

    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && today.getDate() === offerDate.getDate()) {
          totalDickers++;
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }

    return totalDickers;
  };

  // Output Filtered Today Data
  const todayOffers = filterDataToday();

  // Load Filtered data into output object
  let data = [
    {
      label: "Dickers Redeemed",
      datum: [
        {
          timeframe: "YTD",
          deals: YTD,
        },
        {
          timeframe: "Month",
          deals: monthOffers,
        },
        {
          timeframe: "Week",
          deals: weeklyOffers,
        },
        {
          timeframe: "Today",
          deals: todayOffers,
        },
      ],
    },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [activeFilter, setActiveFilter] = useState("ytd");

  const { timeframe } = data[0].datum[0];
  useEffect(() => {
    setActiveFilter(timeframe.toLowerCase());
  }, [timeframe]);

  const handleClick = (event) => {
    setActiveFilter(event.target.id);
  };

  const displayData = data[0].datum.find(
    (item) => item.timeframe.toLowerCase() === activeFilter
  );

  // console.log(displayData, displayData.deals);

  return newData === undefined ? (
    <div>Filtering Chart Data... </div>
  ) : (
    <Container>
      <Row>
        <ResizableBox>
          <Row>
            <Col>
              <h5>DICKERs Redeemed</h5>
            </Col>
            <Col> </Col>
          </Row>
          <Row> {/* fluid */}
            <Col lg={0}>
              <h5>{activeFilter.toUpperCase()}</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={4}> </Col>
            <Col lg={0}>
              <h1>{displayData.deals}</h1>
            </Col>
            <Col xs={4}> </Col>
          </Row>
        </ResizableBox>
      </Row>
      <Row>
        <Col>
          <ButtonDropdown
            isOpen={dropdownOpen}
            onClick={toggle}
            id={"successDropdown"}
          >
            <DropdownToggle caret color={dropdownOpen ? "dark" : "warning"}>
              Filter Timeline
            </DropdownToggle>
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

export default DickersRedeemedChart;
