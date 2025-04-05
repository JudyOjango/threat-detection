import React, { useContext } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Button, Typography, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        "& .MuiDrawer-paper": { width: 250, backgroundColor: "#1e1e2f", color: "white" },
      }}
    >
      <Typography variant="h6" sx={{ padding: 2, textAlign: "center", borderBottom: "1px solid #444" }}>
        Threat Monitor
      </Typography>
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
          { text: "Threats", icon: <SecurityIcon />, path: "/threats" },
          { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
        ].map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              padding: "12px 20px",
              "&:hover": { backgroundColor: "#333" },
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "white",
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={{ backgroundColor: "#444", my: 1 }} />
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
