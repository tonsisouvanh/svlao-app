import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { users } = useSelector((state) => state.user);
  const { universities } = useSelector((state) => state.university);
  const universityCounts = universities.map(
    (university) =>
      users?.filter((user) => user.university?.universityId === university._id)
        .length,
  );
  const backgroundColors = [
    "rgba(53, 162, 235)",
    "rgba(255, 99, 132)",
    "rgba(255, 199, 132)",
    "rgba(75, 192, 192)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
    "rgba(174, 168, 211)",
    "rgba(119, 204, 89)",
    "rgba(101, 205, 182)",
    "rgba(250, 182, 209)",
    "rgba(92, 107, 192)",
    "rgba(255, 69, 123)",
    "rgba(0, 184, 148)",
    "rgba(70, 130, 180)",
  ];
  const data = {
    labels: universities.map((university) => university.shortcut),
    datasets: [
      {
        label: "# of Votes",
        data: universityCounts,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  return (
    <>
      <Pie data={data} options={options} />
    </>
  );
};

export default PieChart;
