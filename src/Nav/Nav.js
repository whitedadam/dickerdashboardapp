import { Link } from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { Logout } from "@mui/icons-material";

function Nav({ userAuth, isAdmin, setUserAuth, setIsAdmin }) {
  const handleLogout = () => {
    setUserAuth(false);
  };

  if (!userAuth) return null;

  return (
    <div style={{
      height: "100vh",
    }}>
      <ProSidebar style={{
        height: "100vh",
      }}>
        <SidebarHeader>
          <p>    DICKER Dashboard</p>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
              icon={<BarChartIcon />}
              style={{
                position: "relative",
                left: "40px",
              }}
            >
              Dashboard
              <Link to="/dashboard" />
            </MenuItem>
            <MenuItem
              icon={<SettingsIcon />}
              style={{
                position: "relative",
                left: "40px",
              }}
            >
              Settings
              <Link to="/settings" />
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu>
            <MenuItem
              icon={<Logout />}
              style={{
                position: "relative",
                left: "40px",
              }}
              onClick={handleLogout}
            >
              Logout
              <Link to="/" />
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

export default Nav;
