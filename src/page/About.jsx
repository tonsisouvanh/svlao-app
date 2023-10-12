import { data, university } from "../data/data";
import { useState, useEffect } from "react";
import { AiOutlineWoman, AiOutlineMan } from "react-icons/ai";
const About = () => {
  const [selectedschool, setselectedschool] = useState("");
  const [totalstudentPerSchool, settotalstudentPerSchool] = useState(0);
  const [tongNam, settongNam] = useState(0);
  const [tongNu, settongNu] = useState(0);

  const caculateAll = () => {
    const totalScore = data.reduce((accumulator, student) => {
      if (student.school === selectedschool) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    settotalstudentPerSchool(totalScore);
  };

  const hamTongNam = () => {
    const totalScore = data.reduce((accumulator, student) => {
      if (student.gender === "male" && student.school === selectedschool) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    console.log(totalScore);
    settongNam(totalScore);
  };

  const hamTongNu = () => {
    const totalScore = data.reduce((accumulator, student) => {
      if (student.gender === "female" && student.school === selectedschool) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    console.log(totalScore);
    settongNu(totalScore);
  };

  useEffect(() => {
    caculateAll();
    hamTongNam();
    hamTongNu();
  }, [selectedschool]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-bold text-center title-font text-gray-900 mb-4 font-notosanslao">
            ສັງລວມນັກຮຽນທີ່ຢູ່ຕາມໂຮງຮຽນຕ່າງໆ
          </h1>
        </div>
        <div className="flex justify-center mb-20">
          <div className="dropdown w-96">
            <label
              tabIndex={0}
              className="btn btn-lg m-1 font-notosanslao w-full"
            >
              ເລືອກໂຮງຮຽນ
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {university.map((i) => (
                <li onClick={() => setselectedschool(i.name)} key={i.id}>
                  <a>{i.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="stats shadow flex justify-center items-center">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">ນັກຮຽນທັງໝົດມີ:</div>
            <div className="stat-value text-primary">
              {totalstudentPerSchool}
            </div>
          </div>

          <div className="stat">
            <div className="flex justify-center gap-10">
              <div className="stat-title flex justify-center items-center">
                ຊາຍ
              </div>
              <div className="stat-value text-secondary flex justify-center items-center">
                {tongNam} <AiOutlineMan />
              </div>

              <div className="stat-title flex justify-center items-center">
                ຍິງ
              </div>
              <div className="stat-value flex justify-center items-center">
                {tongNu} <AiOutlineWoman />
              </div>
            </div>
          </div>

          {/* <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">ຍິງ</div>
            <div className="stat-value">{tongNu}</div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
