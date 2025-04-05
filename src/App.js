import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Threats from "./pages/Threats";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Sidebar from "./components/Sidebar";
import AuthContext from "./context/AuthContext";
import { CssBaseline, Box } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <CssBaseline />
      {user && <Sidebar />}
      <Box sx={{ flex: 1, p: 3 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/threats" element={<ProtectedRoute><Threats /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
