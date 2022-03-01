import React, { useState } from "react";
import "./AdminDashboard.css";
import { Col, Container, NavItem, NavLink, Row } from "reactstrap";
import adminData from "../mock-data.json";
import { Link } from "react-router-dom";
import AdminDickers from "./AdminDashboardComponents/AdminDickersChart"

const AdminDashboard = ({ userAuth, isAdmin }) => {
  const [merch] = useState(adminData);
  return (
    <Container className="AdminDashboard">
      <Row>
        <Col>
          <h1>Welcome, {merch[1].firstName}!</h1>
        </Col>
      </Row>
      <Row>
        <h5>DICKER Totals</h5>
        <AdminDickers />
      </Row>
      <Row>
        <Col>
          <NavItem className="adminDashNav">
            <NavLink tag={Link} to="/adminSettings">
              Admin Settings
            </NavLink>
          </NavItem>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
