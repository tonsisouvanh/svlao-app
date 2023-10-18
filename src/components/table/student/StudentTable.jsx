import React, { useEffect } from "react";
import { theads } from "./data";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";

const cellStyle = "whitespace-nowrap truncate";
const headerStyle = "border-r-[0.1rem]";

const StudentTable = ({ studentsProps }) => {
  const { students, status } = useSelector((state) => state.students);
  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto ">
          <table className="table table-sm font-notosanslao">
            <thead className="">
              <tr className="">
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
