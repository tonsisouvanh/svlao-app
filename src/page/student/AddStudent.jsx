import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/typography/ErrorMessage";
import {
  degreeList,
  perminentAddressList,
  residenceAddress,
  relationships,
  scholarshipTypes,
  userStatus,
} from "../../data/data";
import { useEffect, useState } from "react";
import { initialStudentInput } from "../../data/initialState";
import { adminAddStudent } from "../../feature/student/StudentSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/ui/Spinner";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillFileAdd } from "react-icons/ai";
import { fetchUniversities } from "../../feature/globalData/UniversitySlice";
import { fetchMajors } from "../../feature/globalData/MajorSlice";

const selectInputStyle =
  "select select-sm select-bordered w-full hover:shadow-md transition-all duration-200";
const mainLabelStyle = "label-text text-[1rem] mb-2 block font-semibold";
const subSelectSpanStyle =
  "input input-bordered opacity-70 input-sm whitespace-nowrap";
const textInputStyle =
  "input input-sm input-bordered w-full hover:shadow-md transition-all duration-200";

const AddStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.students);
  const { universities } = useSelector((state) => state.universities);
  const { majors } = useSelector((state) => state.majors);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: initialStudentInput });
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");

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

  const handleAddStudent = (data) => {
    if (data) {
      const studentData = { ...data };
      dispatch(adminAddStudent(studentData));
    } else toast.warning("Input data not valid");
  };

  const handleClear = () => {
    reset();
    navigate(-1);
  };
  useEffect(() => {
    dispatch(fetchUniversities());
    dispatch(fetchMajors());
  }, [dispatch]);
  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div className="container mx-auto">
          <div className="!sticky !top-[4.2rem] z-[1] bg-base-100 px-2 shadow-sm">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to="/dashboard/studentlist">ລາຍຊື່ນັກຮຽນ</Link>
                </li>
                <li className="underline">
                  <span>ເພີ່ມນັກຮຽນ</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-base-200d shadow-mdd relative rounded p-8 font-notosanslao">
            <span className="absolute left-8 top-8">
              <AiFillFileAdd size={40} />
            </span>
            <h1 className="mb-14 flex items-center justify-center font-notosanslao text-4xl font-bold text-primary ">
              ເພີ່ມນັກຮຽນ
            </h1>
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(handleAddStudent)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* // ~~~~~~~~~~~ status Check box ~~~~~~~~~~  */}
                {/* <div>
                  <div className="">
                    <label
                      className={mainLabelStyle + " flex items-center gap-2"}
                    >
                      User Status:
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors.userStatus}
                      />
                    </label>
                    <select
                      {...register("userStatus", {
                        required: "Please select",
                      })}
                      className={selectInputStyle}
                    >
                      {userStatus.map((ele) => (
                        <option key={ele.status} value={ele.status}>
                          {ele.status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="relative">
                      <label
                        className={mainLabelStyle + " flex items-center gap-2"}
                      >
                        <span>ຊື່ລາວ:</span>
                        <ErrorMessage
                          styling="sm:text-md"
                          error={errors?.fullname?.laoName}
                        />
                      </label>
                    </div>
                    <input
                      {...register("fullname.laoName", {
                        requiredd: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມຊື່ລາວ" // Corrected the property name here
                      className={textInputStyle}
                    />
                  </div>
                </div> */}
                <div className="flex items-start gap-2">
                  <div className="whitespace-nowrap">
                    <label className={mainLabelStyle}>ສະຖານະ</label>
                    <select
                      {...register("userStatus", {
                        requiredd: "Please select",
                      })}
                      className={selectInputStyle}
                    >
                      {userStatus.map((ele) => (
                        <option key={ele.status} value={ele.status}>
                          {ele.status}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors.userStatus}
                    />
                  </div>
                  <div className="w-fit">
                    <div className="relative">
                      <label
                        className={mainLabelStyle + " flex items-center gap-2"}
                      >
                        <span>Account ID</span>
                        <ErrorMessage
                          styling="sm:text-md"
                          error={errors?.userId}
                        />
                      </label>
                    </div>
                    <input
                      {...register("userId", {
                        requiredd: "Please fill up",
                      })}
                      type="text"
                      placeholder="Account ID" // Corrected the property name here
                      className={textInputStyle}
                    />
                  </div>
                </div>
                {/* fullname */}
                <div className="flex w-full flex-wrap items-center gap-2 lg:flex-nowrap">
                  <div className="flex w-full flex-col">
                    <div className="relative">
                      <label
                        className={mainLabelStyle + " flex items-center gap-2"}
                      >
                        <span>ຊື່ລາວ:</span>
                        <ErrorMessage
                          styling="sm:text-md"
                          error={errors?.fullname?.laoName}
                        />
                      </label>
                    </div>
                    <input
                      {...register("fullname.laoName", {
                        required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມຊື່ລາວ" // Corrected the property name here
                      className={textInputStyle}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <label className={mainLabelStyle}>ຊື່ຫລິ້ນ:</label>
                    <input
                      {...register("fullname.nickName")}
                      type="text"
                      placeholder="ຕື່ມຊື່ຫລິ້ນ" // Corrected the property name here
                      className={
                        "input input-bordered input-sm transition-all duration-200 hover:shadow-md"
                      }
                    />
                  </div>
                </div>
                <div className="form-control w-full  space-y-2">
                  <label className={mainLabelStyle}>
                    ຊື່ ແລະ ນາມສະກຸນອັງກິດ:
                  </label>
                  <div>
                    <label className="label-text flex items-center gap-2">
                      ຊື່
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.fullname?.englishFirstname}
                      />
                    </label>
                    <input
                      {...register("fullname.englishFirstname", {
                        required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມຊື່" // Corrected the property name here
                      className={textInputStyle}
                    />
                  </div>
                  <div>
                    <label className="label-text flex items-center gap-2">
                      ນາມສະກຸນ
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.fullname?.englishLastname}
                      />
                    </label>

                    <input
                      {...register("fullname.englishLastname", {
                        required: "Please fill up",
                      })}
                      type="text"
                      placeholder="ຕື່ມນາມສະກຸນ" // Corrected the property name here
                      className={textInputStyle}
                    />
                  </div>
                </div>

                {/* Student ID */}
                <div className="form-control w-full">
                  <label className={mainLabelStyle}>MSSV:</label>
                  <input
                    {...register("studentId")}
                    type="text"
                    placeholder="MSSV" // Corrected the property name here
                    className={textInputStyle}
                  />
                </div>
                <div className="form-control w-full ">
                  <label className={mainLabelStyle}>DOB:</label>
                  <input
                    {...register("dob", {
                      required: "Please fill up",
                    })}
                    type="date"
                    placeholder="Date of birth" // Corrected the property name here
                    className={textInputStyle}
                  />
                  <ErrorMessage
                    styling="mt-3 sm:text-md"
                    error={errors?.fullname?.englishName}
                  />
                </div>
                <div className="flex items-center gap-2">
                  {/* GENDER */}
                  <div className="w-20 flex-none">
                    <label className={mainLabelStyle}>ເພດ:</label>
                    <select
                      {...register("gender", { required: "Please select" })}
                      // className="select select-sm select-bordered w-full "
                      className={selectInputStyle}
                    >
                      <option value={"male"}>ຊາຍ</option>
                      <option value={"female"}>ຍິງ</option>
                    </select>
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors.gender}
                    />
                  </div>
                  {/* ADDRESS */}
                  <div className="w-full">
                    <label className={mainLabelStyle}>ແຂວງເກີດ:</label>
                    <select
                      {...register("perminentAddress", {
                        required: "Please select",
                      })}
                      className={selectInputStyle}
                    >
                      {perminentAddressList.map((item) => (
                        <option key={item.id} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      styling="mt-3 sm:text-md"
                      error={errors.gender}
                    />
                  </div>
                </div>
                <div>
                  <label className={mainLabelStyle}>ທີ່ຢູ່ປັດຈຸບັນ:</label>
                  <select
                    onChange={(e) =>
                      setValue("residenceAddress", e.target.value)
                    }
                    className={selectInputStyle + " mb-2"}
                  >
                    <option>Select address</option>
                    {residenceAddress.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <input
                    {...register("residenceAddress", {
                      required: "Please fill up",
                    })}
                    type="text"
                    placeholder="KTX khu B đại học quốc gia..." // Corrected the property name here
                    className={textInputStyle}
                  />
                  <ErrorMessage
                    styling="mt-3 sm:text-md"
                    error={errors.residenceAddress}
                  />
                </div>
                {/* UNIVERSITY */}
                <div className="">
                  <label className={mainLabelStyle}>ຊື່ໂຮງຮຽນ:</label>
                  <div className="flex flex-col items-start gap-2">
                    <select
                      {...register("university.laoName", {
                        required: "Please select",
                      })}
                      onChange={(e) => handleSelectUniversity(e.target.value)}
                      className={selectInputStyle}
                    >
                      {universities.map((item, index) => (
                        <option key={index} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                    {university && university !== "" && (
                      <span className={subSelectSpanStyle}>{university}</span>
                    )}
                    <ErrorMessage
                      styling="mt-1 sm:text-md"
                      error={errors?.university?.laoName}
                    />
                    <input
                      type="text"
                      hidden
                      {...register("university.vietName")}
                    />
                    <input
                      type="text"
                      hidden
                      {...register("university.englishName")}
                    />
                    <input
                      type="text"
                      hidden
                      {...register("university.shortcut")}
                    />
                  </div>
                </div>
                {/* MAJOR */}
                <div className="">
                  <label className={mainLabelStyle}>ສາຍຮຽນ:</label>
                  <div className="flex flex-col gap-2">
                    <select
                      {...register("major.laoMajor", {
                        required: "Please select",
                      })}
                      onChange={(e) => handleSelectMajor(e.target.value)}
                      className={selectInputStyle}
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
                    {major && major !== "" && (
                      <span className={subSelectSpanStyle}>{major}</span>
                    )}
                  </div>
                </div>
                {/* DEGREE */}
                <div>
                  <label className={mainLabelStyle}>ລະດັບຮຽນ:</label>
                  <div className="flex items-center gap-2">
                    <select
                      {...register("degree.laoDegree", {
                        required: "Please select",
                      })}
                      onChange={(e) => handleSelectDegree(e.target.value)}
                      className={selectInputStyle}
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
                    {degree && degree !== "" && (
                      <span className={subSelectSpanStyle}>{degree}</span>
                    )}
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-2">
                  {/* SCHOLARSHIP */}
                  <div>
                    <label className={mainLabelStyle}>ທຶນການສຶກສາ:</label>
                    <div className="mb-2 flex items-center">
                      <select
                        {...register("scholarship.type", {
                          required: "Please select",
                        })}
                        className={selectInputStyle}
                      >
                        {scholarshipTypes.map((ele) => (
                          <option key={ele.id}>{ele.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 ">
                      <input
                        {...register("scholarship.scholarshipLao")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາລາວ"
                        className={textInputStyle}
                      />
                      <input
                        {...register("scholarship.scholarshipVn")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງກະຊວງສຶກສາຫວຽດນາມ"
                        className={textInputStyle}
                      />
                      <input
                        {...register("scholarship.scholarshipUniversity")}
                        type="text"
                        placeholder="ຕື່ມເລກທີຂໍ້ຕົກລົງຂອງສະຖາບັນສຶກສາ"
                        className={textInputStyle}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="">
                    <label className={mainLabelStyle}>ໄລຍະຮຽນ:</label>
                    <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
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
                        <ErrorMessage
                          styling="mt-0 sm:text-md"
                          error={errors?.duration?.from}
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
                        <ErrorMessage
                          styling="mt-0 sm:text-md"
                          error={errors?.duration?.to}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <label className={mainLabelStyle}>ເບີໂທຕິດຕໍ່:</label>

                    <div className="flex flex-col items-start gap-2">
                      <input
                        {...register("phone.phoneNumber", {
                          required: "Please fill up",
                          pattern: {
                            message: "Must be number",
                            value: /^[0-9]*$/,
                          },
                        })}
                        type="text"
                        placeholder="ຕື່ມເບີໂທຫວຽດ"
                        className={textInputStyle}
                      />
                      <ErrorMessage
                        styling="mt-0 sm:text-md"
                        error={errors?.phone?.phoneNumber}
                      />
                      <div className="flex w-full items-center gap-1">
                        <input
                          {...register("phone.emergency", {
                            required: "Please fill up",
                            pattern: {
                              message: "Must be number",
                              value: /^[0-9]*$/,
                            },
                          })}
                          type="text"
                          placeholder="ຕື່ມເບີໂທຕິດຕໍ່ສຸກເສີນ"
                          className={textInputStyle + " flex-grow"}
                        />
                        <select
                          {...register("phone.relationship")}
                          className={selectInputStyle + " !w-fit"}
                        >
                          {relationships.map((ele) => (
                            <option key={ele}>{ele}</option>
                          ))}
                        </select>
                        <ErrorMessage
                          styling="mt-0 sm:text-md"
                          error={errors?.phone?.emergency}
                        />
                      </div>
                      {/* VISA */}
                      <div className="mt-5 flex items-center gap-2">
                        <div>
                          <label className={mainLabelStyle}>Visa:</label>
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              {...register("visa.from")}
                              type="date"
                              placeholder="Issue date"
                              className={textInputStyle}
                            />

                            <input
                              {...register("visa.to")}
                              type="date"
                              placeholder="Expired date"
                              className={textInputStyle}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={mainLabelStyle}>Link FaceBook:</label>

                  <div className="flex items-center gap-2">
                    <input
                      {...register("facebookUrl")}
                      type="text"
                      placeholder="Link FaceBook"
                      className={textInputStyle}
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <div>
                      <label className={mainLabelStyle}>Passport:</label>
                      <div className="flex flex-col items-start gap-3">
                        <div className="space-y-3">
                          <input
                            {...register("passport.passportNo", {
                              required: "Please fill up",
                            })}
                            type="text"
                            placeholder="Passport Number"
                            className={textInputStyle}
                          />

                          <input
                            {...register("passport.expired", {
                              required: "Please enter date",
                            })}
                            type="date"
                            placeholder="Expired Date"
                            className={textInputStyle}
                          />
                        </div>
                        <div className="flex w-full flex-col items-start justify-center">
                          <label className={mainLabelStyle}>ຮູບ</label>
                          <label
                            htmlFor="dropzone-file"
                            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="">Click to upload</span> or
                                drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add more input fields for other student information */}
              </div>
              <div className="mt-10 flex justify-end gap-5">
                {status === "loading" ? (
                  <>
                    <button className="btn btn-wide">
                      <span className="loading loading-spinner"></span>
                      loading
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      className={`btn btn-primary btn-wide text-white`}
                    >
                      ຕົກລົງ
                    </button>
                    <button
                      onClick={handleClear}
                      type="button"
                      className={`btn btn-secondary btn-wide text-white`}
                    >
                      ຍົກເລີກ
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudent;
