import React, { useState } from "react";
import { Chart } from "react-charts";
import { Table, Row, Button, Container, Col } from "reactstrap";
import ResizableBox from "./ResizableBox";
import test from "./test.json";
import offertest from "./sample-response.json";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// const getData = async () => {
//   const url = "/offers";
//   let headers = new Headers({
//     "Content-Type": "application/json",
//   });
//   const resp = await fetch(url, {
//     headers,
//   });

//   console.log("getData", resp);

//   const data = await resp.json();

//   return data;
// };

// const useGetData = () => {
//   const [data, setData] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const getMyData = async () => {
//       setIsLoading(true);
//       const resp = await getData();
//       setData(resp);
//       setIsLoading(false);
//     };

//     getMyData();
//   }, []);

//   return [data, isLoading];
// };

// const foo = test;

const SampleChart = () => {
  // const [data, isLoading] = useGetData();
  const [drilldown, setDrilldown] = useState(false);
  // const today = new Date();

  //   const { data: oldData } = DickersParticipatedSampleData({
  //     series: 3,
  //     dataType: "ordinal",
  //   });

  //   console.log(data, JSON.stringify(oldData));

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
    const directDickers = test[0].data;
    const wildcardDickers = test[1].data;
    const selectedDickers = test[2].data;

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
    totalDirect = countOfferTotals(directDickers, totalDirect, dickerTypeTotalsArrOut);
    totalWildcard = countOfferTotals(wildcardDickers, totalWildcard, dickerTypeTotalsArrOut);
    totalSelected = countOfferTotals(selectedDickers, totalSelected, dickerTypeTotalsArrOut);

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
        offertest.forEach((row) => {
          if (row[day] === true) obj[day] += 1;
        });
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

  return (
    <Container>
      <ResizableBox>
        <h5>DICKERs Participated In</h5>
        <Chart
          options={{
            data: test,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
      <Row>
        <br></br>
        <br></br>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleDrilldown} color="warning">
            Participated DICKERS Drilldown
          </Button>
        </Col>
      </Row>
      {drilldown && (
        <Row>
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
                <TableCell>Most Active Day</TableCell>
                <TableCell>Least Active Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{drilldownData[0]}</TableCell>
                <TableCell>{drilldownData[1][2].total}</TableCell>
                <TableCell>{drilldownData[2][2].percentage}%</TableCell>
                <TableCell>{drilldownData[1][1].total}</TableCell>
                <TableCell>{drilldownData[2][1].percentage}%</TableCell>
                <TableCell>{drilldownData[1][0].total}</TableCell>
                <TableCell>{drilldownData[2][0].percentage}%</TableCell>
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

export default SampleChart;
