import React, {useState} from "react";
import "./AdminDashboard.css"
import {Col, Container, Row, Table} from 'reactstrap';
import adminData from "../mock-data.json"
import {Link, NavLink} from "react-router-dom";
import Nav from "../Nav";

function AdminDashboard() {
    const [merch, setMerch] = useState(adminData);
        return(
            <Container className="AdminDashboard">
                <Row>
                    <Col><h1>Welcome, {merch[1].firstName}!</h1></Col>
                </Row>
                <Row>
                    <Col><p>Modules Coming Soon!</p></Col>
                </Row>
             </Container>
        );
}

export default AdminDashboard;
