import { useEffect, useState } from "react";

const StatUsers = ({ users }) => {
  const [totalBachelor, setTotalBachelor] = useState(0);
  const [totalMaster, setTotalMaster] = useState(0);
  const [totalDoctor, setTotalDoctor] = useState(0);

  const totalMale = () => {
    const totalScore = users?.reduce((accumulator, student) => {
      if (student.gender.toLowerCase() === "male") {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return totalScore;
  };
  const totalFemale = () => {
    const totalScore = users?.reduce((accumulator, student) => {
      if (student.gender.toLowerCase() === "female") {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return totalScore;
  };
  const totalActive = () => {
    const totalScore = users?.reduce((accumulator, student) => {
      if (student.userStatus.toLowerCase() === "active") {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return totalScore;
  };

  useEffect(() => {
    const calculateDegreeTotals = () => {
      const bachelorCount =
        users?.filter(
          (user) => user.degree?.vietDegree?.toLowerCase() === "cử nhân",
        ).length || 0;
      const masterCount =
        users?.filter(
          (user) => user.degree?.vietDegree?.toLowerCase() === "thạc sĩ",
        ).length || 0;
      const doctorCount =
        users?.filter(
          (user) => user.degree?.vietDegree?.toLowerCase() === "tiến sĩ",
        ).length || 0;

      setTotalBachelor(bachelorCount);
      setTotalMaster(masterCount);
      setTotalDoctor(doctorCount);
    };

    calculateDegreeTotals();
  }, [users]);
  return (
    <>
      <div className="">
        <div className="stats stats-vertical w-full shadow lg:stats-horizontal">
          <div className="stat">
            <div className="stat-title">All Students</div>
            <div className="stat-value text-2xl">{users?.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Male</div>
            <div className="stat-value text-2xl">{totalMale() | 0}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Female</div>
            <div className="stat-value text-2xl">{totalFemale() | 0}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Active User</div>
            <div className="stat-value text-2xl">{totalActive() | 0}</div>
          </div>
        </div>
        {/* <div className="stats flex w-full flex-wrap items-center shadow lg:flex-nowrap">
        <div className="stat max-w-fit md:max-w-xs">
          <div className="stat-title">All Students</div>
          <div className="stat-value">{users?.length}</div>
        </div>

        <div className="stat max-w-fit md:max-w-xs">
          <div className="stat-title">Male</div>
          <div className="stat-value">{totalMale() | 0}</div>
        </div>

        <div className="stat max-w-fit md:max-w-xs">
          <div className="stat-title">Female</div>
          <div className="stat-value">{totalFemale() | 0}</div>
        </div>
        <div className="stat max-w-fit md:max-w-xs">
          <div className="stat-title">Active User</div>
          <div className="stat-value">{totalActive() | 0}</div>
        </div>
      </div> */}
        <div className="stats-horizal stats w-full shadow">
          <div className="stat">
            <div className="stat-title">Bachelor</div>
            <div className="stat-value text-2xl">{totalBachelor | 0}</div>
            {/* <div className="stat-actions">
            <button className="btn btn-success btn-xs">Show Active</button>
          </div> */}
          </div>
          <div className="stat">
            <div className="stat-title">Master</div>
            <div className="stat-value text-2xl">{totalMaster | 0}</div>
            {/* <div className="stat-actions">
            <button className="btn btn-success btn-xs">Show Active</button>
          </div> */}
          </div>
          <div className="stat">
            <div className="stat-title">Doctor</div>
            <div className="stat-value text-2xl">{totalDoctor | 0}</div>
            {/* <div className="stat-actions">
            <button className="btn btn-success btn-xs">Show Active</button>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatUsers;
