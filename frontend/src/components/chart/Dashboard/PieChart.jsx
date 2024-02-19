import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { users } = useSelector((state) => state.user);
  const { universities } = useSelector((state) => state.university);
  const universityCounts = universities.map(
    (university) =>
      users.filter((user) => user.university.universityId === university._id)
        .length,
  );
  const generateColors = (count) => {
    const dynamicColors = [];
    const getRandomColor = () => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 50) + 90; // 50-100 for vibrant colors
      const lightness = Math.floor(Math.random() * 30) + 65; // 60-90 for lighter colors
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    for (let i = 0; i < count; i++) {
      dynamicColors.push(getRandomColor());
    }

    return dynamicColors;
  };

  const backgroundColors = generateColors(universityCounts.length);

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
