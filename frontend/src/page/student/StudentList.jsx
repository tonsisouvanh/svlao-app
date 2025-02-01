import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsGridFill, BsTable } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PageHeading from '../../components/PageHeading';
import StudentTable from '../../components/table/student/StudentTable';
import { useAuth } from '../../context/AuthContext';

const StudentList = () => {
  const { user: auth } = useAuth();
  const [editToggle, setEditToggle] = useState(false);

  const [view, setView] = useState('table');
  const toggleView = () => {
    setView((prevView) => (prevView === 'table' ? 'grid' : 'table'));
  };

  useEffect(() => {
    const savedView = localStorage.getItem('viewPreference');
    if (savedView) {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('viewPreference', view);
  }, [view]);

  return (
    <>
      <section className="relative">
        <div className="container mx-auto p-4">
          {editToggle ? null : <PageHeading title="ລາຍຊື່ນັກຮຽນ" />}
          <div className="">
            {editToggle ? null : (
              <>
                <div className="mb-10 flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Link to={auth.role !== 'admin' ? '#' : '/dashboard/student-list/add'}>
                        <Button
                          type="primary"
                          icon={<AiFillPlusCircle size={20} />}
                          className={`bg-color-1 font-notosanslao text-white ${
                            auth.role !== 'admin' && 'btn-disabled'
                          }`}
                        >
                          ເພີ່ມນັກຮຽນ
                        </Button>
                      </Link>
                    </div>
                    {editToggle ? null : (
                      <div className="">
                        {view === 'table' ? (
                          <Button
                            type="primary"
                            icon={<BsGridFill />}
                            onClick={toggleView}
                            className="bg-color-1 text-white"
                          ></Button>
                        ) : (
                          <Button
                            type="primary"
                            icon={<BsTable />}
                            onClick={toggleView}
                            className="bg-color-1 text-white"
                          ></Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <StudentTable view={view} editToggle={editToggle} setEditToggle={setEditToggle} />
          {/* <Paginate path="/dashboard/student-list/page/" style="mt-10" page={users.page} pages={users.pages} /> */}
        </div>
      </section>
    </>
  );
};

export default StudentList;
