import React, {useState} from "react";
import "./AdminDashboard.css"
import {Col, Container, NavItem, NavLink, Row} from 'reactstrap';
import adminData from "../mock-data.json"

function AdminDashboard() {
    const [merch, setMerch] = useState(adminData);
        return(
            <Container className="AdminDashboard">
                <Row>
                    <Col><h1>Welcome, {merch[1].firstName}!</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <p>Modules Coming Soon!</p>

                        <NavItem className="adminDashNav">
                            <NavLink href="/AdminSettings">Admin Settings</NavLink>
                        </NavItem>
                    </Col>
                </Row>
             </Container>
        );
}

export default AdminDashboard;
