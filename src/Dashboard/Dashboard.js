import React from 'react';
import PotentialDickersChart from "./DashboardComponents";
import {Col, Container, Row} from 'reactstrap';
import DickersParticipatedChart from "./DashboardComponents/DickersParticipatedChart";
import SuccessfulDickersChart from "./DashboardComponents/SuccessfulDickersChart";

class Dashboard extends React.Component {
  render() {
    return (
      <Container className={'dashboardContainer'}>
        <Row>
            <Col><h3>Dashboards</h3></Col>
        </Row>
        <Row>
            <Col xs={'auto'}><PotentialDickersChart /></Col>
            <Col xs={'auto'}><DickersParticipatedChart /></Col>
            <Col xs={'auto'}><SuccessfulDickersChart /></Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
