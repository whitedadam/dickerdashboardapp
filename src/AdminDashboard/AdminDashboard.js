import React from 'react';
import {Col, Container, Row} from 'reactstrap';


class AdminDashboard extends React.Component {
  render() {
    return (
      <Container className={'adminDashboardContainer'}>
        <Row>
            <Col><h3>Admin Dashboard</h3></Col>
        </Row>
          <Row>
              <Col><p>Welcome, Admin!</p></Col>
          </Row>
      </Container>
    );
  }
}

export default AdminDashboard;
