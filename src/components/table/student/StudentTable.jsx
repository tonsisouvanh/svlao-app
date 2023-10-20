import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import EditStudent from "../../../page/student/EditStudent";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineMore,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { fetchStudents } from "../../../feature/student/StudentSlice";

const cellStyle = "whitespace-nowrap truncate font-light";
// const headerStyle = "border-r-[0.1rem]";

const StudentTable = ({ editToggle, setEditToggle }) => {
  const { status, students } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const data = useMemo(() => students, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Lao Name",
        accessor: "fullname.laoName",
      },
      {
        Header: "Major (Lao)",
        accessor: "major.laoMajor",
      },
      {
        Header: "Major (Viet)",
        accessor: "major.vietMajor",
      },
      {
        Header: "Visa From",
        accessor: "visa.from",
      },
      {
        Header: "Visa To",
        accessor: "visa.to",
      },
      {
        Header: "Date of Birth",
        accessor: "dob",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Passport Expired",
        accessor: "passport.expired",
      },
      {
        Header: "Passport No",
        accessor: "passport.passportNo",
      },
      {
        Header: "Student ID",
        accessor: "studentId",
      },
      {
        Header: "Facebook URL",
        accessor: "facebookUrl",
      },
      {
        Header: "Permanent Address",
        accessor: "permanentAddress",
      },
      {
        Header: "Residence Address",
        accessor: "residenceAddress",
      },
      {
        Header: "Created Date",
        accessor: "createdDate",
      },
      {
        Header: "Degree (Viet)",
        accessor: "degree.vietDegree",
      },
      {
        Header: "Degree (Lao)",
        accessor: "degree.laoDegree",
      },
      {
        Header: "User ID",
        accessor: "userId",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Scholarship (Vn)",
        accessor: "scholarship.scholarshipVn",
      },
      {
        Header: "Scholarship (University)",
        accessor: "scholarship.scholarshipUniversity",
      },
      {
        Header: "Scholarship (Lao)",
        accessor: "scholarship.scholarshipLao",
      },
      {
        Header: "Scholarship Type",
        accessor: "scholarship.type",
      },
      {
        Header: "Last Name (English)",
        accessor: "fullname.englishLastname",
      },
      {
        Header: "First Name (English)",
        accessor: "fullname.englishFirstname",
      },
      {
        Header: "Duration From",
        accessor: "duration.from",
      },
      {
        Header: "Duration To",
        accessor: "duration.to",
      },
      {
        Header: "Emergency Phone",
        accessor: "phone.emergency",
      },
      {
        Header: "Relationship",
        accessor: "phone.relationship",
      },
      {
        Header: "Phone Number",
        accessor: "phone.phoneNumber",
      },
      {
        Header: "University (English Name)",
        accessor: "university.englishName",
      },
      {
        Header: "University (Lao Name)",
        accessor: "university.laoName",
      },
      {
        Header: "University (Viet Name)",
        accessor: "university.vietName",
      },
      {
        Header: "University Shortcut",
        accessor: "university.shortcut",
      },
    ],
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;
  const [editingStudent, setEditingStudent] = useState();

  const handleClickEdit = (student) => {
    setEditToggle(true);
    setEditingStudent(student.original);
  };

  if (status === "loading") {
    return <Spinner />;
  }
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
          <table
            {...getTableProps()}
            className="table table-md font-notosanslao"
          >
            <thead>
              {students &&
                headerGroups?.map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    <th></th>
                    {headerGroup &&
                      headerGroup?.headers?.map((column, index) => (
                        <th
                          key={index}
                          {...column.getHeaderProps(
                            column.getSortByToggleProps(),
                          )}
                        >
                          <div className="flex items-center">
                            {column.render("Header")}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <AiFillCaretUp />
                                ) : (
                                  <AiFillCaretDown />
                                )
                              ) : null}
                            </span>
                          </div>
                        </th>
                      ))}
                  </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {students &&
                rows?.map((row) => {
                  prepareRow(row);
                  return (
                    <tr key={row.id} {...row.getRowProps()}>
                      <td>
                        <div className="dropdown dropdown-right">
                          <label tabIndex={0} className="btn btn-xs px-1 py-0">
                            <AiOutlineMore />
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content rounded-box absolute !-top-2 !right-0 z-[1] !flex w-fit gap-4 border bg-base-100 p-2 shadow"
                          >
                            <li
                              onClick={() => handleClickEdit(row)}
                              className="btn btn-ghost btn-xs"
                            >
                              <a>
                                <AiFillEdit size={15} />
                              </a>
                            </li>
                            <li className="btn btn-ghost btn-xs">
                              <a>
                                <AiFillDelete size={15} />
                              </a>
                            </li>
                            <Link to={`/student-detail/${row.original.id}`}>
                              <li className="btn btn-ghost btn-xs">
                                <AiFillEye size={15} />
                              </li>
                            </Link>
                          </ul>
                        </div>
                      </td>
                      {students &&
                        row?.cells?.map((cell, index) => (
                          <td
                            className={cellStyle}
                            key={index}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>{JSON.stringify(students)}</div>
        </div>
      )}
    </>
  );
};

export default StudentTable;
