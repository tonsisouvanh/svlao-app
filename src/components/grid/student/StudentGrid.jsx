import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import StudentCard from "../../card/StudentCard";

const StudentGrid = ({ studentsProps }) => {
  console.log(studentsProps);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 font-notosanslao sm:grid-cols-2 md:grid-cols-3">
        {studentsProps &&
          studentsProps.map((ele) => (
            // <div
            //   key={i?.id}
            //   className="card w-full min-w-fit max-w-md space-y-4 border border-base-200 p-3 shadow-md transition-all hover:shadow-xl"
            // >
            //   <img
            //     alt="team"
            //     className="mr-4 h-16 w-16 flex-shrink-0 rounded-full bg-gray-100 object-cover object-center"
            //     src={
            //       "https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
            //     }
            //   />
            //   <div className="flex-grow space-y-2">
            //     <h2 className="label-text text-xl">{i?.fullname?.laoName}</h2>
            //     <p className="label-text">{i?.major?.vietMajor}</p>

            //     <div className="flex flex-wrap justify-end gap-2">
            //       <Link to={`/detail/${i?.id}`} className="">
            //         <button className="btn btn-accent  btn-sm whitespace-nowrap font-notosanslao !text-white">
            //           {/* ແປງຂໍ້ມູນ */}
            //           <AiFillEdit />
            //         </button>
            //       </Link>
            //       <button
            //         // onClick={() => handleDeleteStudent(i.id)}
            //         className={`btn btn-error btn-sm whitespace-nowrap font-notosanslao !text-white`}
            //       >
            //         {/* ລົບຂໍ້ມູນ */}
            //         <AiFillDelete />
            //       </button>
            //       <Link to={`/detail/${i?.id}`}>
            //         <button className="btn btn-primary  btn-sm whitespace-nowrap font-notosanslao !text-white">
            //           {/* ລາຍລະອຽດນັກຮຽນ */}
            //           <AiFillEye />
            //         </button>
            //       </Link>
            //     </div>
            //   </div>
            // </div>
            <div key={ele.id}>
              <StudentCard student={ele} />
            </div>
          ))}
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
    </div>
  );
};

export default StudentGrid;
