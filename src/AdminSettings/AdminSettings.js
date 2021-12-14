import React, {useState} from "react";
import "./AdminSettings.css"
import {Container, NavItem, NavLink} from 'reactstrap';
import adminData from "../mock-data.json"

function AdminSettings() {

    const [merch, setMerch] = useState(adminData);

    return(
            <Container>
                <table>
                    <thead>
                        <tr>
                            <th>Merchant ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>App User ID</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {merch.map((merch)=> (
                            <tr>
                                <td>{merch.merchantId}</td>
                                <td>{merch.firstName}</td>
                                <td>{merch.lastName}</td>
                                <td>{merch.phoneNumber}</td>
                                <td>{merch.email}</td>
                                <td>{merch.appUserId}</td>
                                <td>{merch.dateCreated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <NavItem className="adminDashNav">
                    <NavLink href="/AdminDashboard">Admin Dashboard</NavLink>
                </NavItem>
             </Container>
        );
}

export default AdminSettings;
