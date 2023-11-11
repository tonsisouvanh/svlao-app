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
import { BiSolidSortAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  STUDENT_COLUMNS,
  mockDegrees,
  majorList,
  mockUniversity,
  scholarshipTypes,
  userStatus,
} from "../../../data/data";
import InfoModal from "../../modal/InfoModal";
import { adminDeleteStudent } from "../../../feature/student/StudentSlice";
import consule from "../../../assets/img/consule.jpg";
import { BsFacebook } from "react-icons/bs";

const cellStyle = "whitespace-nowrap truncate font-light";

const StudentTable = ({ editToggle, setEditToggle, view }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [totalDegree, setTotalDegree] = useState({
    associate: 0,
    bachelor: 0,
    master: 0,
    dotoral: 0,
  });

  const isRenderField = (renderFields, passedField) => {
    return renderFields.includes(passedField.toString());
  };

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
          <div className="overflow-x-auto">
            {/* State */}
            <div className="stats my-4 w-full border font-notosanslao shadow">
              <div className="stat place-items-center">
                <div className="stat-title text-lg">ນຮ ທັງໝົດ</div>
                <div className="stat-value">
                  {totalStudents}
                  <span className="ml-4 text-sm font-normal">ຄົນ</span>
                </div>
                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
              </div>
              <div className="stat place-items-center">
                <div className="stat-title text-lg">ຍິງ</div>
                <div className="stat-value">
                  {totalFemale}
                  <span className="ml-4 text-sm font-normal">ຄົນ</span>
                </div>
                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
              </div>
              <div className="stat place-items-center">
                <div className="stat-title text-lg">ຊາຍ</div>
                <div className="stat-value">
                  {totalMale}
                  <span className="ml-4 text-sm font-normal">ຄົນ</span>
                </div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
              <div className="stat place-items-center">
                <div className="stat-title text-lg">ປ ຕີ</div>
                <div className="stat-value">
                  {totalDegree.bachelor}
                  <span className="ml-4 text-sm font-normal">ຄົນ</span>
                </div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
              <div className="stat place-items-center">
                <div className="stat-title text-lg">ປ ໂທ</div>
                <div className="stat-value">
                  {totalDegree.master}
                  <span className="ml-4 text-sm font-normal">ຄົນ</span>
                </div>
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
                title={"ສະຖານະ"}
                fieldName={"status"}
              />
              {/*  */}
              <Filter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                options={majorList}
                title={"ສາຍຮຽນ"}
                fieldName={"vietMajor"}
              />
            </div>
            {view === "grid" ? (
              <div {...getTableProps()} className="font-notosanslao">
                <div className="">
                  {students &&
                    headerGroups?.map((headerGroup) => (
                      <div
                        className="flex items-start gap-5 overflow-auto my-4"
                        key={headerGroup.id}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup &&
                          headerGroup?.headers?.map((column, index) => (
                            <div
                              className="rounded-full px-2"
                              key={index}
                              {...column.getHeaderProps(
                                column.getSortByToggleProps(),
                              )}
                            >
                              <div className="flex items-center whitespace-nowrap text-sm">
                                {column.render("Header")}
                                <span>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <AiFillCaretUp />
                                    ) : (
                                      <AiFillCaretDown />
                                    )
                                  ) : (
                                    <BiSolidSortAlt />
                                  )}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
                <div
                  className="xl:grid-cols-4d grid grid-cols-1 gap-4 font-notosanslao sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                  {...getTableBodyProps()}
                >
                  {students &&
                    rows?.map((row) => {
                      prepareRow(row);
                      return (
                        <div
                          className="relative space-y-1 rounded-lg bg-base-200 text-center shadow-md"
                          key={row.id}
                          {...row.getRowProps()}
                        >
                          <div className="relative -mb-16 overflow-hidden rounded-t-lg">
                            <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/30 backdrop-invert backdrop-opacity-10"></div>
                            <img
                              src={consule}
                              alt=""
                              className="h-[10rem] w-full object-cover object-top"
                            />
                          </div>
                          {students &&
                            row?.cells?.map((cell, index) => (
                              <div
                                className={cellStyle}
                                key={index}
                                {...cell.getCellProps()}
                              >
                                {isRenderField(
                                  [
                                    "profileImg",
                                    "userStatus",
                                    "fullname.laoName",
                                    "major.laoMajor",
                                  ],
                                  cell.column.id,
                                ) && (
                                  <>
                                    {cell.column.id === "profileImg" ? (
                                      <div className="avatar flex w-full items-center justify-center py-1">
                                        <div className="w-28 rounded-full ring ring-primary">
                                          <img src={cell.value} />
                                        </div>
                                      </div>
                                    ) : cell.column.id === "userStatus" ? (
                                      <span
                                        className={`badge badge-md absolute left-4 top-4 rounded-full shadow-md ${
                                          cell.value === "active"
                                            ? " badge-success text-white"
                                            : "badge-warning"
                                        }`}
                                      >
                                        {cell.render("Cell")}
                                      </span>
                                    ) : (
                                      <span className="font-boldd text-center text-base lg:text-lg">
                                        {cell.render("Cell")}
                                      </span>
                                    )}
                                  </>
                                )}
                                {/* )} */}
                              </div>
                            ))}
                          <div className="flex items-center justify-center p-4">
                            <div className="flex-grow space-y-2">
                              <div className="flex flex-wrap items-center justify-end gap-2">
                                <a
                                  href={row?.original.facebookUrl}
                                  rel="noreferrer"
                                  target="_blank"
                                  className="btn btn-ghost btn-sm !px-0 sm:btn-xs"
                                >
                                  <BsFacebook className="text-2xl text-blue-600" />
                                </a>
                                <button
                                  onClick={() => handleClickEdit(row)}
                                  className="btn btn-accent btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs"
                                >
                                  <AiFillEdit />
                                </button>
                                <button
                                  onClick={() =>
                                    handleOpenModal(row.original.id)
                                  }
                                  className={`btn btn-error btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs`}
                                >
                                  <AiFillDelete />
                                </button>
                                <Link to={`/student-detail/${row.original.id}`}>
                                  <button className="btn btn-primary btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs">
                                    <AiFillEye />
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
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
                                  onClick={() =>
                                    handleOpenModal(row.original.id)
                                  }
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
            )}
          </div>
        </>
      )}
    </>
  );
};

export default StudentTable;
