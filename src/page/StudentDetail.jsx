import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminFetchSingleStudent } from "../feature/student/StudentSlice";
import {
  FaUser,
  FaBirthdayCake,
  FaMapMarked,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaGraduationCap,
  FaAward,
  FaPassport,
  FaHome,
} from "react-icons/fa";
import InfoCard from "../components/card/InfoCard";
const StudentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { student: studentData } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(adminFetchSingleStudent(id));
  }, []);
  return (
    <div className="container mx-auto font-notosanslao">
      <div className="!sticky !top-[4.2rem] z-[1] bg-base-100 px-2 shadow-sm">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link className="" to="/dashboard/studentlist">
                Student list
              </Link>
            </li>
            <li className="underline">
              <span>Student detail</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="min-h-screend hero bg-base-100">
        <div className="hero-content flex-col lg:flex-row lg:items-start">
          <div className="h-[30rem] w-[20rem]">
            <img
              src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
              className="h-full w-full rounded-lg object-cover shadow-md"
            />
          </div>
          <div className="flex-grow rounded-lg bg-base-100 p-4">
            <div className="space-x-5 text-2xl font-bold">
              <span>{studentData?.fullname?.laoName}</span>
              <span>
                (
                {studentData?.fullname?.englishFirstname +
                  " " +
                  studentData?.fullname?.englishLastname}
                )
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 whitespace-nowrap sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard
                icon={<FaUser />}
                label="Student ID"
                text={studentData?.studentId}
              />
              <InfoCard
                icon={<FaBirthdayCake />}
                label="Date of Birth"
                text={studentData?.dob || "N/A"}
              />
              <InfoCard
                icon={<FaMapMarked />}
                label="Permanent Address"
                text={studentData?.perminentAddress || "N/A"}
              />
              <InfoCard
                icon={<FaEnvelope />}
                label="Email"
                text={studentData?.email || "N/A"}
              />
              <InfoCard
                icon={<FaPhone />}
                label="Phone Number"
                text={studentData?.phone?.phoneNumber || "N/A"}
              />
              <InfoCard
                icon={<FaUniversity />}
                label="University"
                text={studentData?.university?.laoName || "N/A"}
              />
              <InfoCard
                icon={<FaGraduationCap />}
                label="Major"
                text={studentData?.major?.laoMajor || "N/A"}
              />
              <InfoCard
                icon={<FaAward />}
                label="Degree"
                text={studentData?.degree?.laoDegree || "N/A"}
              />
              <InfoCard
                icon={<FaAward />}
                label="Scholarship Type"
                text={studentData?.scholarship?.type || "N/A"}
              />
              <InfoCard
                icon={<FaAward />}
                label="Scholarship in Lao"
                text={studentData?.scholarship?.scholarshipLao || "N/A"}
              />
              <InfoCard
                icon={<FaAward />}
                label="Scholarship in Vietnam"
                text={studentData?.scholarship?.scholarshipVn || "N/A"}
              />
              <InfoCard
                icon={<FaAward />}
                label="Scholarship University"
                text={studentData?.scholarship?.scholarshipUniversity || "N/A"}
              />
              <InfoCard
                icon={<FaMapMarked />}
                label="Visa from"
                text={studentData?.visa?.from || "N/A"}
              />
              <InfoCard
                icon={<FaMapMarked />}
                label="Visa to"
                text={studentData?.visa?.to || "N/A"}
              />
              <InfoCard
                icon={<FaPassport />}
                label="Passport No"
                text={studentData?.passport?.passportNo || "N/A"}
              />
              <InfoCard
                icon={<FaPassport />}
                label="Passport Expiry"
                text={studentData?.passport?.expired || "N/A"}
              />
              <InfoCard
                icon={<FaHome />}
                label="Residence Address"
                text={studentData?.residenceAddress || "N/A"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
