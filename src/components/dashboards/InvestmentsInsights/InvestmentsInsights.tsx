import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ["GreenTech Solutions", "Solar Power Revolution", "Space Exploration Fund"],
  datasets: [
    {
      label: "Funding Received",
      data: [5000, 3000, 2000],
      backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Ensures the chart adapts to container size
};

const InvestmentsInsights = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-main_blue">Investments Insights</h2>
      <div className="relative h-72">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default InvestmentsInsights;
