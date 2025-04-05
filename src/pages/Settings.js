import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
  TextField,
  Divider,
} from "@mui/material";
import { ThemeContext } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(localStorage.getItem("notifications") === "true");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "user@example.com");

  const navigate = useNavigate();

  // ✅ Toggle Dark Mode
  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // ✅ Toggle Notifications
  const handleNotificationToggle = () => {
    const newStatus = !notifications;
    setNotifications(newStatus);
    localStorage.setItem("notifications", newStatus);
  };

  // ✅ Handle Email Change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    localStorage.setItem("userEmail", event.target.value);
  };

  // ✅ Export Data as JSON
  const handleExportData = () => {
    const data = {
      darkMode,
      notifications,
      email,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "settings.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Reset to Default
  const handleResetSettings = () => {
    setDarkMode(false);
    setNotifications(true);
    setEmail("user@example.com");

    localStorage.setItem("darkMode", "false");
    localStorage.setItem("notifications", "true");
    localStorage.setItem("userEmail", "user@example.com");

    alert("Settings have been reset to default.");
  };

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* ✅ Dark Mode */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Appearance</Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleDarkModeToggle} />}
          label={darkMode ? "Dark Mode Enabled" : "Light Mode Enabled"}
        />
      </Paper>

      {/* ✅ Notifications */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Notifications</Typography>
        <FormControlLabel
          control={<Switch checked={notifications} onChange={handleNotificationToggle} />}
          label={notifications ? "Enabled" : "Disabled"}
        />
      </Paper>

      {/* ✅ User Email */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">User Information</Typography>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          sx={{ mt: 1 }}
        />
      </Paper>

      {/* ✅ System Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">System Controls</Typography>
        <Button variant="contained" color="primary" onClick={handleExportData} sx={{ mr: 2 }}>
          Export Data
        </Button>
        <Button variant="contained" color="error" onClick={handleResetSettings}>
          Reset to Default
        </Button>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* ✅ Logout */}
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Settings;
