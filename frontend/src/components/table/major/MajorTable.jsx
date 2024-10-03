import { Button, Modal, Space, Table } from 'antd';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import 'tailwindcss/tailwind.css';
import { useMajor } from '../../../hooks/useMajor';
import { Link } from 'react-router-dom';

const MajorTable = ({ editToggle }) => {
  const { useGetAllMajors, useDeleteMajor } = useMajor();
  const { data: majors, isLoading } = useGetAllMajors();
  const { mutateAsync: deleteMajor, isPending: isDeletePending } = useDeleteMajor();
  const [openModal, setOpenModal] = useState(false);
  const [deletedMajorId, setDeletedMajorId] = useState('');

  const handleOpenModal = (id) => {
    setDeletedMajorId(id);
    setOpenModal(true);
  };

  const handleDeleteMajor = async () => {
    await deleteMajor(deletedMajorId);
    setDeletedMajorId('');
    setOpenModal(false);
  };

  const columns = [
    {
      title: 'Vietnamese Major',
      dataIndex: 'vietMajor',
      key: 'vietMajor',
      render: (text) => <p className="font-notosanslao">{text}</p>,
    },
    {
      title: 'Lao Major',
      dataIndex: 'laoMajor',
      key: 'laoMajor',
      render: (text) => <p className="font-notosanslao">{text}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/manage-others-data/major-list/${record._id}`}>
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
        title="Delete Major"
        open={openModal}
        onOk={handleDeleteMajor}
        onCancel={() => setOpenModal(false)}
        okText="Delete"
        okButtonProps={{ loading: isDeletePending, style: { backgroundColor: '#FF0000', color: 'white' } }}
        cancelText="Cancel"
      >
        <p>This major data will be permanently deleted, are you sure?</p>
      </Modal>
      <Table
        columns={columns}
        dataSource={majors}
        loading={isLoading}
        rowKey={(record) => record._id}
        className="rounded-lg shadow-md"
        pagination={{
          responsive: true,
          pageSize: 10,
          total: majors?.length,
          size: 'small',
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </>
  );
};

export default MajorTable;
