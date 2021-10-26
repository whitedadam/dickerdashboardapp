import React from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import Reset from "../Reset";

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userOption: "none",
            isGeneralSetting: false,
            isSecurity: false,
            isNotification: false,
            resetHidden: true
        };
        this.handleClickGeneralSettings = this.handleClickGeneralSettings.bind(this);
        this.handleClickSecurity = this.handleClickSecurity.bind(this);
        this.handleClickNotification = this.handleClickNotification.bind(this);
    }

    handleClickGeneralSettings() {
        this.setState({userOption: 'General Setting', isGeneralSetting: true});
        window.alert('Username: \n\n' +
            'Phone number: \n\n' +
            'Email: \n');
    }

    handleClickSecurity() {
        this.setState({userOption: 'Security', isSecurity: true, resetHidden: (!this.state.resetHidden)});
        console.log(this.state.resetHidden);
    }

    handleClickNotification() {
        this.setState({userOption: 'Notification', isNotification: true});
        window.alert('Allow Notifications: ')
    }

    render() {
        return (
            <Container className="Settings">
                <h1>Admin Settings</h1>
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
                            <p>This is where module hiding</p>
                            <Reset />
                        </div>
                    </Col>
                    <Col> </Col>
                </Row>
            </Container>
        );
    }
}



export default Settings;
