import { useEffect, useState } from "react";
import { activeuser, female, male, student } from "../../assets/icons";

const StatUsers = ({ users, total, status }) => {
  // const [totalBachelor, setTotalBachelor] = useState(0);
  // const [totalMaster, setTotalMaster] = useState(0);
  // const [totalDoctor, setTotalDoctor] = useState(0);

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

  // useEffect(() => {
  //   const calculateDegreeTotals = () => {
  //     const bachelorCount =
  //       users?.filter(
  //         (user) => user.degree?.vietDegree?.toLowerCase() === "cử nhân",
  //       ).length || 0;
  //     const masterCount =
  //       users?.filter(
  //         (user) => user.degree?.vietDegree?.toLowerCase() === "thạc sĩ",
  //       ).length || 0;
  //     const doctorCount =
  //       users?.filter(
  //         (user) => user.degree?.vietDegree?.toLowerCase() === "tiến sĩ",
  //       ).length || 0;

  //     setTotalBachelor(bachelorCount);
  //     setTotalMaster(masterCount);
  //     setTotalDoctor(doctorCount);
  //   };

  //   calculateDegreeTotals();
  // }, [users]);

  if (status?.fetchAll === "loading")
    return <span className="loading loading-spinner loading-md"></span>;
  return (
    <>
      {/* <div className="stats shadow-lg">
        <div className="state stat space-y-2">
          <div className="stat-figure">
            <img src={student} className="w-16" alt="icon" />
          </div>
          <div className="stat-title font-bold">ນັກຮຽນທັງໝົດ</div>
          <div className="stat-value">{total | 0}</div>
          <div className="badge stat-desc badge-info">ຄົນ</div>
        </div>
        <div className="stat space-y-2">
          <div className="stat-figure text-secondary">
            <div className="stat-figure">
              <img src={male} className="w-16" alt="icon" />
            </div>
          </div>
          <div className="stat-title font-bold">Male</div>
          <div className="stat-value">{totalMale() | 0}</div>
          <div className="badge stat-desc badge-info">ຄົນ</div>
        </div>
        <div className="stat space-y-2">
          <div className="stat-figure">
            <img src={female} className="w-16" alt="icon" />
          </div>
          <div className="stat-title font-bold">Female</div>
          <div className="stat-value">{totalFemale() | 0}</div>
          <div className="badge stat-desc badge-info">ຄົນ</div>
        </div>
        <div className="stat space-y-2">
          <div className="stat-figure">
            <img src={activeuser} className="w-16" alt="icon" />
          </div>
          <div className="stat-title font-bold">Active User</div>
          <div className="stat-value">{totalActive() | 0}</div>
          <div className="badge stat-desc badge-info">ຄົນ</div>
        </div>
      </div> */}
      <div className="bg-neutral-transparent w-full px-4 py-16 font-[sans-serif]">
        <div className="mx-auto grid max-w-7xl gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border-b-4 border-primary bg-base-200 p-4 text-center font-notosanslao">
            <img
              className="inline-block w-12 fill-primary"
              src={student}
              alt="icon"
            />
            <h3 className="mt-5 text-4xl font-extrabold text-base-content">
              {total | 0}
            </h3>
            <p className="mt-3 font-semibold text-base-content">ນັກຮຽນທັງໝົດ</p>
          </div>
          <div className="rounded-md border-b-4 border-primary bg-base-200 p-4 text-center font-notosanslao">
            <img
              className="inline-block w-12 fill-primary"
              src={male}
              alt="icon"
            />
            <h3 className="mt-5 text-4xl font-extrabold text-base-content">
              {totalMale() | 0}
            </h3>
            <p className="mt-3 font-semibold text-base-content">Male</p>
          </div>
          <div className="rounded-md border-b-4 border-primary bg-base-200 p-4 text-center font-notosanslao">
            <img
              className="inline-block w-12 fill-primary"
              src={female}
              alt="icon"
            />
            <h3 className="mt-5 text-4xl font-extrabold text-base-content">
              {totalFemale() | 0}
            </h3>
            <p className="mt-3 font-semibold text-base-content">Female</p>
          </div>
          <div className="rounded-md border-b-4 border-primary bg-base-200 p-4 text-center font-notosanslao">
            <img
              className="inline-block w-12 fill-primary"
              src={activeuser}
              alt="icon"
            />
            <h3 className="mt-5 text-4xl font-extrabold text-base-content">
              {totalActive() | 0}
            </h3>
            <p className="mt-3 font-semibold text-base-content">User</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatUsers;
