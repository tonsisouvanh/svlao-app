import { Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PageHeading from '../../../components/PageHeading';
import AnnounceTable from '../../../components/table/announcement/AnnouncementTable';
import { useAuth } from '../../../context/AuthContext';
import Unauthorized from '../../public/Unauthorized';

const AddAnnouncementButton = ({ t }) => (
  <div className="mb-10 flex w-full items-center justify-between gap-2">
    <div className="flex items-center gap-2">
      <div className="">
        <Link to={'/manage-others-data/announcement-list/add'}>
          <Button icon={<AiFillPlusCircle size={20} />} className="bg-color-1 font-notosanslao text-white">
            {t('AddButton')}
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const AnnouncementList = () => {
  const [t] = useTranslation('global');
  // const { pageNumber, keyword } = useParams();
  const { user: auth } = useAuth();
  const [editToggle, setEditToggle] = useState(false);

  return auth?.role === 'admin' ? (
    <>
      <section className="">
        <div className="container mx-auto p-4">
          {editToggle ? null : <PageHeading title="ຂໍ້ມູນຂ່າວສານ" />}
          <div className="">{editToggle ? null : <AddAnnouncementButton t={t} />}</div>
          <AnnounceTable editToggle={editToggle} setEditToggle={setEditToggle} />
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default AnnouncementList;
