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
import { Link } from "react-router-dom";
import InfoModal from "../../modal/InfoModal";
import Searchbox from "../../input/student/Searchbox";
import {
  announcementReset,
  removeAnnouncement,
} from "../../../feature/announcement/AnnouncementSlice";
import { formatDateDDMMYYYY } from "../../../utils/utils";
import { ANNOUNCEMENT_COLUMNS } from "../../../data/data";
import toast from "react-hot-toast";
const cellStyle = "whitespace-nowrap truncate font-light";

const AnnounceTable = ({ editToggle, setEditToggle }) => {
  const { announcements, status } = useSelector((state) => state.announcement);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deletedAnnouncementId, setDeletedAnnouncementId] = useState("");
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
  const handleOpenModal = (id) => {
    setDeletedAnnouncementId(id);
    setOpenModal(true);
  };
  const handleDeletAnnouncement = () => {
    dispatch(removeAnnouncement(deletedAnnouncementId));
    setDeletedAnnouncementId("");
    setOpenModal(false);
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
          {openModal && (
            <InfoModal
              title={"Delete announcement"}
              modaltype={"question"}
              desc={
                "This announcement data will be perminently delete, are you sure?"
              }
              initialValue={true}
              isOnclickEvent={true}
              confirmLabel={"Delete"}
              handleClick={handleDeletAnnouncement}
            />
          )}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Searchbox filter={globalFilter} setFilter={setGlobalFilter} />
            <Link to="/manage-others-data/announcement-list/search/all">
              <button className="btn btn-outline btn-sm">ເບິ່ງທັງໝົດ</button>
            </Link>
            <Link to="/manage-others-data/announcement-list/page/1">
              <button className="btn btn-outline btn-sm">ເບິ່ງເປັນໜ້າ</button>
            </Link>
          </div>
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
                          <div className="dropdown-right dropdown">
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
                                to={`/manage-others-data/announcement-list/${row?.original?._id}`}
                              >
                                <li className="btn btn-ghost btn-xs">
                                  <AiFillEdit size={15} />
                                </li>
                              </Link>
                              <li
                                onClick={() =>
                                  handleOpenModal(row?.original?._id)
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
                                  <span className="truncate">{cell?.value}</span>
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
        </>
      )}
    </>
  );
};

export default AnnounceTable;
