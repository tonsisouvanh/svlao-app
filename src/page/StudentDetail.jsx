import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminFetchSingleStudent } from "../feature/student/StudentSlice";
import {
  FaUser,
  FaPhone,
  FaUniversity,
  FaAward,
  FaPassport,
  FaClock,
  FaAccessibleIcon,
  FaMapMarked,
  FaFacebook,
  FaMale,
  FaFemale,
  FaIdCard,
  FaRulerVertical,
} from "react-icons/fa";

import { PiGenderIntersexBold } from "react-icons/pi";
import Spinner from "../components/ui/Spinner";
const fieldOrder = [
  "id",
  "fullname",
  "studentId",
  "dob",
  "gender",
  "perminentAddress",
  "university",
  "major",
  "degree",
  "scholarship",
  "duration",
  "phone",
  "facebookUrl",
  "visa",
  "passport",
  "residenceAddress",
  "userStatus",
];
const StudentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { student: studentData } = useSelector((state) => state.students);

  const getIconAndLabel = (field) => {
    let icon;
    let label;
    switch (field) {
      case "fullname":
        label = "ຊື່ ແລະ ນາມສະກຸນ";
        icon = <FaUser />;
        break;
      case "university":
        label = "ໂຮງຮຽນ";
        icon = <FaUniversity />;
        break;
      case "major":
        label = "ສາຍຮຽນ";
        icon = <FaAward />;
        break;
      case "degree":
        label = "ລະດັບ";
        icon = <FaRulerVertical />;
        break;
      case "scholarship":
        label = "ທຶນ";
        icon = <FaUniversity />;
        break;
      case "duration":
        label = "ໄລຍະຮຽນ";
        icon = <FaClock />;
        break;
      case "phone":
        label = "ເບີໂທຕິດຕໍ່";
        icon = <FaPhone />;
        break;
      case "visa":
        label = "VISA";
        icon = <FaPassport />;
        break;
      case "passport":
        label = "Passport";
        icon = <FaPassport />;
        break;
      case "dob":
        label = "ວດປ ເກິດ";
        icon = <FaClock />;
        break;
      case "studentId":
        label = "ລະຫັດ ນຮ / MSSV";
        icon = <FaIdCard />;
        break;
      case "gender":
        label = "ເພດ";
        icon = <PiGenderIntersexBold />;
        break;
      case "residenceAddress":
        label = "ທີ່ຢູ່ປັດຈຸບັນ";
        icon = <FaMapMarked />;
        break;
      case "perminentAddress":
        label = "ທີ່ຢູ່ລາວ";
        icon = <FaMapMarked />;
        break;
      case "facebookUrl":
        label = "Facebook";
        icon = <FaFacebook />;
        break;
      default:
        label = "No title";
        icon = <FaAccessibleIcon />;
        break;
    }
    return (
      <div className="flex items-center gap-2 font-semibold">
        <div className="text-2xl text-primary">{icon}</div>
        <span className="underline underline-offset-2">{label}</span>
      </div>
    );
  };
  const handleRenderer = (index, field) => {
    return (
      <div key={index} className="flex w-full items-start bg-base-100 p-2">
        <>
          <div className="h-full w-full space-y-2 whitespace-nowrap border-secondary">
            {getIconAndLabel(field)}
            {field === "fullname" ? (
              <>
                <div className={`ml-8 text-sm`}>
                  <span>{studentData[field]?.laoName || "NA"}</span>
                  <div className="flex items-center gap-1">
                    <span>ຊື່:</span>
                    <span>{studentData[field]?.englishFirstname || "NA"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>ນາມສະກຸນ:</span>
                    <span>{studentData[field]?.englishLastname || "NA"}</span>
                  </div>
                </div>
              </>
            ) : field === "university" ? (
              <>
                <div className={`ml-8 flex flex-col text-sm`}>
                  <span>{studentData[field]?.laoName}</span>
                  <span>{studentData[field]?.vietName}</span>
                  <span>{studentData[field]?.englishName}</span>
                </div>
              </>
            ) : field === "major" ? (
              <>
                <div className={`ml-8 flex flex-col text-sm`}>
                  <span>{studentData[field]?.laoMajor}</span>
                  <span>{studentData[field]?.vietMajor}</span>
                </div>
              </>
            ) : field === "degree" ? (
              <>
                <div className={`ml-8 flex flex-col text-sm`}>
                  <span>{studentData[field]?.laoDegree}</span>
                  <span>({studentData[field]?.vietDegree})</span>
                </div>
              </>
            ) : field === "scholarship" ? (
              <>
                <div
                  className={`ml-8 flex flex-col gap-2 !whitespace-normal text-sm`}
                >
                  <span className="font-bold">
                    ທຶນ: {studentData?.scholarship?.type || "N/A"}
                  </span>
                  <div>
                    <p>
                      ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ, ລົງວັນທີ:{" "}
                      {studentData?.scholarship?.scholarshipLao || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      ເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ, ລົງວັນທີ:{" "}
                      {studentData?.scholarship?.scholarshipVn || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      ເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ, ລົງວັນທີ:{" "}
                      {studentData?.scholarship?.scholarshipUniversity || "N/A"}
                    </p>
                  </div>
                </div>
              </>
            ) : field === "duration" ? (
              <>
                <div className={`ml-8 flex items-center gap-1 text-sm`}>
                  <span>{studentData[field]?.from}</span>-
                  <span>{studentData[field]?.to}</span>
                </div>
              </>
            ) : field === "phone" ? (
              <>
                <div className={`ml-8 flex flex-col gap-1 text-sm`}>
                  <span>{studentData[field]?.phoneNumber}</span>
                  <div className="space-x-2">
                    <span>{studentData[field]?.emergency}</span> -
                    <span>{studentData[field]?.relationship}</span>
                  </div>
                </div>
              </>
            ) : field === "visa" ? (
              <div className={`ml-8 flex flex-col gap-1 text-sm`}>
                <span>
                  ຈາກ: {studentData[field]?.from}
                  <p className="text-xs">{`(YYYY-MM-DD)`}</p>
                </span>
                <span>
                  ເຖິງ: {studentData[field]?.to}
                  <p className="text-xs">{`(YYYY-MM-DD)`}</p>
                </span>
              </div>
            ) : field === "passport" ? (
              <div className={`ml-8 flex flex-col gap-1 text-sm`}>
                <span>{studentData[field]?.passportNo}</span>
                <span>Expired: {studentData[field]?.expired}</span>
              </div>
            ) : field === "residenceAddress" ? (
              <div className={`ml-8 flex flex-col whitespace-normal text-sm`}>
                <span>{studentData[field]}</span>
              </div>
            ) : field === "gender" ? (
              <>
                <div className={`ml-8 flex flex-col text-sm`}>
                  <span>
                    {studentData[field] === "male" ? (
                      <FaMale size={24} />
                    ) : (
                      <FaFemale size={24} />
                    )}
                  </span>
                </div>
              </>
            ) : (
              <div className={`ml-8 flex flex-col gap-1 text-sm`}>
                {field === "dob" ? (
                  <>
                    <span>
                      {studentData[field]}
                      <p className="text-xs">{`(YYYY-MM-DD)`}</p>
                    </span>
                  </>
                ) : field === "facebookUrl" ? (
                  <span className="btn-link cursor-pointer">Link</span>
                ) : field === "studentId" ? (
                  <span className="">{studentData[field]}</span>
                ) : (
                  <span>{studentData[field]}</span>
                )}
              </div>
            )}
          </div>
        </>
      </div>
    );
  };

  useEffect(() => {
    dispatch(adminFetchSingleStudent(id));
  }, []);
  return (
    <>
      <div className="container mx-auto font-notosanslao">
        <div className="!sticky !top-[4.2rem] z-[1] flex items-center justify-between bg-base-100 px-2 shadow-sm">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link className="" to="/dashboard/studentlist">
                  Student list
                </Link>
              </li>
              <li className="underline">
                <span>ຂໍ້ມູນສ່ວນໂຕ</span>
              </li>
            </ul>
          </div>
        </div>
        {status === "loading" ? (
          <Spinner />
        ) : (
          <div className="min-h-screend hero bg-base-100">
            <div className="rounded-lg bg-base-100 p-4">
              <div className="flex items-center gap-5 text-2xl font-bold">
                <div className="avatar">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <img src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg" />
                  </div>
                </div>
                <div className="text-md flex flex-col gap-1">
                  <span>{studentData?.fullname?.laoName}</span>
                  <span>
                    (
                    {studentData?.fullname?.englishFirstname +
                      " " +
                      studentData?.fullname?.englishLastname}
                    )
                  </span>
                  <span className="text-sm text-base-content">ID: {studentData?.id || "NA"}</span>
                </div>
              </div>
              <div>
                <div className="lg:text-md mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {fieldOrder.map((field, i) => handleRenderer(i, field))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentDetail;
