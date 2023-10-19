import React, { useEffect, useState } from "react";
import { theads } from "./data";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineMore,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import EditStudent from "../../../page/student/EditStudent";

const cellStyle = "whitespace-nowrap truncate";
const headerStyle = "border-r-[0.1rem]";

const StudentTable = ({ editToggle, setEditToggle, studentsProps }) => {
  const { students, status } = useSelector((state) => state.students);
  const [editingStudent, setEditingStudent] = useState();
  const handleClickEdit = (student) => {
    setEditToggle(true);
    setEditingStudent(student);
  };

  return (
    <>
      {editToggle ? (
        <EditStudent
          setEditToggle={setEditToggle}
          editingStudent={editingStudent}
        />
      ) : status === "loading" ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto ">
          <table className="table table-sm font-notosanslao">
            <thead className="">
              <tr className="">
                <th></th>
                <th></th>
                {theads.map((ele) => (
                  <th className={headerStyle} key={ele.label}>
                    {ele.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((ele, index) => (
                <tr key={ele.id}>
                  <th>{index + 1}</th>
                  <th className="">
                    <div className="dropdown dropdown-right">
                      <label tabIndex={0} className="btn btn-xs px-1 py-0">
                        <AiOutlineMore />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content rounded-box absolute !-top-2 !right-0 z-[1] !flex w-fit gap-4 border bg-base-100 p-2 shadow"
                      >
                        <li
                          onClick={() => handleClickEdit(ele)}
                          className="btn btn-ghost btn-xs"
                        >
                          <a>
                            <AiOutlineEdit />
                          </a>
                        </li>
                        <li className="btn btn-ghost btn-xs">
                          <a>
                            <AiOutlineDelete />
                          </a>
                        </li>
                        <Link to={`/student-detail/${ele.id}`}>
                          <li className="btn btn-ghost btn-xs">
                            <AiOutlineEye />
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </th>
                  <th className={cellStyle}>{ele?.id}</th>
                  <th className={cellStyle}>{ele?.fullname?.laoName}</th>
                  <th className={cellStyle}>
                    {ele?.fullname?.englishFirstname}
                  </th>
                  <th className={cellStyle}>
                    {ele?.fullname?.englishLastname}
                  </th>
                  <th className={cellStyle}>{ele?.fullname?.nickName}</th>
                  <th className={cellStyle}>{ele?.dob}</th>
                  <th className={cellStyle}>{ele?.gender}</th>
                  <th className={cellStyle}>{ele?.perminentAddress}</th>
                  <th className={cellStyle}>{ele?.university?.laoName}</th>
                  <th className={cellStyle}>{ele?.university?.vietName}</th>
                  <th className={cellStyle}>{ele?.major?.laoMajor}</th>
                  <th className={cellStyle}>{ele?.major?.vietMajor}</th>
                  <th className={cellStyle}>{ele?.degree?.laoDegree}</th>
                  <th className={cellStyle}>{ele?.degree?.vietDegree}</th>
                  <th className={cellStyle}>{ele?.scholarship?.type}</th>
                  <th className={cellStyle}>
                    {ele?.scholarship?.scholarshipLao}
                  </th>
                  <th className={cellStyle}>
                    {ele?.scholarship?.scholarshipVn}
                  </th>
                  <th className={cellStyle}>
                    {ele?.scholarship?.scholarshipUniversity}
                  </th>
                </tr>
              ))}
            </tbody>
            {/* <tfoot>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>company</th>
          <th>location</th>
          <th>Last Login</th>
          <th>Favorite Color</th>
        </tr>
      </tfoot> */}
          </table>
        </div>
      )}
    </>
  );
};

export default StudentTable;
