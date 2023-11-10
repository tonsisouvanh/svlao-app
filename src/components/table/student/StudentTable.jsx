import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import EditStudent from "../../../page/student/EditStudent";
import { useGlobalFilter, useSortBy, useTable, useFilters } from "react-table";
import Filter from "../../input/student/Filter";
import Searchbar from "../../input/student/Searchbar";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineMore,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  STUDENT_COLUMNS,
  mockDegrees,
  mockMajor,
  mockUniversity,
  scholarshipTypes,
  userStatus,
} from "../../../data/data";
import InfoModal from "../../modal/InfoModal";
import { adminDeleteStudent } from "../../../feature/student/StudentSlice";

const cellStyle = "whitespace-nowrap truncate font-light";

const StudentTable = ({ editToggle, setEditToggle }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [totalDegree, setTotalDegree] = useState({
    associate: 0,
    bachelor: 0,
    master: 0,
    dotoral: 0,
  });

  const { status, students } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deletedStudent, setDeletedStudent] = useState("");
  const data = useMemo(() => students, []);
  const columns = useMemo(() => STUDENT_COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  const { globalFilter } = state;
  const [editingStudent, setEditingStudent] = useState();

  const handleClickEdit = (student) => {
    setEditToggle(true);
    setEditingStudent(student.original);
  };
  const handleOpenModal = (id) => {
    setDeletedStudent(id);
    setOpenModal(true);
  };
  const handleDeletStudent = () => {
    dispatch(adminDeleteStudent(deletedStudent));
    setDeletedStudent("");
    setOpenModal(false);
  };

  useEffect(() => {
    setTotalStudents(rows.length);
    const maleCount = rows.filter(
      (student) => student.original.gender === "male",
    ).length;
    const femaleCount = rows.filter(
      (student) => student.original.gender === "female",
    ).length;
    setTotalMale(maleCount);
    setTotalFemale(femaleCount);
    setTotalDegree({
      bachelor: rows.filter(
        (student) =>
          student.original.degree.vietDegree.toLowerCase() === "cử nhân",
      ).length,
      master: rows.filter(
        (student) =>
          student.original.degree.vietDegree.toLowerCase() === "thạc sĩ",
      ).length,
    });
  }, [rows]);

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
        <>
          {openModal && (
            <InfoModal
              title={"Delete student"}
              modaltype={"question"}
              desc={
                "This student data will be perminently delete, are you sure?"
              }
              initialValue={true}
              isOnclickEvent={true}
              confirmLabel={"Delete"}
              handleClick={handleDeletStudent}
            />
          )}
          <div className="overflow-x-auto ">
            {/* State */}
            <div className="my-4 shadow">
              <div className="stat w-36">
                <div className="stat-title">All Students</div>
                <div className="stat-value">{totalStudents}</div>
                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
              </div>
              <div className="stat w-36">
                <div className="stat-title">Female</div>
                <div className="stat-value">{totalFemale}</div>
                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
              </div>
              <div className="stat w-36">
                <div className="stat-title">Male</div>
                <div className="stat-value">{totalMale}</div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
              <div className="stat w-36">
                <div className="stat-title">Bachelor</div>
                <div className="stat-value">{totalDegree.bachelor}</div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
              <div className="stat w-36">
                <div className="stat-title">Master</div>
                <div className="stat-value">{totalDegree.master}</div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
            </div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Searchbar filter={globalFilter} setFilter={setGlobalFilter} />
              <Filter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                options={scholarshipTypes}
                title={"ປະເພດທຶນ"}
                fieldName={"name"}
              />
              <Filter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                options={mockDegrees}
                title={"ລະດັບການສຶກສາ"}
                fieldName={"laoDegree"}
              />
              <Filter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                options={mockUniversity}
                title={"ມະຫາໄລ"}
                fieldName={"laoName"}
              />
              <Filter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                options={userStatus}
                title={"Status"}
                fieldName={"status"}
              />
              {/*  */}
              <Filter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                options={mockMajor}
                title={"Major"}
                fieldName={"vietMajor"}
              />
            </div>
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
                            {/* <div>
                            {column.canFilter ? column.render("Filter") : null}
                          </div> */}
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
                            <label
                              tabIndex={0}
                              className="btn btn-xs px-1 py-0"
                            >
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
                              <li
                                // onClick={() => setOpenModal(true)}
                                onClick={() => handleOpenModal(row.original.id)}
                                className="btn btn-ghost btn-xs"
                              >
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
                              {cell.column.id === "userStatus" ? (
                                <span
                                  className={`badge ${
                                    cell.value === "active"
                                      ? " badge-success text-white"
                                      : "badge-warning"
                                  }`}
                                >
                                  {cell.render("Cell")}
                                </span>
                              ) : cell.column.id === "gender" ? (
                                <>{cell.value === "male" ? "ຊາຍ" : "ຍິງ"}</>
                              ) : cell.column.id === "profileImg" ? (
                                <div className="avatar">
                                  <div className="w-10 rounded-full">
                                    <img src={cell.value} />
                                  </div>
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          ))}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default StudentTable;
