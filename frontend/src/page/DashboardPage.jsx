import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Unauthorized from "./public/Unauthorized";
import { getFilteredUsers } from "../feature/user/UserSlice";
import StatUsers from "../components/stat/StatUsers";
import { listAnnouncements } from "../feature/announcement/AnnouncementSlice";
import { formatDateDDMMYYYY } from "../utils/utils";
import { Link } from "react-router-dom";
import VerticalBarChart from "../components/chart/Dashboard/VerticalBarChart";
import PieChart from "../components/chart/Dashboard/PieChart";
import { scholarshipTypes } from "../data/data";

const Dashboard = () => {
  const dispatch = useDispatch();
  // ======================== Redux state ======================= //
  const { auth } = useSelector((state) => state.auth);
  const { universities } = useSelector((state) => state.university);
  const { announcements } = useSelector((state) => state.announcement);
  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );
  const { residenceAddresses } = useSelector((state) => state.residenceAddress);
  const {
    users,
    status: userStatus,
    total,
  } = useSelector((state) => state.user);
  // ====================================================== //

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedResidenceAddress, setSelectedResidenceAddress] = useState("");
  const [filterChoice, setFilterChoice] = useState("all");

  // ===================== Chart data ======================== //
  const labelsDegree = ["Bachelor", "Master", "Doctor"];
  const bachelorCounts = users.filter(
    (user) => user?.degree?.vietDegree?.toLowerCase() === "cử nhân",
  ).length;
  const masterCounts = users.filter(
    (user) => user?.degree?.vietDegree?.toLowerCase() === "thạc sĩ",
  ).length;
  const doctorCounts = users.filter(
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
  const governmentCount = users.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ລັດຖະບານ",
  ).length;
  const coperationalCount = users.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ຮ່ວມມື",
  ).length;
  const exchangeCount = users.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ແລກປ່ຽນ",
  ).length;
  const companyCount = users.filter(
    (user) => user?.scholarship?.scholarshipType.trim() === "ບໍລິສັດ",
  ).length;
  const privateCount = users.filter(
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

  // ====================================================== //

  useEffect(() => {
    let filters = {};

    if (filterChoice === "combine") {
      filters = {
        "university.shortcut": selectedUniversity,
        "residenceAddress.location": selectedResidenceAddress,
      };
    } else if (filterChoice === "university") {
      filters = { "university.shortcut": selectedUniversity };
    } else if (filterChoice === "residence") {
      filters = { "residenceAddress.location": selectedResidenceAddress };
    } else if (filterChoice === "all") {
      filters = {};
    }

    if (auth.role === "admin") {
      dispatch(getFilteredUsers({ ...filters }));
    }
  }, [
    dispatch,
    filterChoice,
    selectedResidenceAddress,
    selectedUniversity,
    auth.role,
  ]);

  useEffect(() => {
    dispatch(listAnnouncements({}));
  }, [dispatch]);
  if (auth.role !== "admin") return <Unauthorized />;
  return (
    <>
      <section className="body-font">
        <div className="container mx-auto rounded-xl bg-transparent px-14 py-14">
          <div className="mb-20 text-center">
            <h1 className="title-font mb-4 text-center font-notosanslao text-2xl font-bold text-base-content sm:text-4xl">
              ສັງລວມນັກຮຽນທີ່ຢູ່ຕາມໂຮງຮຽນຕ່າງໆ
            </h1>
          </div>
          <div className="mb-12 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4">
              <label className="form-control max-w-fit">
                <div className="label">
                  <span className="label-text">Filter by:</span>
                </div>
                <select
                  onChange={(e) => setFilterChoice(e.target.value)}
                  className="select select-primary"
                  value={filterChoice}
                >
                  <option value="all">All</option>
                  <option value="combine">University & Dormitory</option>
                  <option value="university">University</option>
                  <option value="residence">Dormitory</option>
                </select>
              </label>
            </div>
            <div className="flex flex-row items-center gap-4">
              <select
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="select select-primary w-full max-w-xs"
                value={selectedUniversity || ""}
                disabled={
                  filterChoice === "residence" || filterChoice === "all"
                    ? true
                    : false
                }
              >
                <option disabled value="">
                  ເລືອກໂຮງຮຽນ
                </option>
                {universities.map((i) => (
                  <option key={i._id} value={i.shortcut}>
                    {i.shortcut}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => setSelectedResidenceAddress(e.target.value)}
                className="select select-primary w-full max-w-xs"
                value={selectedResidenceAddress || ""}
                disabled={
                  filterChoice === "university" || filterChoice === "all"
                    ? true
                    : false
                }
              >
                <option disabled value="">
                  ເລືອກຫໍພັກ
                </option>
                {residenceAddresses.map((i) => (
                  <option key={i._id} value={i.location}>
                    {i.location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-10 flex w-full justify-center">
            <StatUsers status={userStatus} users={users} total={total} />
          </div>
          <div className="mb-12 grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2">
            <div className="card max-w-full rounded-md border border-base-300  p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">Degree count</h2>
              <VerticalBarChart data={dataDegree} />
            </div>
            <div className="card row-start-2 max-w-full rounded-md border border-base-300  p-6 shadow md:col-start-1">
              <h2 className="mb-4 text-xl font-semibold">Scholarship count</h2>
              <VerticalBarChart data={dataScholarship} />
            </div>
            <div className="card max-w-full rounded-md border border-base-300  p-6 shadow md:col-start-2 md:row-span-2 md:row-start-1">
              <h2 className="mb-4 text-xl font-semibold">
                Student count / Univeristy
              </h2>
              <PieChart />
            </div>
          </div>
          <div className="md:grid-cols-2d grid grid-cols-1 gap-3">
            <ul className="menu rounded-md border shadow">
              <div className="flex w-full flex-row items-start justify-between p-2">
                <span className="font-bold">Announcement</span>
              </div>
              {sortedAnnouncements?.map((announcement) => (
                <li key={announcement._id}>
                  <Link
                    to={`/manage-others-data/announcement-list/${announcement._id}`}
                    className="flex flex-col items-start"
                  >
                    <p className="whitespace-pre-line">
                      • {announcement.title} (
                      <span className="text-xs opacity-50">
                        {formatDateDDMMYYYY(announcement.timestamp)}
                      </span>
                      )
                    </p>
                  </Link>
                </li>
              ))}
              <Link to="/manage-others-data/announcement-list">
                <button className="btn btn-link btn-xs whitespace-nowrap">
                  View all
                </button>
              </Link>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
