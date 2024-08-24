import { useMemo, useState } from 'react';
import Spinner from '../../ui/Spinner';
import { useGlobalFilter, useSortBy, useTable, useFilters } from 'react-table';
import { AiFillCaretDown, AiFillCaretUp, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import InfoModal from '../../modal/InfoModal';
import { MAJOR_COLUMNS } from '../../../data/data';
import altImage from '../../../assets/img/profile.png';
import { useMajor } from '../../../hooks/useMajor';
import ErrorLoadingData from '../../ui/ErrorLoadingData';
const cellStyle = 'whitespace-nowrap truncate font-light';

const MajorTable = ({ editToggle }) => {
  const { useGetAllMajors, useDeleteMajor } = useMajor();
  const majorDeleteMutate = useDeleteMajor();
  const { data: majors, isLoading, isError } = useGetAllMajors();
  const [openModal, setOpenModal] = useState(false);
  const [deletedMajorId, setDeletedMajorId] = useState('');
  const data = useMemo(() => majors || [], [majors]);
  const columns = useMemo(() => MAJOR_COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;
  const handleOpenModal = (id) => {
    setDeletedMajorId(id);
    setOpenModal(true);
  };
  const handleDeleteMajor = () => {
    majorDeleteMutate.mutateAsync(deletedMajorId);
    setDeletedMajorId('');
    setOpenModal(false);
  };
  const replaceImage = (error) => {
    error.target.src = altImage;
  };
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <ErrorLoadingData />;
  }
  return (
    <>
      {openModal && (
        <InfoModal
          title={'Delete major'}
          modaltype={'question'}
          desc={'This major data will be perminently delete, are you sure?'}
          initialValue={true}
          isOnclickEvent={true}
          confirmLabel={'Delete'}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleClick={handleDeleteMajor}
        />
      )}
      {/* <div className="mb-5 flex flex-wrap items-center gap-2">
            <Searchbox filter={globalFilter} setFilter={setGlobalFilter} />
          </div> */}
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="table table-md font-notosanslao">
          <thead>
            {majors &&
              headerGroups?.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  <th></th>
                  {headerGroup &&
                    headerGroup?.headers?.map((column, index) => (
                      <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                        <div className="flex items-center">
                          {column.render('Header')}
                          <span>
                            {column.isSorted ? column.isSortedDesc ? <AiFillCaretUp /> : <AiFillCaretDown /> : null}
                          </span>
                        </div>
                      </th>
                    ))}
                </tr>
              ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {majors &&
              rows?.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    <td>
                      <div className="flex flex-wrap gap-2 whitespace-nowrap">
                        <Link
                          to={`/manage-others-data/major-list/${row.original._id}`}
                          className="btn btn-primary btn-outline btn-xs sm:btn-sm"
                        >
                          <AiFillEdit size={15} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenModal(row.original._id)}
                          className="btn btn-error btn-outline btn-xs sm:btn-sm"
                        >
                          <AiFillDelete size={15} />
                        </button>
                      </div>
                    </td>
                    {majors &&
                      row?.cells?.map((cell, index) => (
                        <td className={cellStyle} key={index} {...cell.getCellProps()}>
                          {cell.column.id === 'status.list' ? (
                            <span
                              className={`badge ${
                                cell.value === 'active' ? ' badge-success text-white' : 'badge-warning'
                              }`}
                            >
                              {cell.render('Cell')}
                            </span>
                          ) : cell.column.id === 'gender' ? (
                            <>{cell.value === 'male' ? 'ຊາຍ' : 'ຍິງ'}</>
                          ) : cell.column.id === 'profileImg' ? (
                            <div className="avatar">
                              <div className="w-10 rounded-full">
                                <img
                                  src={cell.value}
                                  alt={cell.value}
                                  onError={(error) => replaceImage(error, altImage)}
                                />
                              </div>
                            </div>
                          ) : (
                            cell.render('Cell')
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

export default MajorTable;
