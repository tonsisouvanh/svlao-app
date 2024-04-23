import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { useGlobalFilter, useSortBy, useTable, useFilters } from "react-table";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import InfoModal from "../../modal/InfoModal";
import { UNIVERSITY_COLUMNS } from "../../../data/data";
import altImage from "../../../assets/img/profile.png";
import { removeUniversity } from "../../../feature/globalData/UniversitySlice";
import EmptyState from "../../EmptyState";
const cellStyle = "whitespace-nowrap truncate font-light";

const UniversityTable = ({ editToggle }) => {
  const { universities, status } = useSelector((state) => state.university);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deletedUniversityId, setDeletedUniversityId] = useState("");
  const data = useMemo(() => universities, [universities]);
  const columns = useMemo(() => UNIVERSITY_COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

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

  if (status.fetchAll === "loading") {
    return <Spinner />;
  }
  return (
    <>
      {editToggle ? (
        <span>Edit university component here</span>
      ) : status.fetchAll === "loading" || status.remove === "loading" ? (
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
          {universities && universities.length > 0 ? (
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
                  {universities &&
                    rows?.map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          <td>
                            <div className="flex flex-wrap gap-2 whitespace-nowrap">
                              <Link
                                to={`/manage-others-data/university-list/${row.original._id}`}
                                className="btn btn-primary btn-outline btn-xs sm:btn-sm"
                              >
                                <AiFillEdit size={15} />
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenModal(row.original._id)
                                }
                                className="btn btn-error btn-outline btn-xs sm:btn-sm"
                              >
                                <AiFillDelete size={15} />
                              </button>
                            </div>
                          </td>
                          {universities &&
                            row?.cells?.map((cell, index) => (
                              <td
                                className={cellStyle}
                                key={index}
                                {...cell.getCellProps()}
                              >
                                {cell.column.id === "status.fetchAll" ? (
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
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </>
  );
};

export default UniversityTable;
