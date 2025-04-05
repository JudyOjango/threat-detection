import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-cndw.onrender.com/api/auth/forgot-password/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("A new password has been sent to your email.");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3s
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleForgotPassword}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Reset Password"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
