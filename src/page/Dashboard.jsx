import { data, university } from "../data/data";
import { useState, useEffect } from "react";
import {
  AiOutlineWoman,
  AiOutlineMan,
  AiOutlineCaretDown,
} from "react-icons/ai";
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
    <section className="body-font text-gray-600">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-20 text-center">
          <h1 className="title-font mb-4 text-center font-notosanslao text-2xl font-bold text-gray-900 sm:text-3xl">
            ສັງລວມນັກຮຽນທີ່ຢູ່ຕາມໂຮງຮຽນຕ່າງໆ
          </h1>
        </div>
        <div className="mb-20 flex justify-center gap-20">
          <div className="dropdown w-96">
            <label
              tabIndex={0}
              className="btn btn-lg m-1 w-full font-notosanslao"
            >
              ເລືອກໂຮງຮຽນ
              <AiOutlineCaretDown />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
            >
              {university.map((i) => (
                <li onClick={() => setselectedschool(i.name)} key={i.id}>
                  <a>{i.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="dropdown w-96">
            <label
              tabIndex={0}
              className="btn btn-lg m-1 w-full font-notosanslao"
            >
              ເລືອກຫໍພັກ
              <AiOutlineCaretDown />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
            >
              {university.map((i) => (
                <li onClick={() => setselectedschool(i.name)} key={i.id}>
                  <a>{i.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stats flex items-center justify-center  shadow">
          <div className="stat">
            <div className="stat-figure flex  text-primary ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title flex gap-10 text-black ">
              ນັກຮຽນທັງໝົດ:
            </div>
            <div className="stat-value text-primary">
              {totalstudentPerSchool}
            </div>
          </div>

          <div className="stat">
            <div className="flex justify-center gap-10">
              <div className="stat-title flex items-center justify-center text-black">
                ຊາຍ
              </div>
              <div className="stat-value flex items-center justify-center text-primary">
                {tongNam} <AiOutlineMan />
              </div>

              <div className="stat-title flex items-center justify-center text-black ">
                ຍິງ
              </div>
              <div className="stat-value flex items-center justify-center text-secondary">
                {tongNu} <AiOutlineWoman />
              </div>
            </div>
          </div>
          <div className="stat">
            <div className="flex justify-center gap-10">
              <div className="stat-title flex items-center justify-center text-black">
                ປ ຕີ
              </div>
              <div className="stat-value flex items-center justify-center text-primary">
                {tongNu}
              </div>{" "}
              <div className="stat-title flex items-center justify-center text-black">
                ປ ໂທ
              </div>
              <div className="stat-value flex items-center justify-center text-secondary">
                {tongNu}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
