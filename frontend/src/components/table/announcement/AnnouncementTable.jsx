import { Space, Table, Tag, Button } from 'antd';
import { useAnnouncement } from '../../../hooks/useAnnouncement';
import 'tailwindcss/tailwind.css';

const AnnouncementTable = ({ editToggle }) => {
  const { useGetAllAnnouncements } = useAnnouncement();
  const { data: announcements, isLoading } = useGetAllAnnouncements();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <p className="font-notosanslao">{text}</p>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Announcement" className="h-16 w-16 object-cover" />,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (categories) => (
        <>
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <Tag className="m-0" color="blue" key={category}>
                {category}
              </Tag>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" className="bg-color-1 " onClick={() => editToggle(record)}>
            Edit
          </Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={announcements?.data}
      loading={isLoading}
      rowKey={(record) => record._id}
      className="rounded-lg shadow-md"
      pagination={{
        responsive: true,
        pageSize: 10,
        total: announcements?.data?.length,
        size: 'small',
        showTotal: (total) => `Total ${total} items`,
      }}
    />
  );
};

export default AnnouncementTable;
