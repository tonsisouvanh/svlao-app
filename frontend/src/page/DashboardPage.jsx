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

    dispatch(getFilteredUsers({ ...filters }));
  }, [dispatch, filterChoice, selectedResidenceAddress, selectedUniversity]);

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
            <div className="card max-w-full rounded-md border border-base-300  p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">Degree count</h2>
              <VerticalBarChart data={dataDegree} />
            </div>
            <div className="card row-start-2 max-w-full rounded-md border border-base-300  p-6 shadow-lg md:col-start-1">
              <h2 className="mb-4 text-xl font-semibold">Scholarship count</h2>
              <VerticalBarChart data={dataScholarship} />
            </div>
            <div className="card max-w-full rounded-md border border-base-300  p-6 shadow-lg md:col-start-2 md:row-span-2 md:row-start-1">
              <h2 className="mb-4 text-xl font-semibold">
                Student count / Univeristy
              </h2>
              <PieChart />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ul className="menu rounded-md  shadow-lg">
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

            <div className="flex flex-col items-center justify-center">
              <div className=" relative flex h-[430px] w-full max-w-[500px] flex-col rounded-[10px]    bg-clip-border shadow-md    ">
                <div className=" flex h-fit w-full items-center justify-between rounded-t-2xl px-4 pb-[20px] pt-4  ">
                  <h4 className="text-navy-700 text-lg font-bold ">
                    Top Creators
                  </h4>
                  <button className="linear bg-lightPrimary text-brand-500 rounded-[20px] px-4 py-2 text-base font-medium transition duration-200 hover:bg-gray-100 active:bg-gray-200    dark:active:bg-white/20">
                    See all
                  </button>
                </div>
                <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
                  <table
                    role="table"
                    className="w-full min-w-[500px] overflow-x-scroll"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          colSpan={1}
                          role="columnheader"
                          title="Toggle SortBy"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                            Name
                          </div>
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          title="Toggle SortBy"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                            Artworks
                          </div>
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          title="Toggle SortBy"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                            Rating
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody role="rowgroup" className="px-4">
                      <tr role="row">
                        <td className="py-3 text-sm" role="cell">
                          <div className="flex items-center gap-2">
                            <div className="h-[30px] w-[30px] rounded-full">
                              <img
                                src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"
                                className="h-full w-full rounded-full"
                                alt=""
                              />
                            </div>
                            <p className="text-navy-700 text-sm font-medium ">
                              @maddison_c21
                            </p>
                          </div>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <p className="text-md font-medium text-gray-600 ">
                            9821
                          </p>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <div className="mx-2 flex font-bold">
                            <div className="dark:bg-navy-700 h-2 w-16 rounded-full bg-gray-200">
                              <div
                                className="bg-brand-500 dark:bg-brand-400 flex h-full items-center justify-center rounded-md"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row">
                        <td className="py-3 text-sm" role="cell">
                          <div className="flex items-center gap-2">
                            <div className="h-[30px] w-[30px] rounded-full">
                              <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                                className="h-full w-full rounded-full"
                                alt=""
                              />
                            </div>
                            <p className="text-navy-700 text-sm font-medium ">
                              @karl.will02
                            </p>
                          </div>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <p className="text-md font-medium text-gray-600 ">
                            7032
                          </p>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <div className="mx-2 flex font-bold">
                            <div className="dark:bg-navy-700 h-2 w-16 rounded-full bg-gray-200">
                              <div
                                className="bg-brand-500 dark:bg-brand-400 flex h-full items-center justify-center rounded-md"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row">
                        <td className="py-3 text-sm" role="cell">
                          <div className="flex items-center gap-2">
                            <div className="h-[30px] w-[30px] rounded-full">
                              <img
                                src="https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80"
                                className="h-full w-full rounded-full"
                                alt=""
                              />
                            </div>
                            <p className="text-navy-700 text-sm font-medium ">
                              @andreea.1z
                            </p>
                          </div>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <p className="text-md font-medium text-gray-600 ">
                            5204
                          </p>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <div className="mx-2 flex font-bold">
                            <div className="dark:bg-navy-700 h-2 w-16 rounded-full bg-gray-200">
                              <div
                                className="bg-brand-500 dark:bg-brand-400 flex h-full items-center justify-center rounded-md"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row">
                        <td className="py-3 text-sm" role="cell">
                          <div className="flex items-center gap-2">
                            <div className="h-[30px] w-[30px] rounded-full">
                              <img
                                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                                className="h-full w-full rounded-full"
                                alt=""
                              />
                            </div>
                            <p className="text-navy-700 text-sm font-medium ">
                              @abraham47.y
                            </p>
                          </div>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <p className="text-md font-medium text-gray-600 ">
                            4309
                          </p>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <div className="mx-2 flex font-bold">
                            <div className="dark:bg-navy-700 h-2 w-16 rounded-full bg-gray-200">
                              <div
                                className="bg-brand-500 dark:bg-brand-400 flex h-full items-center justify-center rounded-md"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr role="row">
                        <td className="py-3 text-sm" role="cell">
                          <div className="flex items-center gap-2">
                            <div className="h-[30px] w-[30px] rounded-full">
                              <img
                                src="https://i.ibb.co/7p0d1Cd/Frame-24.png"
                                className="h-full w-full rounded-full"
                                alt=""
                              />
                            </div>
                            <p className="text-navy-700 text-sm font-medium ">
                              @simmmple.web
                            </p>
                          </div>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <p className="text-md font-medium text-gray-600 ">
                            3871
                          </p>
                        </td>
                        <td className="py-3 text-sm" role="cell">
                          <div className="mx-2 flex font-bold">
                            <div className="dark:bg-navy-700 h-2 w-16 rounded-full bg-gray-200">
                              <div
                                className="bg-brand-500 dark:bg-brand-400 flex h-full items-center justify-center rounded-md"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
