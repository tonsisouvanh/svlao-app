import { useEffect, useState } from "react";
import { activeuser, female, male, student } from "../../assets/icons";
import Spinner from "../ui/Spinner";

const StatUsers = ({ users, total, status }) => {
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
  if (status?.fetchAll === "loading")
    return <span className="loading loading-spinner loading-md"></span>;
  return (
    <>
      <div className="space-y-6">
        <div className="stats stats-vertical w-full shadow lg:stats-horizontal">
          <div className="stat">
            <div className="stat-figure">
              <img src={student} className="w-16" alt="icon" />
            </div>
            <div className="stat-title">All Students</div>
            <div className="stat-value">{total | 0}</div>
          </div>
          <div className="stat">
            <div className="stat-figure">
              <img src={male} className="w-16" alt="icon" />
            </div>
            <div className="stat-title">Male</div>
            <div className="stat-value">{totalMale() | 0}</div>
          </div>
          <div className="stat">
            <div className="stat-figure">
              <img src={female} className="w-16" alt="icon" />
            </div>
            <div className="stat-title">Female</div>
            <div className="stat-value">{totalFemale() | 0}</div>
          </div>
          <div className="stat">
            <div className="stat-figure">
              <img src={activeuser} className="w-16" alt="icon" />
            </div>
            <div className="stat-title">Active User</div>
            <div className="stat-value">{totalActive() | 0}</div>
          </div>
        </div>
        <div className="stats-horizal stats w-full shadow">
          <div className="stat">
            <div className="stat-title">Bachelor</div>
            <div className="stat-value">{totalBachelor | 0}</div>
            {/* <div className="stat-actions">
            <button className="btn btn-success btn-xs">Show Active</button>
          </div> */}
          </div>
          <div className="stat">
            <div className="stat-title">Master</div>
            <div className="stat-value">{totalMaster | 0}</div>
            {/* <div className="stat-actions">
            <button className="btn btn-success btn-xs">Show Active</button>
          </div> */}
          </div>
          <div className="stat">
            <div className="stat-title">Doctor</div>
            <div className="stat-value">{totalDoctor | 0}</div>
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
