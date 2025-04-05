import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("https://backend-cndw.onrender.com/api/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/"); // Redirect to Dashboard after login
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 10, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Login to Cybersecurity System
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
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
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
