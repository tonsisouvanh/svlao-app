import { useMemo } from "react";
import { activeuser, female, male, student } from "../../assets/icons";
import { useSelector } from "react-redux";

const StatUsers = () => {
  const { users, status, total } = useSelector((state) => state.user);

  const totalMale = useMemo(() => {
    const maleUsers = users?.filter(
      (user) => user.gender.toLowerCase() === "male",
    );
    return maleUsers?.length || 0; // Handle potential undefined users array
  }, [users]);

  const totalFemale = useMemo(() => {
    const femaleUsers = users?.filter(
      (user) => user.gender.toLowerCase() === "female",
    );
    return femaleUsers?.length || 0; // Handle potential undefined users array
  }, [users]);

  const totalActive = useMemo(() => {
    const activeUsers = users?.filter(
      (user) => user.userStatus.toLowerCase() === "active",
    );
    return activeUsers?.length || 0;
  }, [users]);

  if (status?.fetchAll === "loading")
    return <span className="loading loading-spinner loading-md"></span>;
  return (
    <>
      <div className="bg-neutral-transparent w-full font-[sans-serif]">
        <div className="mx-auto grid max-w-7xl gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Student Count */}
          <div className="rounded-md border-b-4 border-primary bg-base-200 p-4 text-center font-notosanslao">
            <img
              className="inline-block w-12 fill-primary"
              src={student}
              alt="Student Icon"
            />
            <h3 className="mt-5 text-4xl font-extrabold text-base-content">
              {total | 0}
            </h3>
            <p className="mt-3 font-semibold text-base-content">
              Total Students
            </p>
          </div>

          {/* Male Count */}
          <div className="rounded-md border-b-4 border-primary bg-base-200 p-4 text-center font-notosanslao">
            <img
              className="inline-block w-12 fill-primary"
              src={male}
              alt="Male Icon"
            />
            <h3 className="mt-5 text-4xl font-extrabold text-base-content">
              {totalMale | 0}
            </h3>
            <p className="mt-3 font-semibold text-base-content">
              Male Students
            </p>
          </div>

          {/* Female Count */}
          <div className="rounded-md border-b-4 border-primary bg-base-200 p-4 text-center font-notosanslao">
            <img
              className="inline-block w-12 fill-primary"
              src={female}
              alt="Female Icon"
            />
            <h3 className="mt-5 text-4xl font-extrabold text-base-content">
              {totalFemale | 0}
            </h3>
            <p className="mt-3 font-semibold text-base-content">
              Female Students
            </p>
          </div>

          {/* Active User Count */}
          <div className="rounded-md border-b-4 border-primary bg-base-200 p-4 text-center font-notosanslao">
            <img
              className="inline-block w-12 fill-primary"
              src={activeuser}
              alt="Active User Icon"
            />
            <h3 className="mt-5 text-4xl font-extrabold text-base-content">
              {totalActive | 0}
            </h3>
            <p className="mt-3 font-semibold text-base-content">Active Users</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatUsers;
