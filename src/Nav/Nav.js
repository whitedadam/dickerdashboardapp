import "react-pro-sidebar/dist/css/styles.css";
import {
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Nav.css";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

function Nav({ userAuth, isAdmin, setUserAuth, setIsAdmin }) {

  // const fetchUserInfo = async () => {
  //   const res = await fetch(`http://localhost:5000/user`);
  //   const data = await res.json();

  //   return data;
  // };

  if (!userAuth) return null;

  return (
    <Container className={"navbar"} style={{
      position: 'relatve',
      // right: '1280px',
      // height: '100vh',
      // paddingTop: '0px'
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
