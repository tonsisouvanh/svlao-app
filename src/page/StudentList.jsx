import { Link } from "react-router-dom";
import { data } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStudents } from "../feature/student/StudentSlice";
import Spinner from "../components/ui/Spinner";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import Unauthorized from "./public/Unauthorized";

const StudentList = () => {
  const { students, status: studentStatus } = useSelector(
    (state) => state.students,
  );
  const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  if (studentStatus === "loading") {
    return <Spinner />;
  }

  const handleDeleteStudent = (id) => {
    return;
  };

  return userData?.role === "admin" ? (
    <>
      <section className="body-fon space-y-32 p-10 ">
        <div className="container mx-auto px-5 py-10">
          <div className="mb-20 flex w-full flex-col text-center">
            <label className="mb-20 flex justify-center font-notosanslao text-4xl font-bold text-primary     ">
              ລາຍຊື່ນັກຮຽນ
            </label>
            <div className="mb-10 flex justify-end">
              <Link to={userData.role !== "admin" ? "#" : "/add"}>
                <button
                  className={`btn btn-primary font-notosanslao text-white ${
                    userData.role !== "admin" && "btn-disabled"
                  }`}
                >
                  ຕື່ມຂໍ້ມູນນັກຮຽນ
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 font-notosanslao sm:grid-cols-2 md:grid-cols-3">
            {data.map((i) => (
              <div
                key={i.id}
                className="card w-full min-w-fit max-w-md border border-base-200 p-3 shadow-md transition-all hover:shadow-xl"
              >
                {/* <div className="flex w-full h-full items-center rounded-lg border border-gray-200 p-4"> */}
                <img
                  alt="team"
                  className="mr-4 h-16 w-16 flex-shrink-0 rounded-full bg-gray-100 object-cover object-center"
                  src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
                />
                <div className="flex-grow">
                  <h2 className="label-text text-xl">{i.name.nameEnglist}</h2>
                  <p className="label-text">{i.major}</p>

                  <div className="flex flex-wrap justify-end gap-2">
                    <Link to={`/detail/${i.id}`} className="">
                      <button className="btn btn-accent  btn-sm whitespace-nowrap font-notosanslao !text-white">
                        {/* ແປງຂໍ້ມູນ */}
                        <AiFillEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteStudent(i.id)}
                      className={`btn btn-error btn-sm whitespace-nowrap font-notosanslao !text-white`}
                    >
                      {/* ລົບຂໍ້ມູນ */}
                      <AiFillDelete />
                    </button>
                    <Link to={`/detail/${i.id}`}>
                      <button className="btn btn-primary  btn-sm whitespace-nowrap font-notosanslao !text-white">
                        {/* ລາຍລະອຽດນັກຮຽນ */}
                        <AiFillEye />
                      </button>
                    </Link>
                  </div>
                </div>
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>
        <div className="grid justify-items-center  ">
          <div className="join  ">
            <button className="btn join-item !bg-white">«</button>
            <button className="btn join-item !bg-white">1</button>
            <button className="btn join-item !bg-white">2</button>
            <button className="btn join-item !bg-white">2</button>
            <button className="btn join-item !bg-white">_</button>
            <button className="btn join-item !bg-white">_</button>
            <button className="btn join-item !bg-white">10</button>
            <button className="btn join-item !bg-white">100</button>
            <button className="btn join-item !bg-white">»</button>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default StudentList;
