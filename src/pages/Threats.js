import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Switch,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DangerousIcon from "@mui/icons-material/Dangerous";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import notificationSound from "../assets/alert.wav"; // Ensure the file exists

const API_URL = "https://backend-sc9k.onrender.com/api/threats/";

// Function to categorize threats with color-coded chips & icons
const categorizeThreat = (severity) => {
  switch (severity) {
    case "Critical":
      return <Chip label="Critical" color="error" icon={<DangerousIcon />} />;
    case "High":
      return <Chip label="High" color="warning" icon={<WarningAmberIcon />} />;
    case "Medium":
      return <Chip label="Medium" color="primary" icon={<ReportProblemIcon />} />;
    default:
      return <Chip label="Low" color="success" icon={<CheckCircleIcon />} />;
  }
};

const Threats = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [newThreat, setNewThreat] = useState(null);
  const [muteAlerts, setMuteAlerts] = useState(localStorage.getItem("muteAlerts") === "true");
  const [lastThreatId, setLastThreatId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreats = async () => {
      const token = localStorage.getItem("authToken"); // Correct token key

      if (!token) {
        console.error("No authentication token found. Redirecting to login...");
        navigate("/login"); // Redirect if no token
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const newThreats = response.data;

        // Detect if a new threat is added
        if (newThreats.length > 0 && newThreats[0].id !== lastThreatId) {
          setNewThreat(newThreats[0]);
          setLastThreatId(newThreats[0].id);

          // Show alert & play sound only if not muted
          if (!muteAlerts) {
            setAlertOpen(true);
            const audio = new Audio(notificationSound);
            audio.play();
          }
        }

        setThreats(newThreats);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Unauthorized access - Redirecting to login...");
          localStorage.removeItem("authToken"); // Remove invalid token
          navigate("/login");
        } else {
          console.error("Error fetching threats:", error);
        }
      }
      setLoading(false);
    };

    fetchThreats();
    const interval = setInterval(fetchThreats, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval);
  }, [lastThreatId, muteAlerts, navigate]);

  // Handle mute toggle & save to localStorage
  const handleMuteToggle = () => {
    const newMuteState = !muteAlerts;
    setMuteAlerts(newMuteState);
    localStorage.setItem("muteAlerts", newMuteState);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Threats Overview
      </Typography>

      {/* Mute Alerts Toggle */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <Typography variant="body1" sx={{ marginRight: 1 }}>
          Mute Alerts
        </Typography>
        <Switch checked={muteAlerts} onChange={handleMuteToggle} />
      </div>

      <Paper sx={{ padding: 2, marginTop: 2, borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Severity</strong>
                </TableCell>
                <TableCell>
                  <strong>Detected At</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {threats.map((threat) => (
                <TableRow key={threat.id}>
                  <TableCell>{threat.id}</TableCell>
                  <TableCell>{threat.threat_type}</TableCell>
                  <TableCell>{categorizeThreat(threat.severity)}</TableCell>
                  <TableCell>{new Date(threat.detected_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* Snackbar Notification for New Threats */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" onClose={() => setAlertOpen(false)}>
          🚨 New Threat Detected: {newThreat?.threat_type} - {newThreat?.severity}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Threats;
