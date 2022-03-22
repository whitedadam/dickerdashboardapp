import React, { useState } from "react";
import { Chart } from "react-charts";
import ResizableBox from "./ResizableBox";
import { Container, Row, Col, Spinner, Button, Table } from "reactstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import offers from '../../api/SampleData/offers.json';

// const offersUrl = "/api/offers";

const PotentialDickersChart = ({ filterStartDate, filterEndDate }) => {
  const [drilldown, setDrilldown] = useState(false);
  const [offersData, offersDataIsLoading] = [offers, false];

  const buildInputData = () => {
    // Array of Objects that will hold various datum based upon selected time intervals.
    let inputData = [
      {
        label: "Direct DICKERs",
        data: [
          {
            primary: "Casual Dining",
            secondary: 0,
          },
          {
            primary: "Fast Food",
            secondary: 0,
          },
          {
            primary: "Restaurants General",
            secondary: 0,
          },
          {
            primary: "Specialty",
            secondary: 0,
          },
          {
            primary: "Hotels",
            secondary: 0,
          },
          {
            primary: "Air Fare",
            secondary: 0,
          },
          {
            primary: "Automotive General",
            secondary: 0,
          },
        ],
      },
      {
        label: "Wildcard DICKERs",
        data: [
          {
            primary: "Casual Dining",
            secondary: 0,
          },
          {
            primary: "Fast Food",
            secondary: 0,
          },
          {
            primary: "Restaurants General",
            secondary: 0,
          },
          {
            primary: "Specialty",
            secondary: 0,
          },
          {
            primary: "Hotels",
            secondary: 0,
          },
          {
            primary: "Air Fare",
            secondary: 0,
          },
          {
            primary: "Automotive General",
            secondary: 0,
          },
        ],
      },
      {
        label: "Selected to DICKERs",
        data: [
          {
            primary: "Casual Dining",
            secondary: 0,
          },
          {
            primary: "Fast Food",
            secondary: 0,
          },
          {
            primary: "Restaurants General",
            secondary: 0,
          },
          {
            primary: "Specialty",
            secondary: 0,
          },
          {
            primary: "Hotels",
            secondary: 0,
          },
          {
            primary: "Air Fare",
            secondary: 0,
          },
          {
            primary: "Automotive General",
            secondary: 0,
          },
        ],
      },
    ];

    // Filtering Offer data between availble DICKER types
    try {
      let startFilter = new Date(filterStartDate);
      let endFilter = new Date(filterEndDate);
      let offers = offersData.filter((offer) => {
        let offerDate = new Date(offer.StartingDate);
        return offerDate > startFilter && offerDate <= endFilter;
      });

      offers.forEach((offer) => {
        // Building Direct DICKERs Object
        if (offer.DirectDICKER) {
          if (offer.SubCategory_FK === 1) {
            inputData[0].data[0].secondary++;
          }
          if (offer.SubCategory_FK === 2) {
            inputData[0].data[1].secondary++;
          }
          if (offer.SubCategory_FK === 3) {
            inputData[0].data[2].secondary++;
          }
          if (offer.SubCategory_FK === 4) {
            inputData[0].data[3].secondary++;
          }
          if (offer.SubCategory_FK === 5) {
            inputData[0].data[4].secondary++;
          }
          if (offer.SubCategory_FK === 6) {
            inputData[0].data[5].secondary++;
          }
          if (offer.SubCategory_FK === 7) {
            inputData[0].data[6].secondary++;
          }
        }

        // Building Wildcard DICKERs Object
        if (offer.Wildcard) {
          if (offer.SubCategory_FK === 1) {
            inputData[1].data[0].secondary++;
          }
          if (offer.SubCategory_FK === 2) {
            inputData[1].data[1].secondary++;
          }
          if (offer.SubCategory_FK === 3) {
            inputData[1].data[2].secondary++;
          }
          if (offer.SubCategory_FK === 4) {
            inputData[1].data[3].secondary++;
          }
          if (offer.SubCategory_FK === 5) {
            inputData[1].data[4].secondary++;
          }
          if (offer.SubCategory_FK === 6) {
            inputData[1].data[5].secondary++;
          }
          if (offer.SubCategory_FK === 7) {
            inputData[1].data[6].secondary++;
          }
        }

        // Building Selected to DICKER Object
        if (offer.InGrid) {
          if (offer.SubCategory_FK === 1) {
            inputData[2].data[0].secondary++;
          }
          if (offer.SubCategory_FK === 2) {
            inputData[2].data[1].secondary++;
          }
          if (offer.SubCategory_FK === 3) {
            inputData[2].data[2].secondary++;
          }
          if (offer.SubCategory_FK === 4) {
            inputData[2].data[3].secondary++;
          }
          if (offer.SubCategory_FK === 5) {
            inputData[2].data[4].secondary++;
          }
          if (offer.SubCategory_FK === 6) {
            inputData[2].data[5].secondary++;
          }
          if (offer.SubCategory_FK === 7) {
            inputData[2].data[6].secondary++;
          }
        }
      });
    } catch (err) {}

    return inputData;
  };
  const displayData = buildInputData();

  const dataTotals = () => {
    // Variables to hold all DICKER datatypes and data
    const directDickers = displayData[0].data;
    const wildcardDickers = displayData[1].data;
    const selectedDickers = displayData[2].data;

    // Gathering all of the available DICKER type data into one place
    let totalDirect = 0;
    let totalWildcard = 0;
    let totalSelected = 0;
    let dickerTypeTotalsArrOut = [];

    // Gathering totals of all individual DICKER types
    const countOfferTotals = (arr, total, out) => {
      arr.forEach((obj) => {
        total += obj.secondary;
      });
      out.push({ total });
      return total;
    };
    totalDirect = countOfferTotals(
      directDickers,
      totalDirect,
      dickerTypeTotalsArrOut
    );
    totalWildcard = countOfferTotals(
      wildcardDickers,
      totalWildcard,
      dickerTypeTotalsArrOut
    );
    totalSelected = countOfferTotals(
      selectedDickers,
      totalSelected,
      dickerTypeTotalsArrOut
    );

    // Gathering total count of all Potential DICKERs
    let totalPotentialDickers = 0;
    dickerTypeTotalsArrOut.forEach((total) => {
      totalPotentialDickers += total.total;
    });

    // Calculating percentages of each specific DICKER data type
    let percentageDirect;
    let percentageWildcard;
    let percentageSelected;
    let dickerTypePercentagesArrOut = [];

    const calcOfferPercentages = (dickers, total, percentage, out) => {
      percentage = ((dickers / total) * 100).toFixed();
      out.push({ percentage });
    };
    calcOfferPercentages(
      totalDirect,
      totalPotentialDickers,
      percentageDirect,
      dickerTypePercentagesArrOut
    );
    calcOfferPercentages(
      totalWildcard,
      totalPotentialDickers,
      percentageWildcard,
      dickerTypePercentagesArrOut
    );
    calcOfferPercentages(
      totalSelected,
      totalPotentialDickers,
      percentageSelected,
      dickerTypePercentagesArrOut
    );

    // Gathering specific data on which days were most/least active
    let catsObj = {
      "Casual Dining": 0,
      "Fast Food": 0,
      "Restaurants General": 0,
      Specialty: 0,
      Hotels: 0,
      "Air Fare": 0,
      "Automotive General": 0,
    };

    const countCatTotals = (obj) => {
      for (let cat in obj) {
        try {
          offersData.forEach((row) => {
            if (row[cat] === true) obj[cat] += 1;
          });
        } catch (err) {}
      }
      return obj;
    };
    countCatTotals(catsObj);

    const findMostActiveCat = (obj) => {
      let mostActive = Object.keys(obj)[0];
      let num = obj["Casual Dining"];
      for (let cat in obj) {
        if (obj[cat] > num) {
          num = obj[cat];
          mostActive = cat;
        }
      }
      return mostActive;
    };
    const mostActive = findMostActiveCat(catsObj);

    const findLeastActiveCat = (obj) => {
      let leastActive = Object.keys(obj)[0];
      let num = obj["Casual Dining"];
      for (let cat in obj) {
        if (obj[cat] < num) {
          num = obj[cat];
          leastActive = cat;
        }
      }
      return leastActive;
    };
    const leastActive = findLeastActiveCat(catsObj);

    // Returning all filtered data
    return [
      totalPotentialDickers,
      dickerTypeTotalsArrOut,
      dickerTypePercentagesArrOut,
      mostActive,
      leastActive,
    ];
  };

  const drilldownData = dataTotals();

  const handleDrilldown = () => {
    setDrilldown(!drilldown);
  };

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  if (offersDataIsLoading)
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
    <Container>
      <Row>
        <ResizableBox>
          <Chart
            options={{
              data: displayData,
              primaryAxis,
              secondaryAxes,
            }}
          />
        </ResizableBox>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleDrilldown} color="warning">
            Drilldown
          </Button>
        </Col>
      </Row>
      {drilldown && (
        <Row>
          <h5>Potential DICKER Totals</h5>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total Potential DICKERs</TableCell>
                <TableCell>Selected to DICKER Count</TableCell>
                <TableCell>Selected to DICKER %</TableCell>
                <TableCell>Wildcard DICKERs Count</TableCell>
                <TableCell>Wildcard DICKERs %</TableCell>
                <TableCell>Direct DICKERs Count</TableCell>
                <TableCell>Direct DICKERs %</TableCell>
                <TableCell>Most Active SubCategory</TableCell>
                <TableCell>Least Active SubCategory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{drilldownData[0]}</TableCell>
                <TableCell>{drilldownData[1][2].total}</TableCell>
                <TableCell>
                  {isNaN(drilldownData[2][2].percentage)
                    ? "No Data"
                    : drilldownData[2][2].percentage + "%"}
                </TableCell>
                <TableCell>{drilldownData[1][1].total}</TableCell>
                <TableCell>
                  {isNaN(drilldownData[2][1].percentage)
                    ? "No Data"
                    : drilldownData[2][1].percentage + "%"}
                </TableCell>
                <TableCell>{drilldownData[1][0].total}</TableCell>
                <TableCell>
                  {isNaN(drilldownData[2][0].percentage)
                    ? "No Data"
                    : drilldownData[2][0].percentage + "%"}
                </TableCell>
                <TableCell>{drilldownData[3]}</TableCell>
                <TableCell>{drilldownData[4]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Row>
      )}
    </Container>
  );
};

export default PotentialDickersChart;
