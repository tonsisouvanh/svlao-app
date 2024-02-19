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

const Dashboard = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { universities } = useSelector((state) => state.university);
  const { announcements } = useSelector((state) => state.announcement);
  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
  );
  const { residenceAddresses } = useSelector((state) => state.residenceAddress);
  const {
    users,
    status: userStatus,
    total,
  } = useSelector((state) => state.user);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedResidenceAddress, setSelectedResidenceAddress] = useState("");
  const [filterChoice, setFilterChoice] = useState("all");

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
        <div className="container mx-auto px-5 py-24">
          <div className="mb-20 text-center">
            <h1 className="title-font mb-4 text-center font-notosanslao text-2xl font-bold text-primary sm:text-3xl">
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
          <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:justify-between">
            <StatUsers status={userStatus} users={users} total={total} />
            <ul className="menu rounded-box max-w-sm border bg-base-200 shadow-sm">
              <div className="flex w-full flex-row items-start justify-between p-2">
                <span className="font-bold">Announcement</span>
                <Link to="/manage-others-data/announcement-list">
                  <button className="btn btn-link btn-xs whitespace-nowrap">
                    View all
                  </button>
                </Link>
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
                    {/* <p className="text-xs opacity-50">
                      {formatDateDDMMYYYY(announcement.timestamp)}
                    </p> */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <label className="form-control w-full max-w-fit">
            <div className="label">
              <span className="label-text text-xs">Showing</span>
            </div>
            <select
              onChange={(e) => setItemsPerPage(e.target.value)}
              className="select select-bordered select-xs max-w-fit"
              value={itemsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </label>
          <UserTable
            users={users}
            userStatus={userStatus}
            columnHead={[
              {
                Header: "Pic",
                accessor: "profileImg",
              },
              {
                Header: "First Name",
                accessor: "fullname.englishFirstname",
              },
              {
                Header: "Last Name",
                accessor: "fullname.englishLastname",
              },
              {
                Header: "Status",
                accessor: "userStatus",
              },
            ]}
          />
          <div className="mt-6 flex justify-center">
            <PaginateNoPath
              setCurrentPage={setCurrentPage}
              currentPage={currentPage
              total={total}
              itemsPerPage={itemsPerPage}
            />
          </div> */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card max-w-full border bg-base-200 p-4 shadow-sm">
              <h2 className="text-md mb-4 font-semibold">
                Students count / Degree
              </h2>
              <VerticalBarChart users={users} />
            </div>
            <div className="card max-w-full border bg-base-200 p-4 shadow-sm">
              <h2 className="text-md mb-4 font-semibold">
                Student count / Univeristy
              </h2>
              <PieChart />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
