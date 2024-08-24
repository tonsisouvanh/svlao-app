import { Link } from 'react-router-dom';
import { useState } from 'react';
import Unauthorized from '../public/Unauthorized';
import { AiFillPlusCircle } from 'react-icons/ai';
import MajorTable from '../../components/table/major/MajorTable';
import PageHeading from '../../components/PageHeading';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const MajorList = () => {
  const [t] = useTranslation('global');
  const { user: auth } = useAuth();
  const [editToggle, setEditToggle] = useState(false);

  return auth?.role === 'admin' ? (
    <>
      <section className="">
        <div className="container mx-auto p-4">
          {editToggle ? null : <PageHeading title="ຂໍ້ມູນຂະແໜງຮຽນ" />}
          <div className="">
            {editToggle ? null : (
              <>
                <div className="mb-10 flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Link to={auth.role !== 'admin' ? '#' : '/manage-others-data/major-list/add'}>
                        <button
                          className={`tooltipp btn btn-primary font-notosanslao text-white ${
                            auth.role !== 'admin' && 'btn-disabled'
                          }`}
                        >
                          {t('AddButton')}
                          <AiFillPlusCircle size={20} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <MajorTable editToggle={editToggle} setEditToggle={setEditToggle} />
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default MajorList;
