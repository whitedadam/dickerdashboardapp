import React, {useState} from 'react';
import { Link } from 'react-router-dom';
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
              <NavLink href="/">Logout</NavLink>
            </NavItem>
          <NavbarText>Welcome, Merchant!</NavbarText>
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
