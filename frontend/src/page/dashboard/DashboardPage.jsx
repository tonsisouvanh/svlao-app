import PageHeading from '../../components/PageHeading';
import StatUsers from '../../components/stat/StatUsers';
import { useAuth } from '../../context/AuthContext';
import Unauthorized from '../public/Unauthorized';
import Charts from './Charts';
import FilterSelection from './FilterSelection';
const Dashboard = () => {
  const { user: auth } = useAuth();

  if (auth.role !== 'admin') return <Unauthorized />;
  return (
    <>
      <section className="body-font">
        <div className="container mx-auto rounded-xl bg-transparent px-2">
          <PageHeading title="ສັງລວມນັກຮຽນທີ່ຢູ່ຕາມໂຮງຮຽນຕ່າງໆ" />
          <div className="flex flex-col gap-6">
            <FilterSelection />
            <StatUsers />
            <Charts />
            {/* <div className="flex items-start gap-6">
              <UserList />
              <AnnouncementList />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
