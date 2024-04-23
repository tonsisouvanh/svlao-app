import { useEffect, useMemo } from "react";
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
import Searchbox from "../../input/student/Searchbox";
import {
  announcementReset,
  removeAnnouncement,
} from "../../../feature/announcement/AnnouncementSlice";
import { formatDateDDMMYYYY } from "../../../utils/utils";
import { ANNOUNCEMENT_COLUMNS } from "../../../data/data";
import toast from "react-hot-toast";
import EmptyState from "../../EmptyState";
const cellStyle = "whitespace-nowrap truncate font-light";

const AnnounceTable = ({ editToggle }) => {
  const { announcements, status } = useSelector((state) => state.announcement);

  const dispatch = useDispatch();
  const data = useMemo(() => announcements, [announcements]);
  const columns = useMemo(() => ANNOUNCEMENT_COLUMNS, []);
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

  const handleDeleteAnnouncement = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete");

    if (confirmed) {
      dispatch(removeAnnouncement(id));
    } else {
      console.log("Reset canceled");
    }
  };

  useEffect(() => {
    if (status.remove === "succeeded") {
      toast.success("Deleted announcement");
      dispatch(announcementReset());
    } else if (status.remove === "failed") {
      toast.error("Failed to delete");
      dispatch(announcementReset());
    }
  }, [status.remove, dispatch]);

  if (status.fetchAll === "loading") {
    return <Spinner />;
  }

  return (
    <>
      {editToggle ? (
        <span>Edit announcement component here</span>
      ) : status.fetchAll === "loading" || status.remove === "loading" ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Searchbox filter={globalFilter} setFilter={setGlobalFilter} />
            <Link to="/manage-others-data/announcement-list/search/all">
              <button className="btn btn-outline btn-sm">ເບິ່ງທັງໝົດ</button>
            </Link>
            <Link to="/manage-others-data/announcement-list/page/1">
              <button className="btn btn-outline btn-sm">ເບິ່ງເປັນໜ້າ</button>
            </Link>
          </div>
          {announcements && announcements.length > 0 ? (
            <div className="overflow-x-auto">
              <table
                {...getTableProps()}
                className="table table-md font-notosanslao"
              >
                <thead>
                  {announcements &&
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
                  {announcements &&
                    rows?.map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={row?.id} {...row?.getRowProps()}>
                          <td>
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/manage-others-data/announcement-list/${row?.original?._id}`}
                                className="btn btn-primary btn-outline btn-xs sm:btn-sm"
                              >
                                <AiFillEdit size={15} />
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteAnnouncement(row?.original?._id)
                                }
                                className="btn btn-error btn-outline btn-xs sm:btn-sm"
                              >
                                <AiFillDelete size={15} />
                              </button>
                            </div>
                          </td>
                          {announcements &&
                            row?.cells?.map((cell, index) => (
                              <td
                                className={cellStyle}
                                key={index}
                                {...cell?.getCellProps()}
                              >
                                {cell?.column?.id === "timestamp" ? (
                                  <>{formatDateDDMMYYYY(cell?.value)}</>
                                ) : cell?.column?.id === "content" ? (
                                  <>
                                    <span className="truncate">
                                      {cell?.value}
                                    </span>
                                  </>
                                ) : (
                                  cell?.render("Cell")
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

export default AnnounceTable;
