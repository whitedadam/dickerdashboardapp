import React from 'react';
import {Button, Col, Container, Popover, Row} from "reactstrap";
import Reset from "../Reset";
import {Link} from "react-router-dom";

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
                    allowPush: "allowing"

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
    }

    handleClickSecurity() {
        this.setState({userOption: 'Security', isSecurity: true, resetHidden: (!this.state.resetHidden)});

    }

    handleClickNotification() {
        this.setState({userOption: 'Notification', isNotification: true});
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
                            <Link to ="/general">General Settings</Link>
                        </Button>
                    </Col>
                    <Col className="NavigationSecurity">
                        <Button className="SecurityButton" onClick={this.handleClickSecurity}>
                            <Link to ="/security">Reset Password</Link>
                        </Button>
                    </Col>
                    <Col className="NavigationNotification">
                        <Button className="NotificationButton" onClick={this.handleClickNotification}>
                            <Link to ="/notifications">Notification</Link>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}



export default Settings;
