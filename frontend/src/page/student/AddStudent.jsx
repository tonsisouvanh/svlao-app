import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/ui/Spinner";
import {
  degreeList,
  provinceList,
  statusList,
} from "../../data/data";
import { getYearOptions } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { createStudent, userReset } from "../../feature/user/UserSlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import ErrorMessage from "../../components/typography/ErrorMessage";
import altImage from "../../assets/img/profile.png";
import ImageUpload from "../../components/input/ImageUpload";
const inputStyle = "input input-bordered w-full text-base-content/80";

const AddStudent = () => {
  const [base64, setBase64] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const yearOptions = getYearOptions();

  const { status, error: userError } = useSelector((state) => state.user);
  const { universities } = useSelector((state) => state.university);
  const { residenceAddresses } = useSelector((state) => state.residenceAddress);
  const { majors } = useSelector((state) => state.major);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({});

  const handleSelectDegree = (value) => {
    const vietDegree = degreeList.find((d) => d.laoDegree === value);
    setValue("degree.vietDegree", vietDegree.vietDegree);
  };
  const handleSelectMajor = (value) => {
    const major = majors.find((d) => d.laoMajor === value);
    setValue("major.vietMajor", major.vietMajor);
  };
  const handleSelectUniversity = (value) => {
    const university = universities.find((d) => d.shortcut === value);
    setValue("university", university);
  };
  const handleSelectResidenceAddress = (value) => {
    const residenceAddress = residenceAddresses.find(
      (d) => d.location === value,
    );
    setValue("residenceAddress.address", residenceAddress.address);
  };
  const clearImage = () => {
    setBase64(null);
  };
  // useEffect(() => {
  //   dispatch(listUniversity());
  // }, [dispatch]);

  useEffect(() => {
    if (status.create === "succeeded") {
      toast.success("Update Successfully");
      dispatch(userReset());
      reset({});
      navigate(-1);
    } else if (status.create === "failed") {
      toast.error(userError);
      dispatch(userReset());
    }
  }, [status.create, dispatch, userError, navigate, reset]);

  const handleEditSubmit = (data) => {
    if (data) {
      const addImage = base64 ? [base64] : null;
      const formattedData = {
        ...data,
        profileImg: addImage ? addImage : [],
      };
      const confirmed = window.confirm(
        "Are you sure you want to update the user?",
      );
      if (confirmed) {
        dispatch(createStudent({ ...formattedData }));
      } else {
        console.log("Update canceled");
      }
    } else {
      toast.warning("Input data not valid");
    }
  };

  return (
    <>
      <section className="relative">
        {status.create !== "loading" ? (
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
                      <span className="label-text text-lg">
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
                      <span className="label-text text-lg">
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
                      <span className={`label-text text-lg`}>Status</span>
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
                      <span className="label-text text-lg">
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
                      <span className="label-text text-lg">
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
                      <span className="label-text text-lg">
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
                      <span className="label-text text-lg">Nickname</span>
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
                      <span className="label-text text-lg">
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
                      <span className="label-text text-lg">
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
                      <span className="label-text text-lg">Duration (To)</span>
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
                      <span className="label-text text-lg">Phone Number</span>
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
                      <span className="label-text text-lg">Emergency</span>
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
                      <span className="label-text text-lg">Relationship</span>
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
                      <span className="label-text text-lg">Lao Degree</span>
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
                      <span className="label-text text-lg">Visa From</span>
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
                      <span className="label-text text-lg">Visa To</span>
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
                      <span className="label-text text-lg">
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
                      {residenceAddresses.map((item, index) => (
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
                      <span className="label-text text-lg">Passport No</span>
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
                      <span className="label-text text-lg">
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
                      <span className="label-text text-lg">Lao Major</span>
                    </div>
                    <select
                      {...register("major.laoMajor", {})}
                      onChange={(e) => handleSelectMajor(e.target.value)}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {majors.map((item, index) => (
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
                      <span className="label-text text-lg">Student ID</span>
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
                      <span className="label-text text-lg">Date of Birth</span>
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
                      <span className="label-text text-lg">Gender</span>
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
                      <span className="label-text text-lg">Facebook URL</span>
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
                      <span className="label-text text-lg">
                        Permanent Address
                      </span>
                    </div>
                    <select
                      {...register("province", {})}
                      className={
                        "select select-bordered w-full text-base-content/80"
                      }
                    >
                      {provinceList.map((item, index) => (
                        <option key={index} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-full p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text text-lg">Upload Image</span>
                    </div>
                    {base64 ? (
                      <img src={base64} alt="Base64 Image" />
                    ) : (
                      <ImageUpload setBase64={setBase64} />
                    )}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={clearImage}
                  className="btn btn-error btn-outline btn-sm ml-10"
                >
                  Clear
                </button>
                <div className="w-full space-x-4 p-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status.create === "loading" ? true : false}
                  >
                    {status.create === "loading" ? (
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
