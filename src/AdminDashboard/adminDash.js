import React, {useState} from "react";
import "./adminDash.css"
import {Col, Container, Row} from 'reactstrap';
import adminData from "./mock-data.json"

function AdminDashboard() {
    const [merch, setMerch] = useState(adminData);
        return(
            <div>
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
             </div>
        );
}

export default AdminDashboard;
