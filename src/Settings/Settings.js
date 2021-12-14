import React from 'react';
import {Button, Col, Container, Popover, Row} from "reactstrap";
import Reset from "../Reset";


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            form: {
                email: '',
                password: ''
            },
            userOption: "none",
            isGeneralSetting: false,
            isSecurity: false,
            isNotification: false,
            resetHidden: true,
            isToggleOn: false,
            isAllowDataOn: false,
            users: {
                admin: {
                    id: 1,
                    email: 'admin@dicker.com',
                    password: 'admin',
                    name: 'Admin',
                    phoneNumber: '(904)-456-3452',
                    loginAttempts: 0,
                    lockoutEnabled: false,
                    isAdmin: true,
                    allowEmail: "allowing",
                    allowData: "not allowing"
                },
                merchant: {
                    id: 2,
                    email: 'firstcheck@lastcheck.test',
                    password: '12345',
                    name: 'Bob',
                    phoneNumber: '(904)-675-6234',
                    loginAttempts: 0,
                    lockoutEnabled: false,
                    isAdmin: false,
                    allowEmail: "not allowing",
                    allowData: "allowing"

                }
            }
        };

        this.handleClickGeneralSettings = this.handleClickGeneralSettings.bind(this);
        this.handleClickSecurity = this.handleClickSecurity.bind(this);
        this.handleClickNotification = this.handleClickNotification.bind(this);
        this.handleClickAllowNotification = this.handleClickAllowNotification.bind(this);
        this.handleClickAllowDatabase = this.handleClickAllowDatabase.bind(this);
    }

    handleClickGeneralSettings() {
        this.setState({userOption: 'General Setting', isGeneralSetting: true});
        window.alert('Name: ' + this.state.users.merchant.name + "\n" +
            'Username: ' + this.state.users.merchant.email + "\n" +
            'Phone number: ' + this.state.users.merchant.phoneNumber);
    }

    handleClickSecurity() {
        this.setState({userOption: 'Security', isSecurity: true, resetHidden: (!this.state.resetHidden)});
        console.log(this.state.resetHidden);
    }

    handleClickNotification() {
        this.setState({userOption: 'Notification', isNotification: true});
        window.alert(this.state.users.merchant.name + " is " + this.state.users.merchant.allowEmail + " emails to be sent." + "\n" +
            this.state.users.merchant.name + " is " + this.state.users.merchant.allowData + " data to be stored in Database." + "\n"
        );
    }

    handleClickAllowNotification() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    handleClickAllowDatabase() {
        this.setState(state => ({
            isAllowDataOn: !state.isAllowDataOn
        }));
    }





    render(){
        return (
            <Container className="Settings">
                <h1>Merchant Settings</h1>
                <Row>
                    <Col className="NavigationGeneralSettings">
                        <Button  className="GeneralSettingsButton" onClick={this.handleClickGeneralSettings}>
                            <h3> General Settings </h3>
                        </Button>
                    </Col>
                    <Col className="NavigationSecurity">
                        <Button className="SecurityButton" onClick={this.handleClickSecurity}>
                            <h3> Security </h3>
                        </Button>
                    </Col>
                    <Col className="NavigationNotification">
                        <Button className="NotificationButton" onClick={this.handleClickNotification}>
                            <h3> Notification </h3>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col> </Col>
                    <Col>
                        <div className={'ResetModule'} hidden={this.state.resetHidden}>
                            <Reset />
                        </div>
                    </Col>
                    <Col>
                        <br/>
                        <h4> Do you want to allow emails to be sent directly to you?</h4>
                        <Button onClick={this.handleClickAllowNotification}>
                            {this.state.isToggleOn ? "ON" : "OFF"}
                        </Button>
                        <br/>
                    </Col>
                    <Col>
                        <br/>
                        <h5> Do you want to allow user information to be stored in Dicker Database?</h5>
                        <Button onClick={this.handleClickAllowDatabase}>
                            {this.state.isAllowDataOn ? "ON" : "OFF"}
                        </Button>
                        <br/>
                    </Col>
                </Row>

            </Container>
        );
    }
}



export default Settings;
