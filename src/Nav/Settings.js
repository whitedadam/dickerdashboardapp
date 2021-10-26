import React from 'react';
import { Link } from 'react-router-dom';
import dickerNowLogo from '../images/dickerNowLogo.png';
import './Nav.css';

class Settings extends React.Component {
    constructor(props){
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
    handleClickGeneralSettings(){
        this.setState({userOption: 'General Setting' ,isGeneralSetting: true});
        window.alert('Username: ');
        window.alert('Phone number: ');
        window.alert('Email: ');

    }
    handleClickSecurity(){
        this.setState({userOption: 'Security', isSecurity: true});
        window.alert('Update or Change password: ');
        window.alert('Please type in your email to prompt the system to send a reset password email: ');
    }
    handleClickNotification(){
        this.setState({userOption: 'Notification', isNotification: true});
        window.alert('Allow Notifications: ')
    }
  render() {
    return (
      <div className={'navbar'}>
        <div className={'navLeft'}>
          <img className={'navLogo'} src={dickerNowLogo} alt={'dickerNOW logo'} height={'25'} width={'75'} />
          <Link to='/'>Dashboard</Link>
          <Link to='/settings'>Settings</Link>
          <a href={''}> Logout </a>
          <div className={'navRight'}>
            <h3>Welcome, Merchant!</h3>
          </div>
        </div>
      </div>
      <Container className={'navbar'}>
        <Navbar color={'dark'} expand={'xl'}>
          <Collapse isOpen={true} navbar>
              <NavbarBrand>
                <img src={dickerLogoSquare} alt={'DICKER logo'}/>
              </NavbarBrand>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/settings">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Logout</NavLink>
              </NavItem>
              <NavItem className={'navDivider'}>
                <p>______________________________________________________________________ </p>
              </NavItem>
              <NavbarText className={'merchantWelcome'}>Welcome, Merchant!</NavbarText>
          </Collapse>
        </Navbar>
          <div className = "Navigation Settings">
              <h1>Admin Settings</h1>
              <div ClassName = "NavigationGeneralSettings">
                  <button className = "GeneralSettingsButton" onClick ={this.handleClickGeneralSettings}>
                      <h3> General Settings </h3>
                  </button>
              </div>
              <div className = "NavigationSecurity">
                  <button className = "SecurityButton" onClick ={this.handleClickSecurity}>
                      <h3> Security </h3>
                  </button>
              </div>
              <div className= "NavigationNotification">
                  <button className = "NotificationButton" onClick ={this.handleClickNotification}>
                      <h3> Notification </h3>
                  </button>
              </div>
          </div>
      }
      }

      </Container>
    );
  }
}

export default Nav;
