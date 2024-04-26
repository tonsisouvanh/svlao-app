import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/ui/Spinner";
import { degreeList, provinceList, statusList } from "../../data/data";
import { getYearOptions } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { createStudent, userReset } from "../../feature/user/UserSlice";
import ErrorMessage from "../../components/typography/ErrorMessage";
import ImageUpload from "../../components/input/ImageUpload";
import PageHeading from "../../components/PageHeading";
import { FaSave } from "react-icons/fa";
import { inputStyle, selectStyle } from "../../style/global.value";


const AddStudent = () => {
  const [base64, setBase64] = useState(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (status.create === "succeeded") {
      toast.success("Update Successfully");
      reset({});
      navigate(-1);
    } else if (status.create === "failed") {
      toast.error(userError);
    }
    return () => {
      dispatch(userReset());
    };
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
          <div className="container mx-auto px-5 py-8">
            <div className="mb-12 flex w-full flex-col text-center">
              <PageHeading title="ເພີ່ມຂໍ້ມູນນັກຮຽນ" />
              <div className="flex items-center justify-center gap-4">
                <ImageUpload setBase64={setBase64} />
                {base64 && (
                  <img
                    className="h-36 w-36 rounded-md object-cover"
                    src={base64}
                  ></img>
                )}
              </div>
            </div>
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className={`label-text text-lg font-semibold`}>
                        Status
                      </span>
                    </div>
                    <select
                      {...register("userStatus", {})}
                      className={selectStyle}
                    >
                      {statusList.map((item, index) => (
                        <option key={index} value={item.status}>
                          {item.status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Nickname
                      </span>
                    </div>
                    <input
                      {...register("fullname.nickName", {})}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>

                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        University Shortcut
                      </span>
                    </div>
                    <select
                      {...register("university.shortcut", {})}
                      onChange={(e) => handleSelectUniversity(e.target.value)}
                      className={selectStyle}
                    >
                      {universities.map((item, index) => (
                        <option key={index} value={item.shortcut}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Duration (From)
                      </span>
                    </div>
                    <select
                      {...register("duration.from", {})}
                      className={selectStyle}
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Duration (To)
                      </span>
                    </div>
                    <select
                      {...register("duration.to", {})}
                      className={selectStyle}
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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

                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Lao Degree
                      </span>
                    </div>
                    <select
                      {...register("degree.laoDegree", {})}
                      onChange={(e) => handleSelectDegree(e.target.value)}
                      className={selectStyle}
                    >
                      {degreeList.map((item, index) => (
                        <option key={index} value={item.laoDegree}>
                          {item.laoDegree}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Visa To
                      </span>
                    </div>
                    <input
                      {...register("visa.to", {})}
                      type="date"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Residence Address
                      </span>
                    </div>
                    <select
                      {...register("residenceAddress.location", {})}
                      onChange={(e) =>
                        handleSelectResidenceAddress(e.target.value)
                      }
                      className={selectStyle}
                    >
                      {residenceAddresses.map((item, index) => (
                        <option key={index} value={item.location}>
                          {item.location}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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

                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Lao Major
                      </span>
                    </div>
                    <select
                      {...register("major.laoMajor", {})}
                      onChange={(e) => handleSelectMajor(e.target.value)}
                      className={selectStyle}
                    >
                      {majors.map((item, index) => (
                        <option key={index} value={item.laoMajor}>
                          {item.laoMajor}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Gender
                      </span>
                    </div>
                    <select {...register("gender", {})} className={selectStyle}>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"other"}>Other</option>
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Permanent Address
                      </span>
                    </div>
                    <select
                      {...register("province", {})}
                      className={selectStyle}
                    >
                      {provinceList.map((item, index) => (
                        <option key={index} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="flex w-full justify-center space-x-4 p-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-wide"
                    disabled={status.create === "loading" ? true : false}
                  >
                    <FaSave />
                    {status.create === "loading" ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "ບັນທຶກ"
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
