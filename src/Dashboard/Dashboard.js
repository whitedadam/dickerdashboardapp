import React, { useState, useEffect } from "react";
import {
  PotentialDickersChart,
  DickersParticipatedChart,
  SuccessfulDickersChart,
  DickersRedeemedChart,
} from "./DashboardComponents/index";
import { Col, Container, Row } from "reactstrap";

// const getData = async () => {
//   const url = '/accepted-offers';
//   let myHeaders = new Headers({
//     'Content-Type': 'application/json'
//   });
//   const resp = await fetch(url,{
//     headers: myHeaders
//   })
//     .then(resp => resp.json())
//     .then((json) => {
//     return json;
//   });

//   return resp;
// };

// const useGetData = () => {
//   const [data, setData] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//       const getMyData = async () => {
//       setIsLoading(true);
//       const resp = await getData();
//       setData(resp);
//       setIsLoading(false);
//       };

//       getMyData();
//   }, []);

// return [data, isLoading];
// };


const Dashboard = (userAuth, isAdmin) => {
  // const [data, isLoading] = useGetData();

  // if (isLoading)
  //   return <>Loading chart data...</>
  
  return (
    <Container className={"dashboardContainer"}>
      <Row>
        <Col>
          <h3>Dashboards</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"8"}>
          {/* <TestComponent /> */}
          <DickersParticipatedChart />
        </Col>
        <Col xs={"4"}>
          <DickersRedeemedChart />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"4"}>
          <SuccessfulDickersChart />
        </Col>
        <Col xs={"8"}>
          <PotentialDickersChart />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
