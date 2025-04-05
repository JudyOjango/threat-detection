import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

const API_URL = "https://backend-cndw.onrender.com/api/auth/login/";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, { username, password });

      if (response.data.access) {
        // Save tokens & user data
        localStorage.setItem("authToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user info

        navigate("/dashboard"); // Redirect after login
        window.location.reload(); // Reload to refresh authentication state
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password. Please try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Link to="/forgot-password" style={{ textDecoration: "none", color: "#1976d2" }}>
            Forgot Password?
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
