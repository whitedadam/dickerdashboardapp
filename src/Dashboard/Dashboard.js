import React from 'react';
import SampleChart from "./DashboardComponents";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h3>Welcome to the Dashboard Page!</h3>
        <SampleChart />
      </div>
    );
  }
}

export default Dashboard;
