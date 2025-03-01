import { Button, Modal, Space, Table } from 'antd';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import 'tailwindcss/tailwind.css';
import { useUniversity } from '../../../hooks/useUniversity';
import { Link } from 'react-router-dom';

const UniversityTable = ({ editToggle }) => {
  const { useGetAllUniversities, useDeleteUniversity } = useUniversity();
  const { data: universities, isLoading } = useGetAllUniversities();
  const { mutateAsync: deleteUniversity, isPending: isDeletePending } = useDeleteUniversity();
  const [openModal, setOpenModal] = useState(false);
  const [deletedUniversityId, setDeletedUniversityId] = useState('');

  const handleOpenModal = (id) => {
    setDeletedUniversityId(id);
    setOpenModal(true);
  };

  const handleDeleteUniversity = async () => {
    await deleteUniversity(deletedUniversityId);
    setDeletedUniversityId('');
    setOpenModal(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'englishName',
      key: 'englishName',
      render: (text) => <p className="font-notosanslao">{text}</p>,
    },
    {
      title: 'Vietnamese Name',
      dataIndex: 'vietName',
      key: 'vietName',
      render: (text) => <p className="font-notosanslao">{text}</p>,
    },
    {
      title: 'Lao Name',
      dataIndex: 'laoName',
      key: 'laoName',
      render: (text) => <p className="font-notosanslao">{text}</p>,
    },
    {
      title: 'Shortcut',
      dataIndex: 'shortcut',
      key: 'shortcut',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/manage-others-data/university-list/${record._id}`}>
            <Button size="small" type="primary" className="bg-color-1" onClick={() => editToggle(record)}>
              <AiFillEdit size={15} />
            </Button>
          </Link>
          <Button size="small" danger onClick={() => handleOpenModal(record._id)}>
            <AiFillDelete size={15} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Delete University"
        open={openModal}
        onOk={handleDeleteUniversity}
        onCancel={() => setOpenModal(false)}
        okText="Delete"
        okButtonProps={{ loading: isDeletePending, style: { backgroundColor: '#FF0000', color: 'white' } }}
        cancelText="Cancel"
      >
        <p>This university data will be permanently deleted, are you sure?</p>
      </Modal>
      <Table
        columns={columns}
        dataSource={universities}
        loading={isLoading}
        rowKey={(record) => record._id}
        className="rounded-lg shadow-md"
        pagination={{
          responsive: true,
          pageSize: 10,
          total: universities?.length,
          size: 'small',
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </>
  );
};

export default UniversityTable;

// import { useMemo, useState } from 'react';
// import Spinner from '../../ui/Spinner';
// import { useGlobalFilter, useSortBy, useTable, useFilters } from 'react-table';
// import { AiFillCaretDown, AiFillCaretUp, AiFillDelete, AiFillEdit } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import InfoModal from '../../modal/InfoModal';
// import { UNIVERSITY_COLUMNS } from '../../../data/data';
// import altImage from '../../../assets/img/profile.png';
// import EmptyState from '../../EmptyState';
// import { useUniversity } from '../../../hooks/useUniversity';
// const cellStyle = 'whitespace-nowrap truncate font-light';

// const UniversityTable = ({ editToggle }) => {
//   const { useGetAllUniversities, useDeleteUniversity } = useUniversity();
//   const { data: universities, isLoading } = useGetAllUniversities();
//   const { mutateAsync: deleteUniversity, isPending: isDeletePending } = useDeleteUniversity();
//   const [openModal, setOpenModal] = useState(false);
//   const [deletedUniversityId, setDeletedUniversityId] = useState('');
//   const data = useMemo(() => universities || [], [universities]);
//   const columns = useMemo(() => UNIVERSITY_COLUMNS, []);
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
//     { columns, data },
//     useFilters,
//     useGlobalFilter,
//     useSortBy
//   );

//   const handleOpenModal = (id) => {
//     setDeletedUniversityId(id);
//     setOpenModal(true);
//   };
//   const handleDeleteUniversity = () => {
//     deleteUniversity(deletedUniversityId);
//     setDeletedUniversityId('');
//     setOpenModal(false);
//   };
//   const replaceImage = (error) => {
//     error.target.src = altImage;
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <>
//       {editToggle ? (
//         <span>Edit university component here</span>
//       ) : isLoading || isDeletePending ? (
//         <Spinner />
//       ) : (
//         <>
//           {openModal && (
//             <InfoModal
//               title={'Delete university'}
//               modaltype={'question'}
//               desc={'This university data will be perminently delete, are you sure?'}
//               initialValue={true}
//               isOnclickEvent={true}
//               confirmLabel={'Delete'}
//               openModal={openModal}
//               setOpenModal={setOpenModal}
//               handleClick={handleDeleteUniversity}
//             />
//           )}
//           {universities && universities.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table {...getTableProps()} className="table table-md font-notosanslao">
//                 <thead>
//                   {headerGroups?.map((headerGroup) => (
//                     <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                       <th className=""></th>
//                       {headerGroup?.headers?.map((column, index) => (
//                         <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
//                           <div className="flex items-center">
//                             {column.render('Header')}
//                             <span>
//                               {column.isSorted ? column.isSortedDesc ? <AiFillCaretUp /> : <AiFillCaretDown /> : null}
//                             </span>
//                           </div>
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                   {rows?.map((row) => {
//                     prepareRow(row);
//                     return (
//                       <tr key={row.id} {...row.getRowProps()}>
//                         <td>
//                           <div className="flex flex-wrap gap-2 whitespace-nowrap">
//                             <Link
//                               to={`/manage-others-data/university-list/${row.original._id}`}
//                               className="btn btn-primary btn-outline btn-xs sm:btn-sm"
//                             >
//                               <AiFillEdit size={15} />
//                             </Link>
//                             <button
//                               type="button"
//                               onClick={() => handleOpenModal(row.original._id)}
//                               className="btn btn-error btn-outline btn-xs sm:btn-sm"
//                             >
//                               <AiFillDelete size={15} />
//                             </button>
//                           </div>
//                         </td>
//                         {row?.cells?.map((cell, index) => (
//                           <td className={cellStyle} key={index} {...cell.getCellProps()}>
//                             {cell.column.id === 'status.fetchAll' ? (
//                               <span
//                                 className={`badge ${
//                                   cell.value === 'active' ? ' badge-success text-white' : 'badge-warning'
//                                 }`}
//                               >
//                                 {cell.render('Cell')}
//                               </span>
//                             ) : cell.column.id === 'gender' ? (
//                               <>{cell.value === 'male' ? 'ຊາຍ' : 'ຍິງ'}</>
//                             ) : cell.column.id === 'profileImg' ? (
//                               <div className="avatar">
//                                 <div className="w-10 rounded-full">
//                                   <img
//                                     src={cell.value}
//                                     alt={cell.value}
//                                     onError={(error) => replaceImage(error, altImage)}
//                                   />
//                                 </div>
//                               </div>
//                             ) : (
//                               cell.render('Cell')
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <EmptyState />
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default UniversityTable;
