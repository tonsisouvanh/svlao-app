import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const VerticalBarChart = ({ data }) => {
  // ==================== Chart section =================== //
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      yAxes: [
        {
          font: {
            size: 14,
          },
        },
      ],
    },
  };
  // const labels = ["Bachelor", "Master", "Doctor"];
  // const bachelorCounts = users.filter(
  //   (user) => user?.degree?.vietDegree?.toLowerCase() === "cử nhân",
  // ).length;
  // const masterCounts = users.filter(
  //   (user) => user?.degree?.vietDegree?.toLowerCase() === "thạc sĩ",
  // ).length;
  // const doctorCounts = users.filter(
  //   (user) => user?.degree?.vietDegree?.toLowerCase() === "tiến sĩ",
  // ).length;

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Bachelor",
  //       data: [bachelorCounts],
  //       backgroundColor: "rgba(255, 99, 132)",
  //     },
  //     {
  //       label: "Master",
  //       data: [masterCounts],
  //       backgroundColor: "rgba(53, 162, 235)",
  //     },
  //     {
  //       label: "Doctor",
  //       data: [doctorCounts],
  //       backgroundColor: "rgba(255, 199, 132)",
  //     },
  //   ],
  // };
  // ====================================================== //

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default VerticalBarChart;
