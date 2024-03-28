import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { Orange, Purple, PurpleLight } from "../Layout/constants/Color";
import { getLast7Days } from "../../lib/Features";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
  ArcElement
);

const labels = getLast7Days();

const LineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: { display: false },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue",
        fill: true,
        backgroundColor: PurpleLight,
        borderColor: Purple,
      },
    ],
  };

  return <Line data={data} options={LineChartOptions} />;
};

const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 80,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Total Chats vs Group Chats",
        backgroundColor: [PurpleLight, Orange],
        borderColor: [Purple, Orange],
        offset: 40,
      },
    ],
  };

  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={DoughnutChartOptions}
    />
  );
};

export { LineChart, DoughnutChart };
