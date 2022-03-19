import React, { useState } from "react";
import { Chart } from "react-charts";
import { Table, Row, Button, Container, Col, Spinner } from "reactstrap";
import ResizableBox from "./ResizableBox";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useGetData } from "../../api/useGetData";

const offersUrl = "/api/offers";

const DickersParticipatedChart = ({ filterStartDate, filterEndDate }) => {
  const [drilldown, setDrilldown] = useState(false);
  const [offersData, offersDataisLoading] = useGetData(offersUrl);

  const buildInputData = () => {
    // Array of Objects that will hold various datum based upon selected time intervals.
    let inputData = [
      {
        label: "Direct DICKERs",
        data: [
          {
            primary: "Monday",
            secondary: 0,
          },
          {
            primary: "Tuesday",
            secondary: 0,
          },
          {
            primary: "Wednesday",
            secondary: 0,
          },
          {
            primary: "Thursday",
            secondary: 0,
          },
          {
            primary: "Friday",
            secondary: 0,
          },
          {
            primary: "Saturday",
            secondary: 0,
          },
          {
            primary: "Sunday",
            secondary: 0,
          },
        ],
      },
      {
        label: "Wildcard DICKERs",
        data: [
          {
            primary: "Monday",
            secondary: 0,
          },
          {
            primary: "Tuesday",
            secondary: 0,
          },
          {
            primary: "Wednesday",
            secondary: 0,
          },
          {
            primary: "Thursday",
            secondary: 0,
          },
          {
            primary: "Friday",
            secondary: 0,
          },
          {
            primary: "Saturday",
            secondary: 0,
          },
          {
            primary: "Sunday",
            secondary: 0,
          },
        ],
      },
      {
        label: "Selected to DICKERs",
        data: [
          {
            primary: "Monday",
            secondary: 0,
          },
          {
            primary: "Tuesday",
            secondary: 0,
          },
          {
            primary: "Wednesday",
            secondary: 0,
          },
          {
            primary: "Thursday",
            secondary: 0,
          },
          {
            primary: "Friday",
            secondary: 0,
          },
          {
            primary: "Saturday",
            secondary: 0,
          },
          {
            primary: "Sunday",
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
          if (offer.Monday) {
            inputData[0].data[0].secondary++;
          }
          if (offer.Tuesday) {
            inputData[0].data[1].secondary++;
          }
          if (offer.Wednesday) {
            inputData[0].data[2].secondary++;
          }
          if (offer.Thursday) {
            inputData[0].data[3].secondary++;
          }
          if (offer.Friday) {
            inputData[0].data[4].secondary++;
          }
          if (offer.Saturday) {
            inputData[0].data[5].secondary++;
          }
          if (offer.Sunday) {
            inputData[0].data[6].secondary++;
          }
        }

        // Building Wildcard DICKERs Object
        if (offer.Wildcard) {
          if (offer.Monday) {
            inputData[1].data[0].secondary++;
          }
          if (offer.Tuesday) {
            inputData[1].data[1].secondary++;
          }
          if (offer.Wednesday) {
            inputData[1].data[2].secondary++;
          }
          if (offer.Thursday) {
            inputData[1].data[3].secondary++;
          }
          if (offer.Friday) {
            inputData[1].data[4].secondary++;
          }
          if (offer.Saturday) {
            inputData[1].data[5].secondary++;
          }
          if (offer.Sunday) {
            inputData[1].data[6].secondary++;
          }
        }

        // Building Selected to DICKER Object
        if (offer.InGrid) {
          if (offer.Monday) {
            inputData[2].data[0].secondary++;
          }
          if (offer.Tuesday) {
            inputData[2].data[1].secondary++;
          }
          if (offer.Wednesday) {
            inputData[2].data[2].secondary++;
          }
          if (offer.Thursday) {
            inputData[2].data[3].secondary++;
          }
          if (offer.Friday) {
            inputData[2].data[4].secondary++;
          }
          if (offer.Saturday) {
            inputData[2].data[5].secondary++;
          }
          if (offer.Sunday) {
            inputData[2].data[6].secondary++;
          }
        }
      });
    } catch (err) {}

    // console.log(inputData);
    return inputData;
  };
  const displayData = buildInputData();

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => String(datum.primary),
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

  const handleDrilldown = () => {
    setDrilldown(!drilldown);
  };

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
    let daysObj = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    const countDayTotals = (obj) => {
      for (let day in obj) {
        try {
          offersData.forEach((row) => {
            if (row[day] === true) obj[day] += 1;
          });
        } catch {}
      }
      return obj;
    };
    countDayTotals(daysObj);

    const findMostActiveDay = (obj) => {
      let mostActive = Object.keys(obj)[0];
      let num = obj.Monday;
      for (let day in obj) {
        if (obj[day] > num) {
          num = obj[day];
          mostActive = day;
        }
      }
      return mostActive;
    };
    const mostActive = findMostActiveDay(daysObj);

    const findLeastActiveDay = (obj) => {
      let leastActive = Object.keys(obj)[0];
      let num = obj.Monday;
      for (let day in obj) {
        if (obj[day] < num) {
          num = obj[day];
          leastActive = day;
        }
      }
      return leastActive;
    };
    const leastActive = findLeastActiveDay(daysObj);

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

  if (offersDataisLoading)
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
          <h5>Participated DICKER Totals</h5>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total Participated DICKERs</TableCell>
                <TableCell>Selected to DICKER Count</TableCell>
                <TableCell>Selected to DICKER %</TableCell>
                <TableCell>Wildcard DICKERs Count</TableCell>
                <TableCell>Wildcard DICKERs %</TableCell>
                <TableCell>Direct DICKERs Count</TableCell>
                <TableCell>Direct DICKERs %</TableCell>
                <TableCell>Most Active Day</TableCell>
                <TableCell>Least Active Day</TableCell>
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

export default DickersParticipatedChart;
