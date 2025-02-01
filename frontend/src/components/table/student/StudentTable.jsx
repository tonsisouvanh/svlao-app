import { Button, Card, Modal, Space, Table, Tag, Avatar } from 'antd';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { MAX_ITEMS_PER_PAGE } from '../../../config/config';
import { useUser } from '../../../hooks/useUser';
import { replaceImage } from '../../../utils/utils';
import ErrorLoadingData from '../../ui/ErrorLoadingData';

const { Meta } = Card;
// TODO: add filter and seach functionality
const StudentTable = ({ view }) => {
  const navigate = useNavigate();
  // State for pagination
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: MAX_ITEMS_PER_PAGE,
  });

  // State for modal visibility and selected student ID
  const [openModal, setOpenModal] = useState(false);
  const [deletedStudentId, setDeletedStudentId] = useState('');

  // Fetching user data
  const { useGetAllUsers } = useUser();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetAllUsers(pagination.page, pagination.pageSize);

  // Handle opening the delete confirmation modal
  const handleOpenModal = useCallback((id) => {
    setDeletedStudentId(id);
    setOpenModal(true);
  }, []);

  // Handle deleting a student
  const handleDeleteStudent = useCallback(async () => {
    if (deletedStudentId) {
      // await deleteStudent(deletedStudentId);
    }
    setDeletedStudentId('');
    setOpenModal(false);
  }, [deletedStudentId]);

  // Column definitions for the table
  const columns = useMemo(
    () => [
      {
        title: 'Last Name (English)',
        dataIndex: ['fullname', 'englishLastname'],
        key: 'englishLastname',
      },
      {
        title: 'First Name (English)',
        dataIndex: ['fullname', 'englishFirstname'],
        key: 'englishFirstname',
      },
      {
        title: 'Degree (Lao)',
        dataIndex: ['degree', 'laoDegree'],
        key: 'laoDegree',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Scholarship Type',
        dataIndex: ['scholarship', 'scholarshipType'],
        key: 'scholarshipType',
      },
      {
        title: 'University Shortcut',
        dataIndex: ['university', 'shortcut'],
        key: 'shortcut',
      },
      {
        title: 'Status',
        dataIndex: 'userStatus',
        key: 'userStatus',
        render: (status) => (
          <Tag color={status === 'active' ? 'green' : 'red'}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Link to={`/manage-others-data/student-list/${record._id}`}>
              <Button size="small" type="primary" className="bg-color-1">
                <AiFillEdit size={15} />
              </Button>
            </Link>
            <Button size="small" danger onClick={() => handleOpenModal(record._id)}>
              <AiFillDelete size={15} />
            </Button>
          </Space>
        ),
      },
    ],
    [handleOpenModal]
  );

  // Handle pagination change
  const handlePaginationChange = useCallback((page, pageSize) => {
    setPagination({ page, pageSize });
  }, []);

  useEffect(() => {
    navigate(`/dashboard/student-list?page=${pagination.page}&pageSize=${pagination.pageSize}`);
  }, [navigate, pagination]);

  // Render error state
  if (isUserError) {
    return <ErrorLoadingData />;
  }

  return (
    <>
      <Modal
        title="Delete Student"
        open={openModal}
        onOk={handleDeleteStudent}
        onCancel={() => setOpenModal(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>This student data will be permanently deleted, are you sure?</p>
      </Modal>
      {view === 'table' ? (
        <Table
          columns={columns}
          dataSource={userData?.users}
          loading={isUserLoading}
          rowKey={(record) => record._id}
          pagination={{
            onChange: handlePaginationChange,
            responsive: true,
            pageSize: pagination.pageSize,
            total: userData?.total,
            size: 'small',
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      ) : (
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2">
          {userData?.users?.map((user) => (
            <div key={user._id}>
              <Card
                hoverable
                cover={
                  <img
                    className="h-48 w-full object-contain"
                    alt={user.fullname.englishLastname}
                    src={user.profileImg}
                    onError={(error) => replaceImage(error, '/assets/images/avatar-placeholder.png')}
                  />
                }
                actions={[
                  <Link to={`/manage-others-data/student-list/${user._id}`} key="edit">
                    <AiFillEdit />
                  </Link>,
                  <AiFillDelete key="delete" onClick={() => handleOpenModal(user._id)} />,
                ]}
              >
                <Meta
                  avatar={<Avatar src={user.profileImg} />}
                  title={`${user.fullname.englishFirstname} ${user.fullname.englishLastname}`}
                  description={
                    <>
                      <p>
                        <strong>Degree (Lao):</strong> {user.degree.laoDegree}
                      </p>
                      <p>
                        <strong>Gender:</strong> {user.gender}
                      </p>
                      <p>
                        <strong>Scholarship Type:</strong> {user.scholarship.scholarshipType}
                      </p>
                      <p>
                        <strong>University Shortcut:</strong> {user.university.shortcut}
                      </p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <Tag color={user.userStatus === 'active' ? 'green' : 'red'}>
                          {user.userStatus.charAt(0).toUpperCase() + user.userStatus.slice(1)}
                        </Tag>
                      </p>
                    </>
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StudentTable;

// import { useMemo, useState } from 'react';
// import Spinner from '../../ui/Spinner';
// import { useGlobalFilter, useSortBy, useTable, useFilters } from 'react-table';
// import { AiFillCaretDown, AiFillCaretUp, AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
// import altImage from '../../../assets/img/profile.png';
// import { BiSolidSortAlt } from 'react-icons/bi';
// import { Link, useLocation } from 'react-router-dom';
// import InfoModal from '../../modal/InfoModal';
// import { BsFacebook } from 'react-icons/bs';
// import { STUDENT_COLUMNS, scholarshipTypes } from '../../../data/data';
// import Searchbox from '../../input/student/Searchbox';
// import { formatDateDDMMYYYY, replaceImage } from '../../../utils/utils';
// import { useUniversity } from '../../../hooks/useUniversity';
// import { useUser } from '../../../hooks/useUser';
// const cellStyle = 'whitespace-nowrap truncate font-light';

// const UserTable = ({ view, users, isLoading }) => {
//   const { users: userData } = users;
//   const [openModal, setOpenModal] = useState(false);
//   const [deletedUserId, setDeletedUserId] = useState('');
//   const { useDeleteUser } = useUser();
//   const userDeleteMutate = useDeleteUser();
//   const { useGetAllUniversities } = useUniversity();
//   const { data: universities } = useGetAllUniversities();

//   const { pathname } = useLocation();
//   const isRenderField = (renderFields, passedField) => {
//     return renderFields.includes(passedField.toString());
//   };
//   const data = useMemo(() => userData || [], [userData]);
//   const columns = useMemo(() => STUDENT_COLUMNS, []);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable(
//     { columns, data },
//     useFilters,
//     useGlobalFilter,
//     useSortBy
//   );

//   const { globalFilter } = state;

//   const handleOpenModal = (id) => {
//     setDeletedUserId(id);
//     setOpenModal(true);
//   };
//   const handleDeleteUser = () => {
//     userDeleteMutate.mutateAsync(deletedUserId);
//     setDeletedUserId('');
//     setOpenModal(false);
//   };

//   if (isLoading || userDeleteMutate.isPending) {
//     return <Spinner />;
//   }
//   return (
//     <>
//       {openModal && (
//         <InfoModal
//           title={'Delete User'}
//           modaltype={'question'}
//           desc={'This user data will be perminently delete, are you sure?'}
//           initialValue={true}
//           isOnclickEvent={true}
//           confirmLabel={'Delete'}
//           openModal={openModal}
//           setOpenModal={setOpenModal}
//           handleClick={handleDeleteUser}
//         />
//       )}

//       <div className="mb-5 flex flex-wrap items-center gap-2">
//         <Searchbox filter={globalFilter} setFilter={setGlobalFilter} />
//         <div className="flex items-center gap-2">
//           <div className="form-control w-fit max-w-xs">
//             <select
//               disabled={!pathname.includes('all') && true}
//               value={globalFilter || ''}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               className="select select-bordered select-sm font-notosanslao focus:outline-none"
//             >
//               <option disabled value="">
//                 ປະເພດທຶນ
//               </option>
//               {scholarshipTypes &&
//                 scholarshipTypes?.map((ele, index) => (
//                   <option key={index} value={ele.name}>
//                     {ele.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="form-control w-fit max-w-xs">
//             <select
//               disabled={!pathname.includes('all') && true}
//               value={globalFilter || ''}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               className="select select-bordered select-sm font-notosanslao focus:outline-none"
//             >
//               <option disabled value="">
//                 ມະຫາໄລ
//               </option>
//               {universities &&
//                 universities?.map((ele, index) => (
//                   <option key={index} value={ele.shortcut}>
//                     {ele.laoName}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>
//         <Link to="/dashboard/student-list/search/all">
//           <button className={`btn btn-outline ${pathname.includes('all') && 'btn-active'} btn-sm`}>ເບິ່ງທັງໝົດ</button>
//         </Link>
//         <Link to="/dashboard/student-list/page/1">
//           <button className={`btn btn-outline btn-sm ${pathname.includes('page') && 'btn-active'}`}>
//             ເບິ່ງເປັນໜ້າ
//           </button>
//         </Link>
//       </div>
//       <div className="overflow-x-auto">
//         {view === 'grid' ? (
//           <div {...getTableProps()} className="font-notosanslao">
//             <div className="">
//               {users &&
//                 headerGroups?.map((headerGroup) => (
//                   <div
//                     className="my-4 flex items-start gap-5 overflow-auto"
//                     key={headerGroup.id}
//                     {...headerGroup.getHeaderGroupProps()}
//                   >
//                     {headerGroup &&
//                       headerGroup?.headers?.map((column, index) => (
//                         <div
//                           className="rounded-full px-2"
//                           key={index}
//                           {...column.getHeaderProps(column.getSortByToggleProps())}
//                         >
//                           <div className="flex items-center whitespace-nowrap text-sm">
//                             {column.render('Header')}
//                             <span>
//                               {column.isSorted ? (
//                                 column.isSortedDesc ? (
//                                   <AiFillCaretUp />
//                                 ) : (
//                                   <AiFillCaretDown />
//                                 )
//                               ) : (
//                                 <BiSolidSortAlt />
//                               )}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 ))}
//             </div>
//             <div
//               className="xl:grid-cols-4d grid grid-cols-1 gap-4 font-notosanslao sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
//               {...getTableBodyProps()}
//             >
//               {users &&
//                 rows?.map((row) => {
//                   prepareRow(row);
//                   return (
//                     <div
//                       className="relative space-y-1 rounded-lg bg-base-200 text-center shadow-md"
//                       key={row.id}
//                       {...row.getRowProps()}
//                     >
//                       <div className="relative -mb-16 overflow-hidden rounded-t-lg">
//                         <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/30 backdrop-invert backdrop-opacity-10"></div>
//                         {/* <Image alt="consule" image={`/consule.jpg`} className={'h-full'} /> */}
//                         <img src={`/consule.jpg`} alt="" className="h-[10rem] w-full object-cover object-top" />
//                       </div>
//                       {users &&
//                         row?.cells?.map((cell, index) => (
//                           <div className={cellStyle} key={index} {...cell.getCellProps()}>
//                             {isRenderField(
//                               ['profileImg', 'userStatus', 'fullname.laoName', 'major.laoMajor'],
//                               cell.column.id
//                             ) && (
//                               <>
//                                 {cell.column.id === 'profileImg' ? (
//                                   <div className="avatar flex w-full items-center justify-center py-1">
//                                     <div className="w-28 rounded-full">
//                                       <img
//                                         src={cell.value}
//                                         alt={cell.value}
//                                         onError={(error) => replaceImage(error, altImage)}
//                                       />
//                                     </div>
//                                   </div>
//                                 ) : cell.column.id === 'userStatus' ? (
//                                   <span
//                                     className={`badge badge-md absolute left-4 top-4 rounded-full shadow-md ${
//                                       cell.value === 'active' ? ' badge-success text-white' : 'badge-warning'
//                                     }`}
//                                   >
//                                     {cell.render('Cell')}
//                                   </span>
//                                 ) : (
//                                   <span className="font-boldd text-center text-base lg:text-lg">
//                                     {cell.render('Cell')}
//                                   </span>
//                                 )}
//                               </>
//                             )}
//                           </div>
//                         ))}
//                       <div className="flex items-center justify-center p-4">
//                         <div className="flex-grow space-y-2">
//                           <div className="flex flex-wrap items-center justify-end gap-2">
//                             <a
//                               href={row?.original.facebookUrl}
//                               rel="noreferrer"
//                               target="_blank"
//                               className="btn btn-ghost btn-sm !px-0 sm:btn-xs"
//                             >
//                               <BsFacebook className="text-2xl text-blue-600" />
//                             </a>
//                             <button className="btn btn-accent btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs">
//                               <AiFillEdit />
//                             </button>
//                             <button
//                               onClick={() => handleOpenModal(row.original.id)}
//                               className={`btn btn-error btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs`}
//                             >
//                               <AiFillDelete />
//                             </button>
//                             <Link to={`/user-detail/${row.original.id}`}>
//                               <button className="btn btn-primary btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs">
//                                 <AiFillEye />
//                               </button>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         ) : (
//           <table {...getTableProps()} className="table table-md font-notosanslao">
//             <thead>
//               {users &&
//                 headerGroups?.map((headerGroup) => (
//                   <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                     <th className=""></th>
//                     {headerGroup &&
//                       headerGroup?.headers?.map((column, index) => (
//                         <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
//                           <div className="flex items-center">
//                             {column.render('Header')}
//                             <span>
//                               {column.isSorted ? column.isSortedDesc ? <AiFillCaretUp /> : <AiFillCaretDown /> : null}
//                             </span>
//                           </div>
//                         </th>
//                       ))}
//                   </tr>
//                 ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {users &&
//                 rows?.map((row) => {
//                   prepareRow(row);
//                   return (
//                     <tr key={row.id} {...row.getRowProps()}>
//                       <td className="">
//                         <div className="flex gap-2 whitespace-nowrap">
//                           <Link
//                             to={`/dashboard/student-list/student/${row.original._id}`}
//                             className="btn btn-primary btn-outline btn-xs"
//                           >
//                             <AiFillEdit size={15} />
//                           </Link>
//                           <button
//                             onClick={() => handleOpenModal(row.original._id)}
//                             className="btn btn-error btn-outline btn-xs"
//                           >
//                             <AiFillDelete size={15} />
//                           </button>
//                         </div>
//                       </td>
//                       {users &&
//                         row?.cells?.map((cell, index) => (
//                           <td className={cellStyle} key={index} {...cell.getCellProps()}>
//                             {cell.column.id === 'userStatus' ? (
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
//                             ) : cell.column.id === 'dob' ? (
//                               <>
//                                 <span>{formatDateDDMMYYYY(cell.value)}</span>
//                               </>
//                             ) : (
//                               cell.render('Cell')
//                             )}
//                           </td>
//                         ))}
//                     </tr>
//                   );
//                 })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// };

// export default UserTable;
