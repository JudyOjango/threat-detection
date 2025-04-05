import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Container,
  CircularProgress,
  Switch,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [threatCount, setThreatCount] = useState(0);
  const [recentThreats, setRecentThreats] = useState([]);
  const [severityDistribution, setSeverityDistribution] = useState({});
  const [threatTypes, setThreatTypes] = useState({});
  const [lastUpdate, setLastUpdate] = useState("N/A");
  const [systemHealth, setSystemHealth] = useState("Checking...");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  const navigate = useNavigate();

  // ✅ Fetch Threat Data
  const fetchStats = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found! Redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("https://backend-sc9k.onrender.com/api/threats/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const threats = response.data;
      setThreatCount(threats.length);
      setLastUpdate(new Date().toLocaleTimeString());
      setRecentThreats(threats.slice(0, 5));

      // Severity Distribution
      const severityCounts = {
        Critical: threats.filter((t) => t.severity === "Critical").length,
        High: threats.filter((t) => t.severity === "High").length,
        Medium: threats.filter((t) => t.severity === "Medium").length,
        Low: threats.filter((t) => t.severity === "Low").length,
      };
      setSeverityDistribution(severityCounts);

      // Threat Types
      const threatTypeCounts = threats.reduce((acc, threat) => {
        acc[threat.threat_type] = (acc[threat.threat_type] || 0) + 1;
        return acc;
      }, {});
      setThreatTypes(threatTypeCounts);

      // Determine system health
      if (severityCounts.Critical > 5) {
        setSystemHealth("Critical 🚨");
      } else if (severityCounts.Critical > 2) {
        setSystemHealth("Warning ⚠️");
      } else {
        setSystemHealth("Normal ✅");
      }
    } catch (error) {
      console.error("Unauthorized access - Redirecting to login...");
      localStorage.removeItem("authToken");
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  // ✅ Toggle Dark Mode
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  // ✅ Export Data as JSON
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recentThreats, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = "threat_data.json";
    downloadAnchor.click();
  };

  return (
    <Container
      sx={{
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>

      {/* Dark Mode Toggle & Export Button */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Dark Mode</Typography>
          <Switch checked={darkMode} onChange={handleDarkModeToggle} icon={<WbSunnyIcon />} checkedIcon={<NightsStayIcon />} />
        </div>
        <Button variant="contained" color="primary" onClick={handleExportData}>
          Export Data
        </Button>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <Grid container spacing={3} justifyContent="center">
            {[
              { label: "Total Threats", value: threatCount, color: "#e53935" },
              { label: "Last Update", value: lastUpdate, color: "#ff9800" },
              { label: "System Health", value: systemHealth, color: "#4caf50" },
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ backgroundColor: stat.color, color: "white", textAlign: "center", padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{stat.label}</Typography>
                    <Typography variant="h5">{stat.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Recent Threats Table */}
          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6">Recent Threats</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Detected At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentThreats.map((threat) => (
                    <TableRow key={threat.id}>
                      <TableCell>{threat.id}</TableCell>
                      <TableCell>{threat.threat_type}</TableCell>
                      <TableCell>{threat.severity}</TableCell>
                      <TableCell>{new Date(threat.detected_at).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Threat Severity Distribution Chart */}
          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6">Threat Severity Distribution</Typography>
            <Pie
              data={{
                labels: ["Critical", "High", "Medium", "Low"],
                datasets: [{ data: Object.values(severityDistribution), backgroundColor: ["#e53935", "#ff9800", "#3f51b5", "#4caf50"] }],
              }}
            />
          </Paper>

          {/* Threat Types Bar Chart */}
          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6">Threat Types Distribution</Typography>
            <Bar
              data={{
                labels: Object.keys(threatTypes),
                datasets: [{ label: "Threat Count", data: Object.values(threatTypes), backgroundColor: "#3f51b5" }],
              }}
            />
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
