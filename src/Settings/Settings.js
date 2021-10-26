import React from 'react';
import { Container } from "reactstrap";
class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userOption: "none",
            isGeneralSetting: false,
            isSecurity: false,
            isNotification: false,
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
        this.setState({userOption: 'Security', isSecurity: true});
        window.alert('Update or Change password: \n\n' +
            'Please type in your email to prompt the system to send a reset password email: \n');
    }

    handleClickNotification() {
        this.setState({userOption: 'Notification', isNotification: true});
        window.alert('Allow Notifications: ')
    }

    render() {
        return (
            <div className="Settings">
                <h1>Admin Settings</h1>
                <div className="NavigationGeneralSettings">
                    <button  className="GeneralSettingsButton" onClick={this.handleClickGeneralSettings}>
                        <h3> General Settings </h3>
                    </button>
                </div>
                <div className="NavigationSecurity">
                    <button className="SecurityButton" onClick={this.handleClickSecurity}>
                        <h3> Security </h3>
                    </button>
                </div>
                <div className="NavigationNotification">
                    <button className="NotificationButton" onClick={this.handleClickNotification}>
                        <h3> Notification </h3>
                    </button>
                </div>
            </div>
        );
    }
}



export default Settings;
