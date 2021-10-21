import React from 'react';
import SampleChart from "./DashboardComponents";
import { Container } from 'reactstrap';
import SampleChart2 from "./DashboardComponents/SampleChart2";
import SampleChart3 from "./DashboardComponents/SampleChart3";

class Dashboard extends React.Component {
  render() {
    return (
      <Container className={'dashboardContainer'}>
        <h3>Welcome to the Dashboard Page!</h3>
        <SampleChart />
        <SampleChart2 />
        <SampleChart3 />
      </Container>
    );
  }
}

export default Dashboard;
