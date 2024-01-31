import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import {
  degreeList,
  majorList,
  perminentAddressList,
  residenceAddressList,
  statusList,
} from "../data/data";
import { getYearOptions } from "../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { createStudent, userReset } from "../feature/user/UserSlice";
import { listUniversity } from "../feature/globalData/UniversitySlice";
import altImage from "../assets/img/profile.png";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorMessage from "../components/typography/ErrorMessage";
const inputStyle = "input input-bordered w-full text-base-content/80";

const AddStudent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const yearOptions = getYearOptions();

  const { createStatus, error: userError } = useSelector((state) => state.user);
  const { universities } = useSelector((state) => state.university);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    // defaultValues: {
    //   fullname: {
    //     laoName: "ນັກຮຽນ ທຸງອິນດາຫຼາຍ",
    //     englishFirstname: "John",
    //     englishLastname: "Doe",
    //     nickName: "Johnny",
    //   },
    //   studentId: "2023001",
    //   dob: "2000-01-01",
    //   gender: "Male",
    //   perminentAddress: "123 Main Street, City, Country",
    //   university: {
    //     laoName: "ວິສາຂະອິນ",
    //     vietName: "Đại học Sư phạm",
    //     englishName: "University of Education",
    //     shortcut: "UED",
    //   },
    //   major: {
    //     laoMajor: "ວິສາຂະອິນ",
    //     vietMajor: "Sư phạm Toán",
    //   },
    //   degree: {
    //     laoDegree: "ປະລິນຍາຕີ",
    //     vietDegree: "Cao Đẳng",
    //   },
    //   scholarship: {
    //     type: "ລາງວັນ",
    //     scholarshipLao: "ລາງວັນທະນາ",
    //     scholarshipVn: "Học bổng toàn phần",
    //     scholarshipUniversity: "Đại học Sư phạm",
    //   },
    //   duration: {
    //     from: "2022-09-01",
    //     to: "2026-05-31",
    //   },
    //   phone: {
    //     phoneNumber: "123456789",
    //     emergency: "987654321",
    //     relationship: "Family",
    //   },
    //   facebookUrl: "https://www.facebook.com/johndoe",
    //   visa: {
    //     from: "2022-01-01",
    //     to: "2023-01-01",
    //   },
    //   passport: {
    //     passportNo: "ABC123456",
    //     expired: "2025-01-01",
    //     img: "https://example.com/passport-image.jpg",
    //   },
    //   profileImg: "https://example.com/profile-image.jpg",
    //   residenceAddress: "456 Second Street, City, Country",
    //   userStatus: "Active",
    //   userId: "user123",
    //   emailAddress: "user1@example.com",
    // },
  });

  const handleSelectDegree = (value) => {
    const vietDegree = degreeList.find((d) => d.laoDegree === value);
    setValue("degree.vietDegree", vietDegree.vietDegree);
  };
  const handleSelectMajor = (value) => {
    const major = majorList.find((d) => d.laoMajor === value);
    setValue("major.vietMajor", major.vietMajor);
  };
  const handleSelectUniversity = (value) => {
    const university = universities.find((d) => d.shortcut === value);
    setValue("university", university);
  };
  const handleSelectResidenceAddress = (value) => {
    const residenceAddress = residenceAddressList.find(
      (d) => d.location === value,
    );
    setValue("residenceAddress.address", residenceAddress.address);
  };
  useEffect(() => {
    dispatch(listUniversity());
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Update Successfully");
      dispatch(userReset());
      reset({});
      navigate(-1);
    } else if (createStatus === "failed") {
      toast.error(userError);
      dispatch(userReset());
    }
  }, [createStatus, dispatch, userError, navigate, reset]);

  const handleEditSubmit = (data) => {
    if (data) {
      const confirmed = window.confirm(
        "Are you sure you want to update the user?",
      );
      if (confirmed) {
        dispatch(createStudent({ ...data }));
      } else {
        console.log("Update canceled");
      }
    } else {
      toast.warning("Input data not valid");
    }
  };
  // const replaceImage = (error) => {
  //   error.target.src = altImage;
  // };

  return (
    <>
      <section className="relative">
        {createStatus !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <Breadcrumbs pathname={pathname} />

              <h1 className="title-font m:text-3xl mb-4 text-2xl font-medium">
                ຂໍ້ມູນນັກຮຽນ
              </h1>
              <div>
                <div className="avatar">
                  <img src={altImage} alt="" />
                </div>
              </div>
            </div>
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex flex-wrap items-center justify-center"
              >
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text font-semibold">
                        Email Address
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.emailAddress}
                      />
                    </div>
                    <input
                      {...register("emailAddress", {
                        required: "Email required",
                      })}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text font-semibold">
                        Password
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.password}
                      />
                    </div>
                    <input
                      {...register("password", {
                        required: "Password required",
                      })}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className={`label-text font-semibold `}>
                        Status
                      </span>
                    </div>
                    <select
                      {...register("userStatus", {})}
                      className={`select select-bordered w-full`}
                    >
                      {statusList.map((item, index) => (
                        <option key={index} value={item.status}>
                          {item.status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Firstname
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.fullname?.englishFirstname?.message}
                      />
                    </div>
                    <input
                      {...register("fullname.englishFirstname", {
                        required: "Field required",
                      })}
                      type="text"
                      className={inputStyle + "input-bordered"}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Lastname<span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.fullname?.englishLastname?.message}
                      />
                    </div>
                    <input
                      {...register("fullname.englishLastname", {
                        required: "Field required",
                      })}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Lao Name<span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.fullname?.laoName}
                      />
                    </div>
                    <input
                      {...register("fullname.laoName", {
                        required: "Field required",
                      })}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">Nickname</span>
                    </div>
                    <input
                      {...register("fullname.nickName", {})}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>

                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        University Shortcut
                      </span>
                    </div>
                    <select
                      {...register("university.shortcut", {})}
                      onChange={(e) => handleSelectUniversity(e.target.value)}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {universities.map((item, index) => (
                        <option key={index} value={item.shortcut}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Duration (From)
                      </span>
                    </div>
                    <select
                      {...register("duration.from", {})}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Duration (To)
                      </span>
                    </div>
                    <select
                      {...register("duration.to", {})}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Phone Number
                      </span>
                    </div>
                    <input
                      {...register("phone.phoneNumber", {})}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Emergency
                      </span>
                    </div>
                    <input
                      {...register("phone.emergency", {})}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Relationship
                      </span>
                    </div>
                    <input
                      {...register("phone.relationship", {})}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>

                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Lao Degree
                      </span>
                    </div>
                    <select
                      {...register("degree.laoDegree", {})}
                      onChange={(e) => handleSelectDegree(e.target.value)}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {degreeList.map((item, index) => (
                        <option key={index} value={item.laoDegree}>
                          {item.laoDegree}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Visa From
                      </span>
                    </div>
                    <input
                      {...register("visa.from", {})}
                      type="date"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">Visa To</span>
                    </div>
                    <input
                      {...register("visa.to", {})}
                      type="date"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Residence Address
                      </span>
                    </div>
                    <select
                      {...register("residenceAddress.location", {})}
                      onChange={(e) =>
                        handleSelectResidenceAddress(e.target.value)
                      }
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {residenceAddressList.map((item, index) => (
                        <option key={index} value={item.location}>
                          {item.location}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Passport No
                      </span>
                    </div>
                    <input
                      {...register("passport.passportNo", {})}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>

                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Passport Expired
                      </span>
                    </div>
                    <input
                      {...register("passport.expired", {})}
                      type="date"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Lao Major
                      </span>
                    </div>
                    <select
                      {...register("major.laoMajor", {})}
                      onChange={(e) => handleSelectMajor(e.target.value)}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {majorList.map((item, index) => (
                        <option key={index} value={item.laoMajor}>
                          {item.laoMajor}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Student ID
                      </span>
                    </div>
                    <input
                      {...register("studentId", {})}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Date of Birth
                      </span>
                    </div>
                    <input
                      {...register("dob", {})}
                      type="date"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">Gender</span>
                    </div>
                    <select
                      {...register("gender", {})}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"other"}>Other</option>
                    </select>
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Facebook URL
                      </span>
                    </div>
                    <input
                      {...register("facebookUrl", {})}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Permanent Address
                      </span>
                    </div>
                    <select
                      {...register("perminentAddress", {})}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {perminentAddressList.map((item, index) => (
                        <option key={index} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="w-full space-x-4 p-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={createStatus === "loading" ? true : false}
                  >
                    {createStatus === "loading" ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </section>
    </>
  );
};

export default AddStudent;
