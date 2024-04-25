import PropTypes from "prop-types";

import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
const StudentCard = ({
  student,
  setEditToggle,
  setEditingStudent,
}) => {
  const handleClickEdit = (student) => {
    setEditToggle(true);
    setEditingStudent(student);
  };
  return (
    <>
      <div className="rounded-lg bg-base-200 shadow-md">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/30 backdrop-invert backdrop-opacity-10"></div>
          <img
            src={`/consule.jpg`}
            alt=""
            className="h-[10rem] w-full object-cover object-top"
          />
        </div>
        <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full">
          <img
            src={student?.profileImg || ""}
            alt=""
            className="h-32 w-full object-cover object-top "
          />
        </div>
        <div className="p-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-base-content">
              {student?.fullname?.laoName}
            </h2>
            <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
              {student?.major?.laoMajor}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-around">
            <a
              href={student?.facebookUrl}
              rel="noreferrer"
              target="_blank"
              className="mr-2 rounded-full p-2 text-blue-800 shadow-md hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
          </div>
          <div className="mt-4 flex justify-center px-2">
            <div className="flex-grow space-y-2">
              <div className="flex flex-wrap justify-end gap-2">
                <button
                  onClick={() => handleClickEdit(student)}
                  className="btn btn-accent  btn-sm whitespace-nowrap font-notosanslao !text-white"
                >
                  {/* ແປງຂໍ້ມູນ */}
                  <AiFillEdit />
                </button>
                <button
                  // onClick={() => handleDeleteStudent(i.id)}
                  className={`btn btn-error btn-sm whitespace-nowrap font-notosanslao !text-white`}
                >
                  {/* ລົບຂໍ້ມູນ */}
                  <AiFillDelete />
                </button>
                <Link to={`/student-detail/${student?.id}`}>
                  <button className="btn btn-primary  btn-sm whitespace-nowrap font-notosanslao !text-white">
                    {/* ລາຍລະອຽດນັກຮຽນ */}
                    <AiFillEye />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCard;

StudentCard.propTypes = {
  student: PropTypes.object.isRequired, // You can specify the correct shape of the object if needed.
};
