import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ThreatsChart = ({ threats }) => {
  if (!threats || threats.length === 0) {
    return <p>No data available</p>;
  }

  // Group threats by severity
  const severityCounts = threats.reduce((acc, threat) => {
    acc[threat.severity] = (acc[threat.severity] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(severityCounts),
    datasets: [
      {
        label: "Threats by Severity",
        data: Object.values(severityCounts),
        backgroundColor: ["red", "orange", "yellow", "green"],
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      <Bar data={data} />
    </div>
  );
};

export default ThreatsChart;
