import React, { useState } from "react";
import { Chart } from "react-charts";
import { Table, Row, Button, Container, Col } from "reactstrap";
import ResizableBox from "./ResizableBox";
import test from "./test.json";
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

  const filterData = () => {
    const directDickers = test[0].data;
    const wildcardDickers = test[1].data;
    const selectedDickers = test[2].data;
    let totalDirect = 0;
    let totalWildcard = 0;
    let totalSelected = 0;

    let arrOut = [];

    const filterArr = (arr, total, out, arrName) => {
      arr.forEach((obj) => {
        total += obj.secondary;
      });
      out.push({ total });
    };

    filterArr(directDickers, totalDirect, arrOut, "directDickers");
    filterArr(wildcardDickers, totalWildcard, arrOut, "wildcardDickers");
    filterArr(selectedDickers, totalSelected, arrOut, "selectedDickers");

    console.log(arrOut);

    return arrOut;
  };

  const drilldownData = filterData();

  return (
    <Container>
      <Row>
        <ResizableBox>
          {/* <h5>DICKERs Participated In</h5> */}
          <Chart
            options={{
              data: test,
              primaryAxis,
              secondaryAxes,
            }}
          />
        </ResizableBox>
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
                <TableCell>Selected to DICKER Totals</TableCell>
                <TableCell>Wildcard DICKERs Totals</TableCell>
                <TableCell>Direct DICKERs Totals</TableCell>
                <TableCell>Most Active Day</TableCell>
                <TableCell>Least Active Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{drilldownData[2].total}</TableCell>
                <TableCell>{drilldownData[1].total}</TableCell>
                <TableCell>{drilldownData[0].total}</TableCell>
                <TableCell>Monday</TableCell>
                <TableCell>Sunday</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Row>
      )}
    </Container>
  );
};

export default SampleChart;
