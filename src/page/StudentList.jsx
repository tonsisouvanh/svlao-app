import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStudents } from "../feature/student/StudentSlice";
import Spinner from "../components/ui/Spinner";
import Unauthorized from "./public/Unauthorized";
import StudentTable from "../components/table/student/StudentTable";
import { BsGridFill, BsTable } from "react-icons/bs";
import StudentGrid from "../components/grid/student/StudentGrid";
import {
  AiFillGooglePlusCircle,
  AiFillPlusCircle,
  AiFillPlusSquare,
} from "react-icons/ai";

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
        <div className="container mx-auto">
          <div className="mb-14">
            {editToggle ? null : (
              <label className="flex justify-center font-notosanslao text-4xl font-bold text-primary">
                ລາຍຊື່ນັກຮຽນ
              </label>
            )}
          </div>
          <div className="">
            {editToggle ? null : (
              <>
                <div className="mb-10 flex w-full items-center justify-between">
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
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Link
                        to={
                          userData.role !== "admin"
                            ? "#"
                            : "/studentlist/add-student"
                        }
                      >
                        <button
                          data-tip="ເພີ່ມນັກຮຽນ"
                          className={`btn btn-primary tooltip font-notosanslao text-white ${
                            userData.role !== "admin" && "btn-disabled"
                          }`}
                        >
                          <AiFillPlusCircle size={20} />
                        </button>
                      </Link>
                    </div>
                    {editToggle ? null : (
                      <div className="">
                        {view === "table" ? (
                          <button onClick={toggleView} className="btn btn-md">
                            <BsTable />
                          </button>
                        ) : (
                          <button onClick={toggleView} className="btn btn-md">
                            <BsGridFill />
                          </button>
                        )}
                      </div>
                    )}
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
