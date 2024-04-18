import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { useGlobalFilter, useSortBy, useTable, useFilters } from "react-table";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDelete,
  AiFillEdit,
  AiOutlineMore,
} from "react-icons/ai";
import altImage from "../../../assets/img/profile.png";
import { Link } from "react-router-dom";
import InfoModal from "../../modal/InfoModal";
import { removeUser, userReset } from "../../../feature/user/UserSlice";
import { formatDateDDMMYYYY, replaceImage } from "../../../utils/utils";
import toast from "react-hot-toast";
const cellStyle = "whitespace-nowrap truncate font-light";

const UserTable = ({ users, userStatus, columnHead }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deletedUserId, setDeletedUserId] = useState("");
  const data = useMemo(() => users, [users]);
  const columns = useMemo(() => columnHead, []);
  const { status } = useSelector((state) => state.user);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

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
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="table table-md font-notosanslao">
          <thead>
            {users &&
              headerGroups?.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
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
            {users &&
              rows?.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    <td>
                      <div className="dropdown dropdown-right">
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
      </div>
    </>
  );
};

export default UserTable;
