import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import dickerLogoSquare from "../images/dickerLogoSquare.png";
import "./Nav.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import users from "../mock-data.json";
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

function Nav({ userAuth, isAdmin, setUserAuth, setIsAdmin }) {
  const [userInfo] = useState(users);

  const handleLogout = (e) => {
    e.preventDefault();
    setUserAuth(false);
    setIsAdmin(false);
  };

  // const fetchUserInfo = async () => {
  //   const res = await fetch(`http://localhost:5000/user`);
  //   const data = await res.json();

  //   return data;
  // };

  if (!userAuth) return null;

  return (
    <Container className={"navbar"} style={{
      position: 'absolute',
      right: '1280px',
      height: '100vh',
    }}>
      <ProSidebar>
        <Menu iconShape="square">
            <MenuItem icon={<BarChartIcon/>} style={{
              position: 'relative',
              left: '40px',
            }}>Dashboard<Link to ="/dashboard"/></MenuItem>
          <MenuItem icon={<SettingsIcon/>} style={{
            position: 'relative',
            left: '40px'
          }}>Settings<Link to ="/settings"/></MenuItem>
        </Menu>
      </ProSidebar>
    </Container>
  );
}

export default Nav;
