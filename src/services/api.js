import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/threats/";

// Function to get threats
export const getThreats = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Ensure token is stored
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching threats:", error);
    return [];
  }
};
