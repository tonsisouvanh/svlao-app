import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStudents } from "../feature/student/StudentSlice";
import Spinner from "../components/ui/Spinner";
import Unauthorized from "./public/Unauthorized";
import StudentTable from "../components/table/student/StudentTable";
import { BsGridFill, BsTable } from "react-icons/bs";
import StudentGrid from "../components/grid/student/StudentGrid";

const StudentList = () => {
  const { students, status: studentStatus } = useSelector(
    (state) => state.students,
  );
  const dispatch = useDispatch();
  const [editToggle, setEditToggle] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData")) || {};

  const [view, setView] = useState("table");
  const toggleView = () => {
    setView((prevView) => (prevView === "table" ? "grid" : "table"));
  };

  const handleDeleteStudent = (id) => {
    return;
  };

  useEffect(() => {
    const savedView = localStorage.getItem("viewPreference");
    if (savedView) {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewPreference", view);
  }, [view]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  if (studentStatus === "loading") {
    return <Spinner />;
  }

  return userData?.role === "admin" ? (
    <>
      <section className="">
        <div className="container mx-auto px-5 py-10">
          <div className="">
            {editToggle ? null : (
              <label className="flex justify-center font-notosanslao text-4xl font-bold text-primary">
                ລາຍຊື່ນັກຮຽນ
              </label>
            )}
          </div>
          {editToggle ? null : (
            <div>
              {view === "table" ? (
                <button onClick={toggleView} className="btn btn-sm">
                  <BsTable />
                </button>
              ) : (
                <button onClick={toggleView} className="btn btn-sm">
                  <BsGridFill />
                </button>
              )}
            </div>
          )}

          <div className="">
            {editToggle ? null : (
              <>
                <div className="mb-10 flex justify-end">
                  <Link
                    to={
                      userData.role !== "admin"
                        ? "#"
                        : "/studentlist/add-student"
                    }
                  >
                    <button
                      className={`btn btn-primary font-notosanslao text-white ${
                        userData.role !== "admin" && "btn-disabled"
                      }`}
                    >
                      ຕື່ມຂໍ້ມູນນັກຮຽນ
                    </button>
                  </Link>
                </div>
                <div className="mb-10 flex w-full items-center justify-center">
                  <div className="join flex items-center justify-center">
                    <div>
                      <div>
                        <input
                          className="input join-item input-bordered bg-base-300"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <select className="select join-item select-bordered bg-base-300">
                      <option disabled defaultValue={10}>
                        Filter
                      </option>
                      <option>10</option>
                      <option>20</option>
                      <option>30</option>
                      <option>40</option>
                      <option>50</option>
                      <option>All</option>
                    </select>
                    <div className="indicator">
                      {/* <span className="badge indicator-item badge-secondary">new</span> */}
                      <button className="btn join-item select-bordered   bg-base-300 ">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {view === "grid" ? (
            <StudentGrid studentsProps={students} />
          ) : (
            <StudentTable
              editToggle={editToggle}
              setEditToggle={setEditToggle}
              studentsProps={students}
            />
          )}
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default StudentList;
