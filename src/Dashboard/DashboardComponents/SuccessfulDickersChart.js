import React, { useState, useEffect } from "react";
import ResizableBox from "./ResizableBoxSmall";
import {
  ButtonDropdown,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Button,
  Table,
} from "reactstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const SuccessfulDickersChart = ({ data: newData }) => {
  const today = new Date();

  // Filter Accepted Offer Data into YTD Offers
  const filterDataYTD = () => {
    // Date variables for filtering
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 365);

    // Tracking Variables for Chart Data
    let totalAcceptedDickers = 0;
    let totalAcceptedWins = 0;

    // InGrid DICKERs
    let totalPotentialDickers = 0;
    let totalPotentialDickersWins = 0;

    // Wildcard DICKERs
    let totalWildcardDickers = 0;
    let totalWildcardWins = 0;

    // Direct DICKERs
    let totalDirectDickers = 0;
    let totalDirectWins = 0;

    // Discount
    let avgDiscount = 0;

    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (pastDate <= offerDate) {
          totalAcceptedDickers++;
          if (obj.Win === true) {
            totalAcceptedWins++;
            avgDiscount += obj.Discount;
          }
          if (obj.InGrid === true) {
            totalPotentialDickers++;
            if (obj.Win === true) {
              totalPotentialDickersWins++;
            }
          }
          if (obj.Wildcard === true) {
            totalWildcardDickers++;
            if (obj.Win === true) {
              totalWildcardWins++;
            }
          }
          if (obj.DirectDICKER === true && obj.Win === true) {
            totalDirectDickers++;
            if (obj.Win === true) {
              totalDirectWins++;
            }
          }
        }
      });
      avgDiscount = avgDiscount / totalAcceptedWins;
    } catch (err) {
      // console.log('err loading data');
    }

    return [
      totalAcceptedDickers, // 0
      totalPotentialDickers, // 1
      totalWildcardDickers, // 2
      totalDirectDickers, // 3
      totalAcceptedWins, // 4
      totalPotentialDickersWins, // 5
      totalWildcardWins, // 6
      totalDirectWins, // 7
      avgDiscount, // 8
    ];
  };

  // Output Filtered YTD Data
  const YTD = filterDataYTD();

  // Filter Accepted Offer Data into YTD Offers
  const filterDataMonth = () => {
    // Date variables for filtering
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 31);

    // Tracking Variables for Chart Data
    let totalAcceptedDickers = 0;
    let totalAcceptedWins = 0;

    // InGrid DICKERs
    let totalPotentialDickers = 0;
    let totalPotentialDickersWins = 0;

    // Wildcard DICKERs
    let totalWildcardDickers = 0;
    let totalWildcardWins = 0;

    // Direct DICKERs
    let totalDirectDickers = 0;
    let totalDirectWins = 0;

    // Discount
    let avgDiscount = 0;

    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (pastDate <= offerDate) {
          totalAcceptedDickers++;
          if (obj.Win === true) {
            totalAcceptedWins++;
            avgDiscount += obj.Discount;
          }
          if (obj.InGrid === true) {
            totalPotentialDickers++;
            if (obj.Win === true) {
              totalPotentialDickersWins++;
            }
          }
          if (obj.Wildcard === true) {
            totalWildcardDickers++;
            if (obj.Win === true) {
              totalWildcardWins++;
            }
          }
          if (obj.DirectDICKER === true && obj.Win === true) {
            totalDirectDickers++;
            if (obj.Win === true) {
              totalDirectWins++;
            }
          }
        }
      });
    } catch (err) {
      // console.log('err loading data');
    }

    return [
      totalAcceptedDickers, // 0
      totalPotentialDickers, // 1
      totalWildcardDickers, // 2
      totalDirectDickers, // 3
      totalAcceptedWins, // 4
      totalPotentialDickersWins, // 5
      totalWildcardWins, // 6
      totalDirectWins, // 7
      avgDiscount, // 8
    ];
  };

  // Output Filtered Month Data
  const monthOffers = filterDataMonth();

  // Filter Accepted Offer Data into Weekly Offers
  const filterDataWeek = () => {
    // Date variables for filtering
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 7);

    // Tracking Variables for Chart Data
    let totalAcceptedDickers = 0;
    let totalAcceptedWins = 0;

    // InGrid DICKERs
    let totalPotentialDickers = 0;
    let totalPotentialDickersWins = 0;

    // Wildcard DICKERs
    let totalWildcardDickers = 0;
    let totalWildcardWins = 0;

    // Direct DICKERs
    let totalDirectDickers = 0;
    let totalDirectWins = 0;

    // Discount
    let avgDiscount = 0;

    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (pastDate <= offerDate) {
          totalAcceptedDickers++;
          if (obj.Win === true) {
            totalAcceptedWins++;
            avgDiscount += obj.Discount;
          }
          if (obj.InGrid === true) {
            totalPotentialDickers++;
            if (obj.Win === true) {
              totalPotentialDickersWins++;
            }
          }
          if (obj.Wildcard === true) {
            totalWildcardDickers++;
            if (obj.Win === true) {
              totalWildcardWins++;
            }
          }
          if (obj.DirectDICKER === true && obj.Win === true) {
            totalDirectDickers++;
            if (obj.Win === true) {
              totalDirectWins++;
            }
          }
        }
      });
    } catch (err) {
      // console.log('err loading data');
    }

    return [
      totalAcceptedDickers, // 0
      totalPotentialDickers, // 1
      totalWildcardDickers, // 2
      totalDirectDickers, // 3
      totalAcceptedWins, // 4
      totalPotentialDickersWins, // 5
      totalWildcardWins, // 6
      totalDirectWins, // 7
      avgDiscount, // 8
    ];
  };

  // Output Filtered Weekly Data
  const weeklyOffers = filterDataWeek();

  // Filter Accepted Offer Data into Todays Offers
  const filterDataToday = () => {
    // Tracking Variables for Chart Data
    let totalAcceptedDickers = 0;
    let totalAcceptedWins = 0;

    // InGrid DICKERs
    let totalPotentialDickers = 0;
    let totalPotentialDickersWins = 0;

    // Wildcard DICKERs
    let totalWildcardDickers = 0;
    let totalWildcardWins = 0;

    // Direct DICKERs
    let totalDirectDickers = 0;
    let totalDirectWins = 0;

    // Discount
    let avgDiscount = 0;

    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (today.getDate() === offerDate.getDate()) {
          totalAcceptedDickers++;
          if (obj.Win === true) {
            totalAcceptedWins++;
            avgDiscount += obj.Discount;
          }
          if (obj.InGrid === true) {
            totalPotentialDickers++;
            if (obj.Win === true) {
              totalPotentialDickersWins++;
            }
          }
          if (obj.Wildcard === true) {
            totalWildcardDickers++;
            if (obj.Win === true) {
              totalWildcardWins++;
            }
          }
          if (obj.DirectDICKER === true && obj.Win === true) {
            totalDirectDickers++;
            if (obj.Win === true) {
              totalDirectWins++;
            }
          }
        }
      });
    } catch (err) {
      // console.log('err loading data');
    }

    return [
      totalAcceptedDickers, // 0
      totalPotentialDickers, // 1
      totalWildcardDickers, // 2
      totalDirectDickers, // 3
      totalAcceptedWins, // 4
      totalPotentialDickersWins, // 5
      totalWildcardWins, // 6
      totalDirectWins, // 7
      avgDiscount, // 8
    ];
  };

  // Output Filtered Today Data
  const todayOffers = filterDataToday();

  // Load Filtered data into output object
  let chartData = [
    {
      label: "Dickers",
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

  // Filter dropdown box logic
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [activeFilter, setActiveFilter] = useState("ytd");

  const { timeframe } = chartData[0].datum[0];
  useEffect(() => {
    setActiveFilter(timeframe.toLowerCase());
  }, [timeframe]);

  const handleClick = (event) => {
    setActiveFilter(event.target.id);
  };

  const displayData = chartData[0].datum.find(
    (item) => item.timeframe.toLowerCase() === activeFilter
  );

  // console.log(displayData, displayData.deals);
  const [drilldown, setDrilldown] = useState(false);
  const handleDrilldown = () => {
    setDrilldown(!drilldown);
  };

  return newData === undefined ? (
    <div>Filtering Chart Data... </div>
  ) : (
    <Container>
      <Row>
        <ResizableBox>
          <Col>
            <h5>{activeFilter.toUpperCase()}</h5>
          </Col>
          <Col lg={0}>
            <p>
              <strong>Accepted Total: </strong>
            </p>
            <p>{displayData.deals[0]}</p>
          </Col>
          {/* <Col lg={0}>
            <p><strong>DICKER Win % While InGrid: </strong></p>
            <p>{displayData[1] < 0 ? 'No Data' : displayData.deals[1] / displayData.deals[0] * 100 + '%'}</p>
          </Col> */}
          <Col lg={0}>
            <p>
              <strong>Wildcard Wins: </strong>
            </p>
            <p>{displayData.deals[2]}</p>
          </Col>
          <Col lg={0}>
            <p>
              <strong>Direct DICKER Wins: </strong>
            </p>
            <p>{displayData.deals[3]}</p>
          </Col>
        </ResizableBox>
      </Row>
      <Row>
        <Button onClick={handleDrilldown} color={"warning"}>
          Drilldown
        </Button>
        {drilldown && (
          <Row>
            <h5>Accepted Dicker Drilldown</h5>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>DICKER Win % While InGrid</TableCell>
                  <TableCell>Wildcard DICKER % of Total Wins</TableCell>
                  <TableCell>Direct DICKER Wins % of Total Wins</TableCell>
                  <TableCell>DICKER Win % Avg Discount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {isNaN((displayData.deals[1] / displayData.deals[0]) * 100)
                      ? "No Data"
                      : (displayData.deals[1] / displayData.deals[0]) * 100 +
                        "%"}
                  </TableCell>
                  <TableCell>
                    {isNaN((displayData.deals[5] / displayData.deals[4]) * 100)
                      ? "No Data"
                      : (displayData.deals[5] / displayData.deals[4]) * 100 +
                        "%"}
                  </TableCell>
                  <TableCell>
                    {isNaN((displayData.deals[7] / displayData.deals[4]) * 100)
                      ? "No Data"
                      : (displayData.deals[7] / displayData.deals[4]) * 100 +
                        "%"}
                  </TableCell>
                  <TableCell>{displayData.deals[8] + "%"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Row>
        )}
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
                value={chartData[0].datum[0]}
              >
                YTD
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"month"}
                value={chartData[0].datum[1]}
              >
                This Month
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"week"}
                value={chartData[0].datum[2]}
              >
                This Week
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"today"}
                value={chartData[0].datum[3]}
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
