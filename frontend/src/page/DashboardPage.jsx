// import { data, university } from "../data/data";
// import { useState, useEffect } from "react";
// import { AiOutlineCaretDown } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import Unauthorized from "./public/Unauthorized";
// const Dashboard = () => {
//   const { auth } = useSelector((state) => state.auth);
//   const { universities, status: universityStatus } = useSelector(
//     (state) => state.university,
//   );
//   const [selectedschool, setselectedschool] = useState("");
//   const [totalstudentPerSchool, settotalstudentPerSchool] = useState(0);
//   const [tongNam, settongNam] = useState(0);
//   const [tongNu, settongNu] = useState(0);

//   const caculateAll = () => {
//     const totalScore = data.reduce((accumulator, student) => {
//       if (student.school === selectedschool) {
//         return accumulator + 1;
//       }
//       return accumulator;
//     }, 0);
//     settotalstudentPerSchool(totalScore);
//   };

//   const hamTongNam = () => {
//     const totalScore = data.reduce((accumulator, student) => {
//       if (student.gender === "male" && student.school === selectedschool) {
//         return accumulator + 1;
//       }
//       return accumulator;
//     }, 0);
//     settongNam(totalScore);
//   };

//   const hamTongNu = () => {
//     const totalScore = data.reduce((accumulator, student) => {
//       if (student.gender === "female" && student.school === selectedschool) {
//         return accumulator + 1;
//       }
//       return accumulator;
//     }, 0);
//     settongNu(totalScore);
//   };

//   useEffect(() => {
//     caculateAll();
//     hamTongNam();
//     hamTongNu();
//   }, [selectedschool]);

//   if (auth.role !== "admin") return <Unauthorized />;
//   return (
//     <>
//       <section className="body-font">
//         <div className="container mx-auto px-5 py-24">
//           <div className="mb-20 text-center">
//             <h1 className="title-font mb-4 text-center font-notosanslao text-2xl font-bold text-primary sm:text-3xl">
//               ສັງລວມນັກຮຽນທີ່ຢູ່ຕາມໂຮງຮຽນຕ່າງໆ
//             </h1>
//           </div>
//           <div className="mb-20 flex justify-center gap-20">
//             <div className="dropdown w-96">
//               <label
//                 tabIndex={0}
//                 className="btn btn-lg m-1 w-full font-notosanslao"
//               >
//                 {universityStatus.fetchAll === "loading" ? (
//                   <span className="loading loading-dots loading-md"></span>
//                 ) : (
//                   <>
//                     ເລືອກໂຮງຮຽນ
//                     <AiOutlineCaretDown />
//                   </>
//                 )}
//               </label>
//               <ul
//                 tabIndex={0}
//                 className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
//               >
//                 {universities.map((i) => (
//                   <li onClick={() => setselectedschool(i.vietName)} key={i._id}>
//                     <a>{i.vietName}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="container space-y-10">
//             <div className="stats stats-vertical w-full shadow lg:stats-horizontal">
//               <div className="stat">
//                 <div className="stat-title">Downloads</div>
//                 <div className="stat-value">31K</div>
//                 <div className="stat-desc">Jan 1st - Feb 1st</div>
//               </div>

//               <div className="stat">
//                 <div className="stat-title">New Users</div>
//                 <div className="stat-value">4,200</div>
//                 <div className="stat-desc">↗︎ 400 (22%)</div>
//               </div>

