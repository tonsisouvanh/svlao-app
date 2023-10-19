import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminFetchSingleStudent } from "../feature/student/StudentSlice";
const StudentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { student: studentData } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(adminFetchSingleStudent(id));
  }, []);

  return (
    <div className="container mx-auto font-notosanslao">
      <div className="!sticky !top-[4rem] z-[1] px-2">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/dashboard/studentlist">Student list</Link>
            </li>
            <li className="underline">
              <span>Student detail</span>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="rounded-lg p-6 shadow-md">
        <div className="mb-4 text-2xl font-bold">
          {studentData?.fullname?.laoName}
        </div>
        <div className="flex justify-between">
          <div className="w-1/2">
            <h2 className="mb-2 text-lg font-semibold">Personal Information</h2>
            <p>
              <strong>Username:</strong> {studentData?.username}
            </p>
            <p>
              <strong>Role:</strong> {studentData?.role}
            </p>
            <p>
              <strong>Date of Birth:</strong> {studentData?.dob || "N/A"}
            </p>
     
          </div>
          <div className="w-1/2">
            <h2 className="mb-2 text-lg font-semibold">Contact Information</h2>
            <p>
              <strong>Email:</strong> {studentData?.email}
            </p>
            <p>
              <strong>Phone Number:</strong>
              {studentData?.phone?.phoneNumber || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {studentData?.gender}
            </p>
       
          </div>
        </div>
        <h2 className="my-4 text-lg font-semibold">Academic Information</h2>
        <div className="mb-2">
          <strong>University:</strong> {studentData?.university?.laoName}
        </div>
        <div className="mb-2">
          <strong>Major:</strong> {studentData?.major?.laoMajor || "N/A"}
        </div>
        <div className="mb-2">
          <strong>Degree:</strong> {studentData?.degree?.laoDegree || "N/A"}
        </div>
        <h2 className="my-4 text-lg font-semibold">Other Information</h2>
        <div className="mb-2">
          <strong>Passport No:</strong> {studentData?.passport?.passportNo}
        </div>
        <div className="mb-2">
          <strong>Scholarship Type:</strong> {studentData?.scholarship?.type}
        </div>
   
      </div> */}
      <div className="min-h-screend hero bg-base-100">
        <div className="hero-content flex-col lg:flex-row lg:items-start">
          <div className="h-[30rem]">
            <img
              src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
              className="h-full w-full rounded-lg object-cover shadow-2xl"
            />
          </div>
          <div>
            <div className="rounded-lg p-6 shadow-md">
              <div className="mb-4 text-2xl font-bold">
                {studentData?.fullname?.laoName}
              </div>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <h2 className="mb-2 text-lg font-semibold">
                    Personal Information
                  </h2>
                  <p>
                    <strong>Username:</strong> {studentData?.username}
                  </p>
                  <p>
                    <strong>Role:</strong> {studentData?.role}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {studentData?.dob || "N/A"}
                  </p>
                </div>
                <div className="w-1/2">
                  <h2 className="mb-2 text-lg font-semibold">
                    Contact Information
                  </h2>
                  <p>
                    <strong>Email:</strong> {studentData?.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>
                    {studentData?.phone?.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Gender:</strong> {studentData?.gender}
                  </p>
                </div>
              </div>
              <h2 className="my-4 text-lg font-semibold">
                Academic Information
              </h2>
              <div className="mb-2">
                <strong>University:</strong> {studentData?.university?.laoName}
              </div>
              <div className="mb-2">
                <strong>Major:</strong> {studentData?.major?.laoMajor || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Degree:</strong>
                {studentData?.degree?.laoDegree || "N/A"}
              </div>
              <h2 className="my-4 text-lg font-semibold">Other Information</h2>
              <div className="mb-2">
                <strong>Passport No:</strong>
                {studentData?.passport?.passportNo}
              </div>
              <div className="mb-2">
                <strong>Scholarship Type:</strong>
                {studentData?.scholarship?.type}
              </div>
            </div>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
