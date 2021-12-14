import React from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarText, NavItem, NavLink} from "reactstrap";
import dickerLogoSquare from '../images/dickerLogoSquare.png';
import './Nav.css';

class Nav extends React.Component {
  render() {
    return (
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
                  <NavLink href="/adminDash">Admin Dashboard</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/adminSettings">Admin Settings</NavLink>
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

        {/*<Navbar>
            <Collapse>
              <Nav>
                <NavItem>
                  <img className={'navLogo'} src={dickerLogoSquare} alt={'dickerNOW logo'} />
                </NavItem>
                <NavItem>
                  <NavLink to='/dashboard'>Dashboard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/settings'>Settings</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/'> Logout </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>*/}
      </Container>
    );
  }
}

export default Nav;
