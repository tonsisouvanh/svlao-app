import { Link } from 'react-router-dom';
import { useState } from 'react';
import Unauthorized from '../public/Unauthorized';
import { AiFillPlusCircle } from 'react-icons/ai';
import ResidenceAddressTable from '../../components/table/residenceAddress/ResidenceAddressTable';
import PageHeading from '../../components/PageHeading';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Button } from 'antd';

const ResidenceAddressList = () => {
  const [t] = useTranslation('global');
  const { user: auth } = useAuth();
  const [editToggle, setEditToggle] = useState(false);

  return auth?.role === 'admin' ? (
    <>
      <section className="">
        <div className="container mx-auto p-4">
          {editToggle ? null : <PageHeading title="ຂໍ້ມູນທີ່ຢູ່ປັດຈຸບັນ" />}
          <div className="">
            {editToggle ? null : (
              <>
                <div className="mb-10 flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Link to={auth.role !== 'admin' ? '#' : '/manage-others-data/residence-address-list/add'}>
                        <Button
                          className={`bg-color-1 font-notosanslao text-white ${
                            auth.role !== 'admin' && 'btn-disabled'
                          }`}
                        >
                          {t('AddButton')}
                          <AiFillPlusCircle size={20} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <ResidenceAddressTable editToggle={editToggle} setEditToggle={setEditToggle} />
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default ResidenceAddressList;
