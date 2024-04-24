import { useSelector } from "react-redux";
import PieChart from "../../components/chart/Dashboard/PieChart";
import VerticalBarChart from "../../components/chart/Dashboard/VerticalBarChart";
import { scholarshipTypes } from "../../data/data";

const Charts = () => {
  const { users } = useSelector((state) => state.user);
  const labelsDegree = ["Bachelor", "Master", "Doctor"];
  const bachelorCounts = users?.filter(
    (user) => user?.degree?.vietDegree?.toLowerCase() === "cử nhân",
  ).length;
  const masterCounts = users?.filter(
    (user) => user?.degree?.vietDegree?.toLowerCase() === "thạc sĩ",
  ).length;
  const doctorCounts = users?.filter(
    (user) => user?.degree?.vietDegree?.toLowerCase() === "tiến sĩ",
  ).length;

  const dataDegree = {
    labels: labelsDegree,
    datasets: [
      {
        label: "Degree Distribution",
        data: [bachelorCounts, masterCounts, doctorCounts],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(53, 162, 235)",
          "rgba(255, 199, 132)",
        ],
      },
    ],
  };

  const labelsScholarship = scholarshipTypes.map((ele) => ele.name);
  const governmentCount = users?.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ລັດຖະບານ",
  ).length;
  const coperationalCount = users?.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ຮ່ວມມື",
  ).length;
  const exchangeCount = users?.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ແລກປ່ຽນ",
  ).length;
  const companyCount = users?.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ບໍລິສັດ",
  ).length;
  const privateCount = users?.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ສ່ວນໂຕ",
  ).length;

  const dataScholarship = {
    labels: labelsScholarship,
    datasets: [
      {
        label: "Scholarship Types",
        data: [
          governmentCount,
          coperationalCount,
          exchangeCount,
          companyCount,
          privateCount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(53, 162, 235, 0.7)",
          "rgba(255, 199, 132, 0.7)",
          "rgba(55, 199, 132, 0.7)",
          "rgba(255, 19,132, 0.7)",
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
      <div className="card max-w-full rounded-md border border-base-300  p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">ຈ/ນ ລະດັບການສຶກສາ</h2>
        <VerticalBarChart data={dataDegree} />
      </div>
      <div className="card row-start-2 max-w-full rounded-md border border-base-300  p-6 shadow md:col-start-1">
        <h2 className="mb-4 text-xl font-semibold">ຈ/ນ ປະເພດທຶນ</h2>
        <VerticalBarChart data={dataScholarship} />
      </div>
      <div className="card max-w-full rounded-md border border-base-300  p-6 shadow md:col-start-2 md:row-span-2 md:row-start-1">
        <h2 className="mb-4 text-xl font-semibold">ຈ/ນ ນັກສຶກສາໃນ ມຫລ</h2>
        <PieChart />
      </div>
    </div>
  );
};

export default Charts;
