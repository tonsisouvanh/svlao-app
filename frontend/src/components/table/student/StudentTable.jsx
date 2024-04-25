import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { useGlobalFilter, useSortBy, useTable, useFilters } from "react-table";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
} from "react-icons/ai";
import altImage from "../../../assets/img/profile.png";
import { BiSolidSortAlt } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import InfoModal from "../../modal/InfoModal";
import { BsFacebook } from "react-icons/bs";
import { STUDENT_COLUMNS, scholarshipTypes } from "../../../data/data";
import Searchbox from "../../input/student/Searchbox";
import { removeUser, userReset } from "../../../feature/user/UserSlice";
import { formatDateDDMMYYYY, replaceImage } from "../../../utils/utils";
import toast from "react-hot-toast";
const cellStyle = "whitespace-nowrap truncate font-light";

const UserTable = ({
  view,
  users,
  userStatus,
  columnHead = STUDENT_COLUMNS,
}) => {
  const { pathname } = useLocation();
  const isRenderField = (renderFields, passedField) => {
    return renderFields.includes(passedField.toString());
  };
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deletedUserId, setDeletedUserId] = useState("");
  const data = useMemo(() => users, [users]);
  const columns = useMemo(() => columnHead, []);
  const { status } = useSelector((state) => state.user);
  const { universities } = useSelector((state) => state.university);
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

  const handleOpenModal = (id) => {
    setDeletedUserId(id);
    setOpenModal(true);
  };
  const handleDeletUser = () => {
    dispatch(removeUser(deletedUserId));
    setDeletedUserId("");
    setOpenModal(false);
  };

  useEffect(() => {
    if (status.remove === "succeeded") {
      toast.success("Deleted announcement");
      dispatch(userReset());
    } else if (status.remove === "failed") {
      toast.error("Failed to delete");
      dispatch(userReset());
    }
  }, [status.remove, dispatch]);

  if (userStatus.fetchAll === "loading" || userStatus.remove === "loading") {
    return <Spinner />;
  }
  return (
    <>
      {openModal && (
        <InfoModal
          title={"Delete user"}
          modaltype={"question"}
          desc={"This user data will be perminently delete, are you sure?"}
          initialValue={true}
          isOnclickEvent={true}
          confirmLabel={"Delete"}
          handleClick={handleDeletUser}
        />
      )}

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Searchbox filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex items-center gap-2">
          <div className="form-control w-fit max-w-xs">
            <select
              disabled={!pathname.includes("all") && true}
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="select select-bordered select-sm font-notosanslao focus:outline-none"
            >
              <option disabled value="">
                ປະເພດທຶນ
              </option>
              {scholarshipTypes &&
                scholarshipTypes?.map((ele, index) => (
                  <option key={index} value={ele.name}>
                    {ele.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control w-fit max-w-xs">
            <select
              disabled={!pathname.includes("all") && true}
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="select select-bordered select-sm font-notosanslao focus:outline-none"
            >
              <option disabled value="">
                ມະຫາໄລ
              </option>
              {universities &&
                universities?.map((ele, index) => (
                  <option key={index} value={ele.shortcut}>
                    {ele.laoName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <Link to="/dashboard/student-list/search/all">
          <button
            className={`btn btn-outline ${
              pathname.includes("all") && "btn-active"
            } btn-sm`}
          >
            ເບິ່ງທັງໝົດ
          </button>
        </Link>
        <Link to="/dashboard/student-list/page/1">
          <button
            className={`btn btn-outline btn-sm ${
              pathname.includes("page") && "btn-active"
            }`}
          >
            ເບິ່ງເປັນໜ້າ
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        {view === "grid" ? (
          <div {...getTableProps()} className="font-notosanslao">
            <div className="">
              {users &&
                headerGroups?.map((headerGroup) => (
                  <div
                    className="my-4 flex items-start gap-5 overflow-auto"
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
              {users &&
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
                          src={`/consule.jpg`}
                          alt=""
                          className="h-[10rem] w-full object-cover object-top"
                        />
                      </div>
                      {users &&
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
                            <button className="btn btn-accent btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs">
                              <AiFillEdit />
                            </button>
                            <button
                              onClick={() => handleOpenModal(row.original.id)}
                              className={`btn btn-error btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs`}
                            >
                              <AiFillDelete />
                            </button>
                            <Link to={`/user-detail/${row.original.id}`}>
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
              {users &&
                headerGroups?.map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    <th className=""></th>
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
              {users &&
                rows?.map((row) => {
                  prepareRow(row);
                  return (
                    <tr key={row.id} {...row.getRowProps()}>
                      <td className="">
                        {/* <div className="dropdown dropdown-right">
                          <label
                            tabIndex={0}
                            className="btn btn-primary btn-xs px-1 py-0"
                          >
                            <AiOutlineMore />
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content rounded-box absolute !-top-2 !right-0 z-[1] !flex w-fit gap-4 border bg-base-100 p-2 shadow"
                          >
                            <Link
                              to={`/dashboard/student-list/student/${row.original._id}`}
                            >
                              <li className="btn btn-ghost btn-xs">
                                <AiFillEdit size={15} />
                              </li>
                            </Link>
                            <li
                              onClick={() => handleOpenModal(row.original._id)}
                              className="btn btn-ghost btn-xs"
                            >
                              <a>
                                <AiFillDelete size={15} />
                              </a>
                            </li>
                          </ul>
                        </div> */}
                        <div className="flex flex-wrap gap-2 whitespace-nowrap">
                          <Link
                            to={`/dashboard/student-list/student/${row.original._id}`}
                            className="btn btn-primary btn-outline btn-xs sm:btn-sm"
                          >
                            <AiFillEdit size={15} />
                          </Link>
                          <button
                            onClick={() => handleOpenModal(row.original._id)}
                            className="btn btn-error btn-outline btn-xs sm:btn-sm"
                          >
                            <AiFillDelete size={15} />
                          </button>
                        </div>
                      </td>
                      {users &&
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
                                  <img
                                    src={cell.value}
                                    alt={cell.value}
                                    onError={(error) =>
                                      replaceImage(error, altImage)
                                    }
                                  />
                                </div>
                              </div>
                            ) : cell.column.id === "dob" ? (
                              <>
                                <span>{formatDateDDMMYYYY(cell.value)}</span>
                              </>
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
  );
};

export default UserTable;
