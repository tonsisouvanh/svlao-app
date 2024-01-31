import { useMemo, useState } from "react";
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
import { Link } from "react-router-dom";
import InfoModal from "../../modal/InfoModal";
import { UNIVERSITY_COLUMNS } from "../../../data/data";
// import Searchbox from "../../input/student/Searchbox";
import altImage from "../../../assets/img/profile.png";
import { removeUniversity } from "../../../feature/globalData/UniversitySlice";
const cellStyle = "whitespace-nowrap truncate font-light";

const UniversityTable = ({ editToggle, setEditToggle }) => {
  const { universities, listStatus, removeStatus } = useSelector(
    (state) => state.university,
  );
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deletedUniversityId, setDeletedUniversityId] = useState("");
  const data = useMemo(() => universities, [universities]);
  const columns = useMemo(() => UNIVERSITY_COLUMNS, []);
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
    setDeletedUniversityId(id);
    setOpenModal(true);
  };
  const handleDeleteUniversity = () => {
    dispatch(removeUniversity(deletedUniversityId));
    setDeletedUniversityId("");
    setOpenModal(false);
  };
  const replaceImage = (error) => {
    error.target.src = altImage;
  };

  if (listStatus === "loading") {
    return <Spinner />;
  }
  return (
    <>
      {editToggle ? (
        <span>Edit university component here</span>
      ) : listStatus === "loading" || removeStatus === "loading" ? (
        <Spinner />
      ) : (
        <>
          {openModal && (
            <InfoModal
              title={"Delete university"}
              modaltype={"question"}
              desc={
                "This university data will be perminently delete, are you sure?"
              }
              initialValue={true}
              isOnclickEvent={true}
              confirmLabel={"Delete"}
              handleClick={handleDeleteUniversity}
            />
          )}
          {/* <div className="mb-5 flex flex-wrap items-center gap-2">
            <Searchbox filter={globalFilter} setFilter={setGlobalFilter} />
          </div> */}
          <div className="overflow-x-auto">
            <table
              {...getTableProps()}
              className="table table-md font-notosanslao"
            >
              <thead>
                {universities &&
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
                {universities &&
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
                              <Link
                                to={`/dashboard/university-list/${row.original._id}`}
                              >
                                <li className="btn btn-ghost btn-xs">
                                  <AiFillEdit size={15} />
                                </li>
                              </Link>
                              <li
                                onClick={() =>
                                  handleOpenModal(row.original._id)
                                }
                                className="btn btn-ghost btn-xs"
                              >
                                <a>
                                  <AiFillDelete size={15} />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                        {universities &&
                          row?.cells?.map((cell, index) => (
                            <td
                              className={cellStyle}
                              key={index}
                              {...cell.getCellProps()}
                            >
                              {cell.column.id === "listStatus" ? (
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
                                      onError={replaceImage}
                                    />
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

export default UniversityTable;
