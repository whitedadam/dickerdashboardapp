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

const DickersRedeemedChart = ({ acceptedOffersData: newData }) => {
  const today = new Date();

  const prepCategories = (arr) => {
    arr.forEach((cat) => {
      cat.SubCategoryTotal = 0;
    })
    return arr;
  } 
  prepCategories(subcategories);


  // Filter Accepted Offer Data into YTD Offers
  const filterDataYTD = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;

    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 365);

    let ytdCategories = JSON.parse(JSON.stringify(subcategories));

    try {
      newData.forEach((obj) => {
        totalDickersWon++;
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalRedeemedDickers++;
          ytdCategories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal += 1;
            }
          });
        }
      });
    } catch (err) {}

    return [totalRedeemedDickers, totalDickersWon, ytdCategories];
  };

  // Output Filtered YTD Data
  const YTD = filterDataYTD();

  // Filter Accepted Offer Data into YTD Offers
  const filterDataMonth = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;

    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 31);

    let monthCategories = JSON.parse(JSON.stringify(subcategories));
    
    try {
      newData.forEach((obj) => {
        totalDickersWon++;
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalRedeemedDickers++;
          monthCategories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal++;
            }
          });
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }

    return [totalRedeemedDickers, totalDickersWon, monthCategories];
  };

  // Output Filtered Month Data
  const monthOffers = filterDataMonth();

  // Filter Accepted Offer Data into Weekly Offers
  const filterDataWeek = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;

    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 7);

    let weekCategories = JSON.parse(JSON.stringify(subcategories));

    try {
      newData.forEach((obj) => {
        totalDickersWon++;
        const offerDate = new Date(obj.Created);
        if (obj.IsRedeemed && pastDate <= offerDate) {
          totalRedeemedDickers++;
          weekCategories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal++;
            }
          });
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }

    return [totalRedeemedDickers, totalDickersWon, weekCategories];
  };

  // Output Filtered Weekly Data
  const weeklyOffers = filterDataWeek();

  // Filter Accepted Offer Data into Todays Offers
  const filterDataToday = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;

    let todayCategories = JSON.parse(JSON.stringify(subcategories));

    try {
      newData.forEach((obj) => {
        totalDickersWon++;
        const offerDate = new Date(obj.Created);
        if (today.getDate() === offerDate.getDate()) {
          if (obj.IsRedeemed) {
            totalRedeemedDickers++;
            todayCategories.forEach((cat) => {
              if (cat.SubCategoryId === obj.SubCategory_FK) {
                cat.SubCategoryTotal++;
              }
            });
          }
        }
      });
    } catch (err) {
      // console.log("err loading data");
    }
    return [totalRedeemedDickers, totalDickersWon, todayCategories];
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

  const [drilldown, setDrilldown] = useState(false);
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
                    {displayData.deals[2].map((cat) => (
                      <TableCell>{cat.SubCategoryName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {displayData.deals[2].map((cat) => (
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
