import { Link } from "react-router-dom";
import {
  degreeList,
  residenceAddress,
  relationships,
  scholarshipTypes,
} from "../../data/data";
import { useEffect, useState } from "react";
import DataNotFound from "../public/DataNotFound";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleStudent,
  studentUpdateStudent,
} from "../../feature/student/StudentSlice";
import { auth } from "../../firebase";
import { PiGenderIntersexBold, PiMagnifyingGlassFill } from "react-icons/pi";
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
import ErrorMessage from "../../components/typography/ErrorMessage";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import { fetchUniversities } from "../../feature/globalData/UniversitySlice";
import { fetchMajors } from "../../feature/globalData/MajorSlice";
const textInputStyle =
  "input input-sm input-bordered focus:outline-none w-full hover:shadow-md transition-all duration-200";

const fieldOrder = [
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
  // "userStatus",
];
const StudentProfile = () => {
  const userData = JSON.parse(sessionStorage.getItem("studentData")) || null;
  const { student: studentData, status } = useSelector(
    (state) => state.students,
  );
  const { universities } = useSelector((state) => state.universities);
  const { majors } = useSelector((state) => state.majors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: studentData });
  const [toggleEdit, setToggleEdit] = useState(false);
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const dispatch = useDispatch((state) => state.user);
  const user = auth.currentUser;

  useEffect(() => {
    dispatch(fetchSingleStudent(user.uid));
    reset(studentData);
  }, [toggleEdit]);

  const handleSelectDegree = (value) => {
    const vietDegree = degreeList.find((d) => d.laoDegree === value);
    setValue("degree.vietDegree", vietDegree.vietDegree);
    setDegree(vietDegree.vietDegree);
  };
  const handleSelectMajor = (value) => {
    const major = majors.find((d) => d.laoMajor === value);
    setValue("major.vietMajor", major.vietMajor);
    setMajor(major.vietMajor);
  };
  const handleSelectUniversity = (value) => {
    const university = universities.find((d) => d.laoName === value);
    setValue("university.vietName", university.vietName);
    setValue("university.englishName", university.englishName);
    setValue("university.shortcut", university.shortcut);
    setUniversity(university.vietName);
  };
  const handleEditSubmit = (data) => {
    if (data) {
      const studentData = { ...data };
      dispatch(studentUpdateStudent(studentData));
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };
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
                {toggleEdit ? (
                  <div className="flex flex-wrap gap-2">
                    <input
                      {...register("fullname.laoName", {
                        // required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມຊື່"
                      className={textInputStyle}
                    />
                    <input
                      {...register("fullname.englishFirstname", {
                        // required: "Please fill up",
                      })}
                      type="text"
                      placeholder="Firstname (English)"
                      className={textInputStyle}
                    />
                    <input
                      {...register("fullname.englishLastname", {
                        // required: "Please fill up",
                      })}
                      type="text"
                      placeholder="Lastname (English)"
                      className={textInputStyle}
                    />
                  </div>
                ) : (
                  <div className={`ml-8 text-sm`}>
                    <span>{studentData[field]?.laoName || "NA"}</span>
                    <div className="flex items-center gap-1">
                      <span>ຊື່:</span>
                      <span>
                        {studentData[field]?.englishFirstname || "NA"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>ນາມສະກຸນ:</span>
                      <span>{studentData[field]?.englishLastname || "NA"}</span>
                    </div>
                  </div>
                )}
              </>
            ) : field === "university" ? (
              <>
                {toggleEdit ? (
                  <>
                    <select
                      {...register("university.laoName", {
                        // requiredd: "Please select",
                      })}
                      onChange={(e) => handleSelectUniversity(e.target.value)}
                      className={textInputStyle}
                    >
                      {universities.map((item, index) => (
                        <option key={index} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <div className={`ml-8 flex flex-col text-sm`}>
                    <span>{studentData[field]?.laoName}</span>
                    <span>{studentData[field]?.vietName}</span>
                    <span>{studentData[field]?.englishName}</span>
                  </div>
                )}
              </>
            ) : field === "major" ? (
              <>
                {toggleEdit ? (
                  <>
                    <select
                      {...register("major.laoMajor", {
                        // requiredd: "Please select",
                      })}
                      className={textInputStyle}
                      onChange={(e) => handleSelectMajor(e.target.value)}
                    >
                      {majors.map((item, index) => (
                        <option key={index} value={item.laoMajor}>
                          {item.laoMajor}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      styling="mt-1 sm:text-md"
                      error={errors?.major?.laoMajor}
                    />
                    <input
                      type="text"
                      hidden
                      {...register("major.vietMajor")}
                    />
                  </>
                ) : (
                  <>
                    <div className={`ml-8 flex flex-col text-sm`}>
                      <span>{studentData[field]?.laoMajor}</span>
                      <span>{studentData[field]?.vietMajor}</span>
                    </div>
                  </>
                )}
              </>
            ) : field === "degree" ? (
              <>
                {toggleEdit ? (
                  <>
                    <select
                      {...register("degree.laoDegree", {
                        // requiredd: "Please select",
                      })}
                      className={textInputStyle}
                      onChange={(e) => handleSelectDegree(e.target.value)}
                    >
                      {degreeList.map((item, index) => (
                        <option key={index} value={item?.laoDegree}>
                          {item?.laoDegree}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      {...register("degree.vietDegree")}
                      hidden
                    />
                  </>
                ) : (
                  <>
                    <div className={`ml-8 flex flex-col text-sm`}>
                      <span>{studentData[field]?.laoDegree}</span>
                      <span>({studentData[field]?.vietDegree})</span>
                    </div>
                  </>
                )}
              </>
            ) : field === "scholarship" ? (
              <>
                {toggleEdit ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      <select
                        {...register("scholarship.type", {
                          // requiredd: "Please select",
                        })}
                        className={
                          textInputStyle + `${toggleEdit ? "flex" : " hidden"}`
                        }
                      >
                        {scholarshipTypes.map((ele) => (
                          <option key={ele.id}>{ele.name}</option>
                        ))}
                      </select>
                      <input
                        {...register("scholarship.scholarshipLao")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ"
                        className={
                          textInputStyle + `${toggleEdit ? "flex" : " hidden"}`
                        }
                      />
                      <input
                        {...register("scholarship.scholarshipVn")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ"
                        className={
                          textInputStyle + `${toggleEdit ? "flex" : " hidden"}`
                        }
                      />
                      <input
                        {...register("scholarship.scholarshipUniversity")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ"
                        className={
                          textInputStyle + `${toggleEdit ? "flex" : " hidden"}`
                        }
                      />
                    </div>
                  </>
                ) : (
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
                          {studentData?.scholarship?.scholarshipUniversity ||
                            "N/A"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : field === "duration" ? (
              <>
                {toggleEdit ? (
                  <>
                    <div className="flex items-center gap-1">
                      <span>ຈາກ:</span>
                      <input
                        {...register("duration.from", {
                          requiredd: "Please enter date",
                          minLength: { value: 4, message: "minimum 4" },
                          maxLength: { value: 4, message: "maximum 4" },
                        })}
                        placeholder="2020"
                        type="text"
                        className={textInputStyle}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span>ເຖິງ:</span>
                      <input
                        {...register("duration.to", {
                          requiredd: "Please enter date",
                          minLength: { value: 4, message: "minimum 4" },
                          maxLength: { value: 4, message: "maximum 4" },
                        })}
                        placeholder="2024"
                        type="text"
                        className={textInputStyle}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`ml-8 flex items-center gap-1 text-sm`}>
                      <span>{studentData[field]?.from}</span>-
                      <span>{studentData[field]?.to}</span>
                    </div>
                  </>
                )}
              </>
            ) : field === "phone" ? (
              <>
                {toggleEdit ? (
                  <>
                    <div className="space-y-1">
                      <input
                        {...register("phone.phoneNumber", {
                          required: "Please fill up",
                        })}
                        type="text"
                        placeholder="ຕື່ມຊື່"
                        className={textInputStyle}
                      />
                      <div className="flex w-full items-center gap-1">
                        <input
                          {...register("phone.emergency", {
                            required: "Please fill up",
                          })}
                          type="text"
                          placeholder="ຕື່ມຊື່"
                          className={textInputStyle}
                        />
                        <select
                          {...register("phone.relationship")}
                          className={textInputStyle}
                        >
                          {relationships.map((ele) => (
                            <option key={ele}>{ele}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`ml-8 flex flex-col gap-1 text-sm`}>
                      <span>{studentData[field]?.phoneNumber}</span>
                      <div className="space-x-2">
                        <span>{studentData[field]?.emergency}</span> -
                        <span>{studentData[field]?.relationship}</span>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : field === "visa" ? (
              <>
                {toggleEdit ? (
                  <>
                    <div
                      className={`+ flex flex-wrap items-center gap-2 ${
                        toggleEdit ? " flex" : " hidden"
                      }`}
                    >
                      <div className="flex w-full items-center gap-1">
                        <label className="">ຈາກ: </label>
                        <input
                          {...register("visa.from")}
                          type="date"
                          placeholder="Issue date"
                          className={textInputStyle}
                        />
                      </div>
                      <div className="flex w-full items-center gap-1">
                        <label className="">ເຖິງ: </label>
                        <input
                          {...register("visa.to")}
                          type="date"
                          placeholder="Expired date"
                          className={textInputStyle}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </>
            ) : field === "passport" ? (
              <>
                {toggleEdit ? (
                  <>
                    <div className="flex w-full items-center gap-1">
                      <label className="">ເລກ: </label>
                      <input
                        {...register("passport.passportNo", {
                          required: "Please fill up",
                        })}
                        type="text"
                        placeholder="Passport Number"
                        className={textInputStyle}
                      />
                    </div>
                    <div className="flex w-full items-center gap-1">
                      <label className="whitespace-nowrap">ໝົດອາຍຸ: </label>

                      <input
                        {...register("passport.expired", {
                          required: "Please enter date",
                        })}
                        type="date"
                        placeholder="Expired Date"
                        className={textInputStyle}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`ml-8 flex flex-col gap-1 text-sm`}>
                      <span>{studentData[field]?.passportNo}</span>
                      <span>Expired: {studentData[field]?.expired}</span>
                    </div>
                  </>
                )}
              </>
            ) : field === "residenceAddress" ? (
              <>
                {toggleEdit ? (
                  <>
                    <select
                      {...register("residenceAddress", {
                        requiredd: "Please select",
                      })}
                      className={textInputStyle}
                    >
                      {residenceAddress.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <div
                    className={`ml-8 flex flex-col whitespace-normal text-sm`}
                  >
                    <span>{studentData[field]}</span>
                  </div>
                )}
              </>
            ) : field === "gender" ? (
              <>
                {toggleEdit ? (
                  <>
                    <select
                      {...register("gender", { requiredd: "Please select" })}
                      className={textInputStyle}
                    >
                      <option value={"male"}>ຊາຍ</option>
                      <option value={"female"}>ຍິງ</option>
                    </select>
                  </>
                ) : (
                  <div className={`ml-8 flex flex-col text-sm`}>
                    <span>
                      {studentData[field] === "male" ? (
                        <FaMale size={24} />
                      ) : (
                        <FaFemale size={24} />
                      )}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                {toggleEdit ? (
                  <>
                    <input
                      {...register(field, {
                        // required: "Please fill up",
                      })}
                      type={field === "dob" ? "date" : "text"}
                      placeholder="ຕື່ມຊື່"
                      className={textInputStyle}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </>
            )}
          </div>
        </>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchUniversities());
    dispatch(fetchMajors());
  }, [dispatch]);
  return (
    <>
      {!userData ? (
        <>
          <div className="container mx-auto font-notosanslao">
            <div className="!sticky !top-[4.2rem] z-[1] flex items-center justify-between bg-base-100 px-2 shadow-sm">
              <div className="breadcrumbs text-sm">
                <ul>
                  <li>
                    <Link className="" to="/dashboard/studentlist">
                      ໜ້າຂ່າວ
                    </Link>
                  </li>
                  <li className="underline">
                    <span>ຂໍ້ມູນສ່ວນໂຕ</span>
                  </li>
                </ul>
              </div>
              <div className="form-control w-28">
                <label className="label cursor-pointer">
                  <span className="label-text">ອັບເດດ</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    onChange={() => setToggleEdit(!toggleEdit)}
                  />
                </label>
              </div>
            </div>
            {status === "loading" ? (
              <Spinner />
            ) : (
              <div className="min-h-screend hero bg-base-100">
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                    <div className="flex items-center justify-center">
                      <div className="avatar">
                        <div className="w-full rounded">
                          <img src={studentData.profileImg} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
                <div className="rounded-lg bg-base-100 p-4">
                  <div className="flex items-center gap-5 text-2xl font-bold">
                    <div className="avatar">
                      <PiMagnifyingGlassFill
                        onClick={() =>
                          document.getElementById("my_modal_2").showModal()
                        }
                        className="btn btn-circle btn-ghost btn-xs cursor-pointer p-0"
                      />
                      <div className="w-32 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                        <img src={studentData.profileImg} />
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
                    </div>
                  </div>
                  <form onSubmit={handleSubmit(handleEditSubmit)}>
                    <div className="lg:text-md mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {fieldOrder.map((field, i) => handleRenderer(i, field))}
                    </div>
                    {toggleEdit && (
                      <div className="mt-10 flex justify-end gap-5">
                        {status === "loading" ? (
                          <>
                            <button className="btn">
                              <span className="loading loading-spinner"></span>
                              loading
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="submit"
                              className={`btn btn-primary btn-wide lg:btn-wide`}
                            >
                              ຕົກລົງ
                            </button>
                            <button
                              onClick={() => setToggleEdit(false)}
                              type="button"
                              className={`btn btn-secondary lg:btn-wide`}
                            >
                              ຍົກເລີກ
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <DataNotFound />
      )}
    </>
  );
};

export default StudentProfile;
