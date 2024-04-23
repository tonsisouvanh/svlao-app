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
  documentReset,
  removeDocument,
} from "../../../feature/document/DocumentSlice";
import { formatDateDDMMYYYY } from "../../../utils/utils";
import { DOCUMENT_COLUMNS } from "../../../data/data";
import toast from "react-hot-toast";
import EmptyState from "../../EmptyState";
const cellStyle = "whitespace-nowrap truncate font-light";

const DocumentTable = ({ editToggle }) => {
  const { documents, status } = useSelector((state) => state.document);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deletedDocumentId, setDeletedDocumentId] = useState("");
  const data = useMemo(() => documents, [documents]);
  const columns = useMemo(() => DOCUMENT_COLUMNS, []);
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
    setDeletedDocumentId(id);
    setOpenModal(true);
  };
  const handleDeletDocument = () => {
    dispatch(removeDocument(deletedDocumentId));
    setDeletedDocumentId("");
    setOpenModal(false);
  };

  useEffect(() => {
    if (status.remove === "succeeded") {
      toast.success("Deleted document");
      dispatch(documentReset());
    } else if (status.remove === "failed") {
      toast.error("Failed to delete");
      dispatch(documentReset());
    }
  }, [status.remove, dispatch]);

  if (status.fetchAll === "loading") {
    return <Spinner />;
  }
  return (
    <>
      {editToggle ? (
        <span>Edit document component here</span>
      ) : status.fetchAll === "loading" || status.remove === "loading" ? (
        <Spinner />
      ) : (
        <>
          {openModal && (
            <InfoModal
              title={"Delete document"}
              modaltype={"question"}
              desc={
                "This document data will be perminently delete, are you sure?"
              }
              initialValue={true}
              isOnclickEvent={true}
              confirmLabel={"Delete"}
              handleClick={handleDeletDocument}
            />
          )}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Searchbox filter={globalFilter} setFilter={setGlobalFilter} />
            <Link to="/manage-others-data/document-form-list/search/all">
              <button className="btn btn-outline btn-sm">ເບິ່ງທັງໝົດ</button>
            </Link>
            <Link to="/manage-others-data/document-form-list/page/1">
              <button className="btn btn-outline btn-sm">ເບິ່ງເປັນໜ້າ</button>
            </Link>
          </div>
          {documents && documents.length > 0 ? (
            <div className="overflow-x-auto">
              <table
                {...getTableProps()}
                className="table table-md font-notosanslao"
              >
                <thead>
                  {documents &&
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
                  {documents &&
                    rows?.map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          <td>
                            <div className="dropdown dropdown-right">
                              <div className="flex items-center gap-2">
                                <Link
                                  to={`/manage-others-data/document-form-list/${row.original._id}`}
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
                            </div>
                          </td>
                          {documents &&
                            row?.cells?.map((cell, index) => (
                              <td
                                className={cellStyle}
                                key={index}
                                {...cell.getCellProps()}
                              >
                                {cell.column.id === "timestamp" ? (
                                  <>{formatDateDDMMYYYY(cell.value)}</>
                                ) : cell.column.id === "content" ? (
                                  <>
                                    <span className="truncate">
                                      {cell.value}
                                    </span>
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
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </>
  );
};

export default DocumentTable;
