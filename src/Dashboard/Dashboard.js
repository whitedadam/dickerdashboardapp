import React from 'react';
import SampleChart from "./DashboardComponents";
import {Col, Container, Row} from 'reactstrap';
import SampleChart2 from "./DashboardComponents/SampleChart2";
import SampleChart3 from "./DashboardComponents/SampleChart3";

class Dashboard extends React.Component {
  render() {
    return (
      <Container className={'dashboardContainer'}>
        <Row>
            <Col><h3>Welcome to the Dashboard Page!</h3></Col>
        </Row>
        <Row>
            <Col xs={'auto'}><SampleChart /></Col>
            <Col xs={'auto'}><SampleChart2 /></Col>
            <Col xs={'auto'}><SampleChart3 /></Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
