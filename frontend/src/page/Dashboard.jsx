import { data, university } from "../data/data";
import { useState, useEffect } from "react";
import {
  AiOutlineWoman,
  AiOutlineMan,
  AiOutlineCaretDown,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import Unauthorized from "./public/Unauthorized";
const Dashboard = () => {
  const { auth } = useSelector((state) => state.auth);
  const [selectedschool, setselectedschool] = useState("");
  const [totalstudentPerSchool, settotalstudentPerSchool] = useState(0);
  const [tongNam, settongNam] = useState(0);
  const [tongNu, settongNu] = useState(0);

  const caculateAll = () => {
    const totalScore = data.reduce((accumulator, student) => {
      if (student.school === selectedschool) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    settotalstudentPerSchool(totalScore);
  };

  const hamTongNam = () => {
    const totalScore = data.reduce((accumulator, student) => {
      if (student.gender === "male" && student.school === selectedschool) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    settongNam(totalScore);
  };

  const hamTongNu = () => {
    const totalScore = data.reduce((accumulator, student) => {
      if (student.gender === "female" && student.school === selectedschool) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    settongNu(totalScore);
  };

  useEffect(() => {
    caculateAll();
    hamTongNam();
    hamTongNu();
  }, [selectedschool]);
  return (
    <>
      {auth.role === "admin" ? (
        <section className="body-font">
          <div className="container mx-auto px-5 py-24">
            <div className="mb-20 text-center">
              <h1 className="title-font text-primary-conten mb-4 text-center font-notosanslao text-2xl font-bold sm:text-3xl">
                ສັງລວມນັກຮຽນທີ່ຢູ່ຕາມໂຮງຮຽນຕ່າງໆ
              </h1>
            </div>
            <div className="mb-20 flex justify-center gap-20">
              <div className="dropdown w-96">
                <label
                  tabIndex={0}
                  className="btn btn-lg m-1 w-full font-notosanslao"
                >
                  ເລືອກໂຮງຮຽນ
                  <AiOutlineCaretDown />
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
                >
                  {university.map((i) => (
                    <li onClick={() => setselectedschool(i.name)} key={i.id}>
                      <a>{i.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dropdown w-96">
                <label
                  tabIndex={0}
                  className="btn btn-lg m-1 w-full font-notosanslao"
                >
                  ເລືອກຫໍພັກ
                  <AiOutlineCaretDown />
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
                >
                  {university.map((i) => (
                    <li onClick={() => setselectedschool(i.name)} key={i.id}>
                      <a>{i.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="container space-y-10">
              <div className="stats stats-vertical w-full shadow lg:stats-horizontal">
                <div className="stat">
                  <div className="stat-title">Downloads</div>
                  <div className="stat-value">31K</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                  <div className="stat-title">New Users</div>
                  <div className="stat-value">4,200</div>
                  <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                  <div className="stat-title">New Registers</div>
                  <div className="stat-value">1,200</div>
                  <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="/tailwind-css-component-profile-2@56w.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Hart Hagerty</div>
                            <div className="text-sm opacity-50">
                              United States
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Zemlak, Daniel and Leannon
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Desktop Support Technician
                        </span>
                      </td>
                      <td>Purple</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="/tailwind-css-component-profile-3@56w.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Brice Swyre</div>
                            <div className="text-sm opacity-50">China</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Carroll Group
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Tax Accountant
                        </span>
                      </td>
                      <td>Red</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="/tailwind-css-component-profile-4@56w.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Marjy Ferencz</div>
                            <div className="text-sm opacity-50">Russia</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Rowe-Schoen
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Office Assistant I
                        </span>
                      </td>
                      <td>Crimson</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                    {/* row 4 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="/tailwind-css-component-profile-5@56w.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Yancy Tear</div>
                            <div className="text-sm opacity-50">Brazil</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Wyman-Ledner
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Community Outreach Specialist
                        </span>
                      </td>
                      <td>Indigo</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                  </tbody>
                  {/* foot */}
                  <tfoot>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* <div className="stats flex items-center justify-center font-notosanslao shadow">
        <div className="stat text-primary-content">
          <div className="stat-figure flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title flex gap-10 ">ນັກຮຽນທັງໝົດ:</div>
          <div className="stat-value">{totalstudentPerSchool}</div>
        </div>

        <div className="stat text-primary-content">
          <div className="flex justify-center gap-10">
            <div className="stat-title flex items-center justify-center">
              ຊາຍ
            </div>
            <div className="stat-value flex items-center justify-center ">
              {tongNam} <AiOutlineMan />
            </div>

            <div className="stat-title flex items-center justify-center ">
              ຍິງ
            </div>
            <div className="stat-value flex items-center justify-center">
              {tongNu} <AiOutlineWoman />
            </div>
          </div>
        </div>
        <div className="stat text-primary-content">
          <div className="flex justify-center gap-10">
            <div className="stat-title flex items-center justify-center">
              ປ ຕີ
            </div>
            <div className="stat-value flex items-center justify-center ">
              {tongNu}
            </div>{" "}
            <div className="stat-title flex items-center justify-center">
              ປ ໂທ
            </div>
            <div className="stat-value flex items-center justify-center">
              {tongNu}
            </div>
          </div>
        </div>
      </div> */}
          </div>
        </section>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Dashboard;
