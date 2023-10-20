import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../components/ui/Spinner";
import Unauthorized from "./public/Unauthorized";
import StudentTable from "../components/table/student/StudentTable";
import { BsGridFill, BsTable } from "react-icons/bs";
import StudentGrid from "../components/grid/student/StudentGrid";
import { AiFillPlusCircle } from "react-icons/ai";

const StudentList = () => {
  // const dispatch = useDispatch();
  const { students, status: studentStatus } = useSelector(
    (state) => state.students,
  );
  // const [studentData, setStudentData] = useState(students);
  const [editToggle, setEditToggle] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData")) || {};

  const [view, setView] = useState("table");
  const toggleView = () => {
    setView((prevView) => (prevView === "table" ? "grid" : "table"));
  };

  // const handleReload = async () => {
  //   await dispatch(fetchStudents());
  //   setStudentData(students);
  // };
  // const handleDeleteStudent = (id) => {
  //   return;
  // };

  useEffect(() => {
    const savedView = localStorage.getItem("viewPreference");
    if (savedView) {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewPreference", view);
  }, [view]);

  // useEffect(() => {
  //   dispatch(fetchStudents());
  //   if (studentStatus === "succeeded" && students && students.length > 0)
  //     setStudentData(students);
  // }, []);
  if (studentStatus === "loading") {
    return <Spinner />;
  }
  if (studentStatus === "failed") {
    return <div>Error loading students</div>;
  }
  return userData?.role === "admin" ? (
    <>
      <section className="">
        <div className="container mx-auto p-4">
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
                <div className="mb-10 flex w-full items-center justify-between gap-2">
                  {/* <Searchbar
                      filter={globalFilter}
                      setFilter={setGlobalFilter}
                    />
                    <Filter
                      filter={globalFilter}
                      setFilter={setGlobalFilter}
                      options={scholarshipTypes}
                      title={"ປະເພດທຶນ"}
                      fieldName={"name"}
                    />
                    <Filter
                      filter={globalFilter}
                      setFilter={setGlobalFilter}
                      options={mockDegrees}
                      title={"ລະດັບການສຶກສາ"}
                      fieldName={"laoDegree"}
                    /> */}
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
                            <BsGridFill />
                          </button>
                        ) : (
                          <button onClick={toggleView} className="btn btn-md">
                            <BsTable />
                          </button>
                        )}
                      </div>
                    )}
                    {/* <div
                        onClick={handleReload}
                        className="tooltip tooltip-top"
                        data-tip="Reload data"
                      >
                        <button className="btn">
                          <AiOutlineReload />
                        </button>
                      </div> */}
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
