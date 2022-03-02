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
import subcategories from "./SampleData/subcategory.json";

const DickersRedeemedChart = ({ data: newData }) => {
  const [drilldown, setDrilldown] = useState(false);
  const today = new Date();
  let categories = subcategories;

  // Building categories array to track SubCategories data
  const buildCategories = () => {
    categories.forEach((cat) => {
      cat.SubCategoryTotal = 0;
    });
  };
  buildCategories();

  // Filter Accepted Offer Data into YTD Offers
  const filterDataYTD = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 365);

    // console.log(newData);
    try {
      newData.forEach((obj) => {
        totalDickersWon++;
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalRedeemedDickers++;
          categories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal += 1;
            }
          });
        }
      });
    } catch (err) {}

    return [totalRedeemedDickers, totalDickersWon];
  };

  // Output Filtered YTD Data
  const YTD = filterDataYTD();

  // Filter Accepted Offer Data into YTD Offers
  const filterDataMonth = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 31);

    try {
      newData.forEach((obj) => {
        totalDickersWon++;
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalRedeemedDickers++;
          categories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal += 1;
            }
          });
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }

    return [totalRedeemedDickers, totalDickersWon];
  };

  // Output Filtered Month Data
  const monthOffers = filterDataMonth();

  // Filter Accepted Offer Data into Weekly Offers
  const filterDataWeek = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 7);

    try {
      newData.forEach((obj) => {
        totalDickersWon++;
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalRedeemedDickers++;
          categories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal += 1;
            }
          });
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }

    return [totalRedeemedDickers, totalDickersWon];
  };

  // Output Filtered Weekly Data
  const weeklyOffers = filterDataWeek();

  // Filter Accepted Offer Data into Todays Offers
  const filterDataToday = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;

    try {
      newData.forEach((obj) => {
        totalDickersWon++;
        const offerDate = new Date(obj.Created);
        if (today.getDate() === offerDate.getDate()) {
          if (obj.IsRedeemed) {
            totalRedeemedDickers++;
          }
          categories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal += 1;
            }
          });
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }

    return [totalRedeemedDickers, totalDickersWon];
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

  const handleDrilldown = () => {
    setDrilldown(!drilldown);
  };

  // console.log(displayData, displayData.deals);

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
              <strong>Redeemed Total: </strong>
            </p>
            <p>{displayData.deals[0]}</p>
          </Col>
          <Col>
            <p>
              <strong>Redeemed % of Won: </strong>
            </p>
            <p>
              {Math.round((displayData.deals[0] / displayData.deals[1]) * 100)}%
            </p>
          </Col>
        </ResizableBox>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleDrilldown} color={"warning"}>
            Drilldown
          </Button>
          {drilldown && (
            <Row>
              <h5>SubCategory Count</h5>
              <Table>
                <TableHead>
                  <TableRow>
                    {categories.map((cat) => (
                      <TableCell>{cat.SubCategoryName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {categories.map((cat) => (
                      <TableCell>{cat.SubCategoryTotal}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Row>
          )}
        </Col>
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
