import { useSelector } from "react-redux";
import Unauthorized from "../public/Unauthorized";
import StatUsers from "../../components/stat/StatUsers";
import FilterSelection from "./FilterSelection";
import Charts from "./Charts";
import AnnouncementList from "./AnnouncementList";
import PageHeading from "../../components/PageHeading";
import UserList from "./UserList";
const Dashboard = () => {
  const { auth } = useSelector((state) => state.auth);

  if (auth.role !== "admin") return <Unauthorized />;
  return (
    <>
      <section className="body-font">
        <div className="container mx-auto rounded-xl bg-transparent px-2">
          <PageHeading title="ສັງລວມນັກຮຽນທີ່ຢູ່ຕາມໂຮງຮຽນຕ່າງໆ" />
          <div className="flex flex-col gap-6">
            <FilterSelection />
            <StatUsers />
            <Charts />
            <div className="flex items-start gap-6">
              <UserList />
              <AnnouncementList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
