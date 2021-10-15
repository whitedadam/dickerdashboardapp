import React from "react";
import './App.css';
import Widgets from "./Widgets";

class Dashboard extends React.Component {
    render() {
        return(
            <div className={'dashboard'}>
                <h1>Welcome to the Dashboard Page!</h1>
                <Widgets/>
            </div>
        );
    }
}

export default Dashboard;