//               <div className="stat">
//                 <div className="stat-title">New Registers</div>
//                 <div className="stat-value">1,200</div>
//                 <div className="stat-desc">↘︎ 90 (14%)</div>
//               </div>
//             </div>
//             {/* <div className="overflow-x-auto">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>
//                       <label>
//                         <input type="checkbox" className="checkbox" />
//                       </label>
//                     </th>
//                     <th>Name</th>
//                     <th>Job</th>
//                     <th>Favorite Color</th>
//                     <th></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th>
//                       <label>
//                         <input type="checkbox" className="checkbox" />
//                       </label>
//                     </th>
//                     <td>
//                       <div className="flex items-center gap-3">
//                         <div className="avatar">
//                           <div className="mask mask-squircle h-12 w-12">
//                             <img
//                               src="/tailwind-css-component-profile-2@56w.png"
//                               alt="Avatar Tailwind CSS Component"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <div className="font-bold">Hart Hagerty</div>
//                           <div className="text-sm opacity-50">
//                             United States
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       Zemlak, Daniel and Leannon
//                       <br />
//                       <span className="badge badge-ghost badge-sm">
//                         Desktop Support Technician
//                       </span>
//                     </td>
//                     <td>Purple</td>
//                     <th>
//                       <button className="btn btn-ghost btn-xs">details</button>
//                     </th>
//                   </tr>
//                   <tr>
//                     <th>
//                       <label>
//                         <input type="checkbox" className="checkbox" />
//                       </label>
//                     </th>
//                     <td>
//                       <div className="flex items-center gap-3">
//                         <div className="avatar">
//                           <div className="mask mask-squircle h-12 w-12">
//                             <img
//                               src="/tailwind-css-component-profile-3@56w.png"
//                               alt="Avatar Tailwind CSS Component"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <div className="font-bold">Brice Swyre</div>
//                           <div className="text-sm opacity-50">China</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       Carroll Group
//                       <br />
//                       <span className="badge badge-ghost badge-sm">
//                         Tax Accountant
//                       </span>
//                     </td>
//                     <td>Red</td>
//                     <th>
//                       <button className="btn btn-ghost btn-xs">details</button>
//                     </th>
//                   </tr>
//                   <tr>
//                     <th>
//                       <label>
//                         <input type="checkbox" className="checkbox" />
//                       </label>
//                     </th>
//                     <td>
//                       <div className="flex items-center gap-3">
//                         <div className="avatar">
//                           <div className="mask mask-squircle h-12 w-12">
//                             <img
//                               src="/tailwind-css-component-profile-4@56w.png"
//                               alt="Avatar Tailwind CSS Component"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <div className="font-bold">Marjy Ferencz</div>
//                           <div className="text-sm opacity-50">Russia</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       Rowe-Schoen
//                       <br />
//                       <span className="badge badge-ghost badge-sm">
//                         Office Assistant I
//                       </span>
//                     </td>
//                     <td>Crimson</td>
//                     <th>
//                       <button className="btn btn-ghost btn-xs">details</button>
//                     </th>
//                   </tr>
//                   <tr>
//                     <th>
//                       <label>
//                         <input type="checkbox" className="checkbox" />
//                       </label>
//                     </th>
//                     <td>
//                       <div className="flex items-center gap-3">
//                         <div className="avatar">
//                           <div className="mask mask-squircle h-12 w-12">
//                             <img
//                               src="/tailwind-css-component-profile-5@56w.png"
//                               alt="Avatar Tailwind CSS Component"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <div className="font-bold">Yancy Tear</div>
//                           <div className="text-sm opacity-50">Brazil</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       Wyman-Ledner
//                       <br />
//                       <span className="badge badge-ghost badge-sm">
//                         Community Outreach Specialist
//                       </span>
//                     </td>
//                     <td>Indigo</td>
//                     <th>
//                       <button className="btn btn-ghost btn-xs">details</button>
//                     </th>
//                   </tr>
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <th></th>
//                     <th>Name</th>
//                     <th>Job</th>
//                     <th>Favorite Color</th>
//                     <th></th>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div> */}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Unauthorized from "./public/Unauthorized";
import { getFilteredUsers } from "../feature/user/UserSlice";
import StatUsers from "../components/stat/StatUsers";
import PaginateNoPath from "../components/paginate/PaginateNoPath";
import UserTable from "../components/table/dashboard/StudenTable";
import { listAnnouncements } from "../feature/announcement/AnnouncementSlice";
const Dashboard = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { universities } = useSelector((state) => state.university);
  const { announcements } = useSelector((state) => state.announcement);

  const { residenceAddresses } = useSelector((state) => state.residenceAddress);
  const {
    users,
    status: userStatus,
    total,
  } = useSelector((state) => state.user);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedResidenceAddress, setSelectedResidenceAddress] = useState("");
  const [filterChoice, setFilterChoice] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

    dispatch(
      getFilteredUsers({
        ...filters,
        page: currentPage,
        limit: itemsPerPage,
      }),
    );
  }, [
    dispatch,
    filterChoice,
    selectedResidenceAddress,
    selectedUniversity,
    currentPage,
    itemsPerPage,
  ]);

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
          <div className="mb-10 flex flex-col items-start gap-4 md:flex-row">
            <StatUsers users={users} />
            <ul className="menu rounded-box w-80 bg-base-200">
              <div className="mb-4 ml-2 mt-2 flex flex-row items-start justify-between">
                <span>Announcement:</span>
                <button className="btn btn-link btn-xs">View all</button>
              </div>
              {announcements.map((announcement) => (
                <li key={announcement._id}>
                  <a>
                    <p className="truncate">{announcement.title}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <label className="form-control w-full max-w-fit">
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
                Header: "Lao Name",
                accessor: "fullname.laoName",
              },
              {
                Header: "Last Name (English)",
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
              currentPage={currentPage}
              total={total}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
