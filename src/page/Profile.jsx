import { Link } from "react-router-dom";
import { degreeList, relationships, scholarshipTypes } from "../data/data";
import { useEffect, useState } from "react";
import DataNotFound from "./public/DataNotFound";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStudent } from "../feature/student/StudentSlice";
import { auth } from "../firebase";
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
import ErrorMessage from "../components/typography/ErrorMessage";
import { fetchMajors } from "../feature/globalData/MajorSlice";
const textInputStyle =
  "input input-sm input-bordered focus:outline-none w-full max-w-xs hover:shadow-md transition-all duration-200";
const infoCardWarpperStyle = "mb-4 w-full px-2 md:w-1/2 lg:w-1/3";
const Profile = () => {
  const userData = JSON.parse(sessionStorage.getItem("studentData")) || null;
  const { student: studentData } = useSelector(
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
  // const methods = useForm({ defaultValues: studentData });
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
    console.log(data);
  };
  useEffect(() => {
    dispatch(fetchMajors());
  }, [dispatch]);

  return (
    <>
      {!userData ? (
        // backup code goes here
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
            <div className="form-control w-52">
              <label className="label cursor-pointer">
                <span className="label-text">Edit now</span>
                <input
                  type="checkbox"
                  className="toggle toggle-accent"
                  onChange={() => setToggleEdit(!toggleEdit)}
                />
              </label>
            </div>
          </div>
          <div className="min-h-screend hero bg-base-100">
            <div className="hero-content flex-col lg:flex-row lg:items-start">
              <>
                {/* <div className="h-full w-[50rem] ">
                <img
                  src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
                  className="h-full w-full rounded-full object-cover shadow-md max-w-sm"
                />
              </div> */}
                {/* <div className="rounded-lg p-6">
              <div className="mb-4 text-2xl font-bold">
                {studentData?.fullname?.laoName}
              </div>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <h2 className="mb-2 text-lg font-semibold underline">
                    Personal Information
                  </h2>
                  <p>
                    <strong>Student ID:</strong> {studentData?.studentId}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {studentData?.dob || "N/A"}
                  </p>
                  <p>
                    <strong>Gender:</strong> {studentData?.gender || "N/A"}
                  </p>
                  <p>
                    <strong>Permanent Address:</strong>{" "}
                    {studentData?.permanentAddress || "N/A"}
                  </p>
                </div>
                <div className="w-1/2">
                  <h2 className="mb-2 text-lg font-semibold underline">
                    Contact Information
                  </h2>
                  <p>
                    <strong>Email:</strong> {studentData?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{" "}
                    {studentData?.phone?.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>
              <h2 className="my-4 text-lg font-semibold underline">
                Academic Information
              </h2>
              <div className="mb-2">
                <strong>University:</strong>{" "}
                {studentData?.university?.laoName || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Major:</strong> {studentData?.major?.laoMajor || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Degree:</strong> {studentData?.degree?.laoDegree || "N/A"}
              </div>
              <h2 className="my-4 text-lg font-semibold underline">
                Scholarship Information
              </h2>
              <div className="mb-2">
                <strong>Scholarship Type:</strong>{" "}
                {studentData?.scholarship?.type || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Scholarship in Lao:</strong>{" "}
                {studentData?.scholarship?.scholarshipLao || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Scholarship in Vietnam:</strong>{" "}
                {studentData?.scholarship?.scholarshipVn || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Scholarship University:</strong>{" "}
                {studentData?.scholarship?.scholarshipUniversity || "N/A"}
              </div>
              <h2 className="my-4 text-lg font-semibold underline">
                Other Information
              </h2>
              <div className="mb-2">
                <strong>Visa from:</strong> {studentData?.visa?.from || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Visa to:</strong> {studentData?.visa?.to || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Passport No:</strong>{" "}
                {studentData?.passport?.passportNo || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Passport Expiry:</strong>{" "}
                {studentData?.passport?.expired || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Residence Address:</strong>{" "}
                {studentData?.residenceAddress || "N/A"}
              </div>
            </div> */}
              </>
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
                  </div>
                </div>
                {/* TODO: */}
                <form
                  onSubmit={handleSubmit(handleEditSubmit)}
                  className="-mx-2 mt-4 flex flex-wrap"
                >
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaUser />}
                      label="Lao name"
                      text={studentData?.fullname?.laoName || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <div className="space-y-1">
                      <input
                        {...register("fullname.laoName", {
                          required: "Please fill up",
                        })}
                        type="text"
                        placeholder="ຕື່ມຊື່"
                        className={
                          textInputStyle + `${toggleEdit ? " flex" : " hidden"}`
                        }
                      />
                      <ErrorMessage
                        styling="mt-3 sm:text-md"
                        error={errors?.studentData?.fullname?.englishFirstname}
                      />
                      <div className="flex flex-wrap items-center gap-1">
                        <input
                          {...register("fullname.englishFirstname", {
                            required: "Please fill up",
                          })}
                          type="text"
                          placeholder="Firstname (English)"
                          className={
                            textInputStyle +
                            `${
                              toggleEdit ? " !input-xs flex !w-fit" : " hidden"
                            }`
                          }
                        />
                        <input
                          {...register("fullname.englishLastname", {
                            required: "Please fill up",
                          })}
                          type="text"
                          placeholder="Lastname (English)"
                          className={
                            textInputStyle +
                            `${
                              toggleEdit ? " !input-xs flex !w-fit" : " hidden"
                            }`
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaUser />}
                      label="Sutdent ID / MSSV"
                      text={studentData?.studentId || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <input
                      {...register("studentId", {
                        required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມຊື່"
                      className={
                        textInputStyle + `${toggleEdit ? " flex" : " hidden"}`
                      }
                    />
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors?.studentId}
                    />
                  </div>
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaBirthdayCake />}
                      label="Date of Birth"
                      text={studentData?.dob || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <input
                      {...register("dob", {
                        required: "Please fill up",
                      })}
                      type="date"
                      placeholder="ຕື່ມຊື່"
                      className={
                        textInputStyle + `${toggleEdit ? " flex" : " hidden"}`
                      }
                    />
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors?.studentId}
                    />
                  </div>
                  {/* <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaMapMarked />}
                      label="Permanent Address"
                      text={studentData?.perminentAddress || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <input
                      {...register("perminentAddress", {
                        required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມຊື່"
                      className={
                        textInputStyle + `${toggleEdit ? " flex" : " hidden"}`
                      }
                    />
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors?.studentId}
                    />
                  </div> */}
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaEnvelope />}
                      label="Email"
                      text={studentData?.email || "N/A"}
                    />
                  </div>
                  {/* // ~~~~~~~~~~~~~~~~ Phone ~~~~~~~~~~~~~~~~ // */}
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaPhone />}
                      label="Phone Number"
                      text={studentData?.phone?.phoneNumber || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <input
                      {...register("phone.phoneNumber", {
                        required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມຊື່"
                      className={
                        textInputStyle +
                        `${toggleEdit ? " mb-1 flex" : " hidden"}`
                      }
                    />
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors?.phone?.phoneNumber}
                    />
                    <div className="flex items-center gap-1">
                      <input
                        {...register("phone.emergency", {
                          required: "Please fill up",
                        })}
                        type="text"
                        placeholder="ຕື່ມຊື່"
                        className={
                          textInputStyle +
                          `${toggleEdit ? " flex !w-fit" : " hidden"}`
                        }
                      />
                      <ErrorMessage
                        styling="mt-3 sm:text-md"
                        error={errors?.phone?.emergency}
                      />
                      <select
                        {...register("phone.relationship")}
                        className={
                          textInputStyle +
                          `${toggleEdit ? " flex !w-fit" : " hidden"}`
                        }
                      >
                        {relationships.map((ele) => (
                          <option key={ele}>{ele}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // */}

                  {/* // ~~~~~~~~~~~~~~ University ~~~~~~~~~~~~~ // */}
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaUniversity />}
                      label="University"
                      text={studentData?.university?.laoName || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <select
                      {...register("university.laoName", {
                        requiredd: "Please select",
                      })}
                      onChange={(e) => handleSelectUniversity(e.target.value)}
                      className={
                        textInputStyle + `${toggleEdit ? " flex" : " hidden"}`
                      }
                    >
                      {universities.map((item, index) => (
                        <option key={index} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ // */}
                  {/* // ~~~~~~~~~~~~~~ Major ~~~~~~~~~~~~~ // */}
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaGraduationCap />}
                      label="Major"
                      text={studentData?.major?.laoMajor || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <select
                      {...register("major.laoMajor", {
                        requiredd: "Please select",
                      })}
                      className={
                        textInputStyle + `${toggleEdit ? " flex" : " hidden"}`
                      }
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
                  </div>
                  {/* // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ // */}
                  {/* // ~~~~~~~~~~~~~~ Degree ~~~~~~~~~~~~~ // */}
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaAward />}
                      label="Degree"
                      text={studentData?.degree?.laoDegree || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <div className="flex items-center gap-2">
                      <select
                        {...register("degree.laoDegree", {
                          requiredd: "Please select",
                        })}
                        className={
                          textInputStyle + `${toggleEdit ? " flex" : " hidden"}`
                        }
                        onChange={(e) => handleSelectDegree(e.target.value)}
                      >
                        {degreeList.map((item, index) => (
                          <option key={index} value={item.laoDegree}>
                            {item.laoDegree}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        {...register("degree.vietDegree")}
                        hidden
                      />
                    </div>
                  </div>
                  {/* // ~~~~~~~~~~~~~~ Degree ~~~~~~~~~~~~~ // */}
                  {/* // ~~~~~~~~~~~~~~~ Scholarship ~~~~~~~~~~~~~~~~~ // */}
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaAward />}
                      label="Scholarship Type"
                      text={studentData?.scholarship?.type || "N/A"}
                      toggleEdit={toggleEdit}
                    />

                    {!toggleEdit && (
                      <div className="flex flex-wrap items-center gap-1 px-4">
                        <span className="input input-bordered input-xs">
                          {studentData?.scholarship?.scholarshipLao || "N/A"}
                        </span>
                        <span className="input input-bordered input-xs">
                          {studentData?.scholarship?.scholarshipVn || "N/A"}
                        </span>
                        <span className="input input-bordered input-xs">
                          {studentData?.scholarship?.scholarshipUniversity ||
                            "N/A"}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-1">
                      <select
                        {...register("scholarship.type", {
                          requiredd: "Please select",
                        })}
                        className={
                          textInputStyle +
                          `${toggleEdit ? " !input-xs flex !w-fit" : " hidden"}`
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
                          textInputStyle +
                          `${toggleEdit ? " !input-xs flex !w-fit" : " hidden"}`
                        }
                      />
                      <input
                        {...register("scholarship.scholarshipVn")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ"
                        className={
                          textInputStyle +
                          `${toggleEdit ? " !input-xs flex !w-fit" : " hidden"}`
                        }
                      />
                      <input
                        {...register("scholarship.scholarshipUniversity")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ"
                        className={
                          textInputStyle +
                          `${toggleEdit ? " !input-xs flex !w-fit" : " hidden"}`
                        }
                      />
                    </div>
                  </div>
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaMapMarked />}
                      label="Study duration"
                      text={
                        studentData?.duration?.from +
                          " - " +
                          studentData?.duration?.to || "N/A"
                      }
                      toggleEdit={toggleEdit}
                    />
                    <div className="flex flex-col gap-2">
                      <div
                        className={
                          "" +
                          `${
                            toggleEdit
                              ? "flex w-fit items-center gap-1"
                              : " hidden"
                          }`
                        }
                      >
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
                        <ErrorMessage
                          styling="mt-0 sm:text-md"
                          error={errors?.duration?.from}
                        />
                      </div>
                      <div
                        className={
                          "" +
                          `${
                            toggleEdit
                              ? "flex w-fit items-center gap-1"
                              : " hidden"
                          }`
                        }
                      >
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
                        <ErrorMessage
                          styling="mt-0 sm:text-md"
                          error={errors?.duration?.to}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaMapMarked />}
                      label="Facebook"
                      text={studentData?.facebookUrl || "N/A"}
                      toggleEdit={toggleEdit}
                      link={"btn btn-link"}
                    />
                    <input
                      {...register("facebookUrl")}
                      type="text"
                      placeholder="Link FaceBook"
                      className={
                        textInputStyle + `${toggleEdit ? " flex" : " hidden"}`
                      }
                    />
                  </div>
                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaMapMarked />}
                      label="Visa from"
                      text={
                        "ຈາກ: " +
                          studentData?.visa?.from +
                          "  ເຖິງ: " +
                          studentData?.visa.to || "N/A"
                      }
                      toggleEdit={toggleEdit}
                    />
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
                  </div>

                  <div className={infoCardWarpperStyle}>
                    <InfoCard
                      icon={<FaPassport />}
                      label="Passport No"
                      text={studentData?.passport?.passportNo || "N/A"}
                      toggleEdit={toggleEdit}
                    />
                    <div
                      className={`space-y-3 ${
                        toggleEdit ? "flex flex-col" : "hidden"
                      }`}
                    >
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
                    </div>
                  </div>
                  <InfoCard
                    icon={<FaHome />}
                    label="Residence Address"
                    text={studentData?.residenceAddress?.address || "N/A"}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DataNotFound />
      )}
    </>
  );
};

export default Profile;

// <div className="rounded bg-none font-notosanslao">
//   <div>
//     <h1 className="mb-4 flex justify-center text-xl font-bold sm:text-4xl">
//       ລາຍລະອຽດນັກຮຽນ
//     </h1>

//     <div className="flex flex-col items-center justify-start gap-4 md:flex-row md:items-start md:justify-center">
//       <div className="flex justify-center ">
//         <div className="flex h-1/2 w-64 ">
//           <img
//             className="mb-1 h-full  w-full object-cover  "
//             alt="hero"
//             src="https://res.cloudinary.com/dlux9nebf/image/upload/v1696842264/SVlaoProject/BounmyDola.jpg"
//           />
//         </div>
//       </div>

//       <section className="body-font grid grid-cols-1 whitespace-nowrap  px-5 text-gray-600 sm:grid-cols-2 xl:grid-cols-3">
//         <div className="items-center justify-between gap-6">
//           <h2 className="label-text font-semibold md:text-xl">
//             ຊື່ລາວ:
//           </h2>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//           <p className="label-text font-semibold md:text-xl">
//             {userData?.documentId}
//           </p>
//         </div>
//         <div className="">
//           <h2 className=" label-text font-semibold md:text-xl">
//             ຊື່ອັງກິດ:
//           </h2>
//           <p>{student.gender}</p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="">
//           <h2 className="label-text font-semibold md:text-xl">
//             ຊື່ຫລິ້ນ:
//           </h2>
//           <p className="label-text font-semibold md:text-xl">
//             {student.age}
//           </p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="flex items-center justify-between gap-6 ">
//           <h2 className="label-text font-semibold md:text-xl">MSSV:</h2>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//           <p className="label-text font-semibold md:text-xl">
//             {userData?.documentId}
//           </p>
//         </div>
//         <div>
//           <h2 className="label-text font-semibold md:text-xl">ເພດ:</h2>
//           <p>{student.gender}</p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="">
//           <h2 className="label-text font-semibold md:text-xl">
//             ວັນເດືອນປີເກີດ:
//           </h2>
//           <p className="label-text font-semibold md:text-xl">
//             {student.age}
//           </p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="flex items-center justify-between gap-6">
//           <h2 className="label-text font-semibold md:text-xl">
//             ທີ່ຢູ່ປັດຈຸບັນ:
//           </h2>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//           <p className="label-text font-semibold md:text-xl">
//             {userData?.documentId}
//           </p>
//         </div>
//         <div>
//           <h2 className="label-text font-semibold md:text-xl">
//             ຊື່ໂຮງຮຽນ:
//           </h2>
//           <p>{student.gender}</p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="">
//           <h2 className="label-text font-semibold md:text-xl">
//             ສາຍຮຽນ:
//           </h2>
//           <p className="label-text font-semibold md:text-xl">
//             {student.age}
//           </p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="flex items-center justify-between gap-6">
//           <h2 className="label-text font-semibold md:text-xl">
//             ລະດັບຮຽນ:
//           </h2>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//           <p className="label-text font-semibold md:text-xl">
//             {userData?.documentId}
//           </p>
//         </div>
//         <div>
//           <h2 className="label-text font-semibold md:text-xl">
//             ທຶນການສຶກສາ:
//           </h2>
//           <p>{student.gender}</p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="">
//           <h2 className="label-text font-semibold md:text-xl">
//             ໄລຍະຮຽນ:
//           </h2>
//           <p className="label-text font-semibold md:text-xl">
//             {student.age}
//           </p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="flex items-center justify-between gap-6 ">
//           <h2 className="label-text font-semibold md:text-xl">
//             ເບີໂທຕິດຕໍ່:
//           </h2>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//           <p className="label-text font-semibold md:text-xl">
//             {userData?.documentId}
//           </p>
//         </div>
//         <div>
//           <h2 className="label-text font-semibold md:text-xl">
//             ເບີໂທຕິດຕໍ່ສຸກເສີນ
//           </h2>
//           <p>{student.gender}</p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div className="items-center justify-between gap-6 ">
//           <h2 className="label-text font-semibold md:text-xl">Visa:</h2>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//           <p className="label-text font-semibold md:text-xl">
//             {userData?.documentId}
//           </p>
//         </div>
//         <div>
//           <h2 className="label-text font-semibold md:text-xl">
//             Link FaceBook:
//           </h2>
//           <p>{student.gender}</p>
//           {monutchinh === true ? (
//             <input
//               type="text"
//               placeholder="Type here"
//               className={inputStyle}
//             />
//           ) : null}
//         </div>
//         <div>
//           <div className="mt-20 flex items-center justify-center gap-2 ">
//             <div>
//               <label className={mainLabelStyle}>Passport:</label>
//               <div className="flex flex-col items-start gap-3">
//                 <div className="space-y-3">
//                   <input
//                     {...register("passport.passportNo", {
//                       required: "Please fill up",
//                     })}
//                     type="text"
//                     placeholder="Passport Number"
//                     className={textInputStyle}
//                   />

//                   <input
//                     {...register("passport.expired", {
//                       required: "Please enter date",
//                     })}
//                     type="date"
//                     placeholder="Expired Date"
//                     className={textInputStyle}
//                   />
//                 </div>
//                 <div className="flex w-full flex-col items-start justify-center">
//                   <label className={mainLabelStyle}>ຮູບ</label>
//                   <label
//                     htmlFor="dropzone-file"
//                     className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//                   >
//                     <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                       <svg
//                         className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 20 16"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                         />
//                       </svg>
//                       <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                         <span className="">Click to upload</span> or
//                         drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         SVG, PNG, JPG or GIF (MAX. 800x400px)
//                       </p>
//                     </div>
//                     <input
//                       id="dropzone-file"
//                       type="file"
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>

//     {userProfile?.role === "admin" ? (
//       <div className="mb-10 flex justify-end gap-10  font-notosanslao font-bold text-primary">
//         {monutchinh === true ? null : (
//           <button
//             onClick={() => setmonutchinh(true)}
//             className="btn btn-info mt-10 text-xl"
//           >
//             ແປງຂໍ້ມູນ
//           </button>
//         )}
//         {monutchinh === true ? (
//           <div>
//             <button className="btn btn-info text-xl">ຕົກລົງ</button>
//             <button
//               onClick={() => setmonutchinh(false)}
//               className="btn btn-secondary text-xl"
//             >
//               ຍົກເລີກ
//             </button>
//           </div>
//         ) : null}
//       </div>
//     ) : null}
//   </div>
// </div>
