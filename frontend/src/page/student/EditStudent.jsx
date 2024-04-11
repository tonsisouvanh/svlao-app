import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  degreeList,
  provinceList,
  roleList,
  statusList,
} from "../../data/data";
import { getYearOptions } from "../../utils/utils";
import { getUserById } from "../../feature/user/SingleUserSlice";
import { useParams } from "react-router-dom";
import { updateUser, userReset } from "../../feature/user/UserSlice";
import altImage from "../../assets/img/profile.png";
import ResetPasswordModal from "../../components/modal/ResetPasswordModal";
import Spinner from "../../components/ui/Spinner";
import { AiFillEye, AiFillFileImage } from "react-icons/ai";
import ImageUpload from "../../components/input/ImageUpload";
const inputStyle = "input input-bordered w-full text-base-content/80";

const EditStudent = () => {
  const [base64, setBase64] = useState(null);
  const [uploadImageToggle, setuploadImageToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const yearOptions = getYearOptions();

  //state
  const [toggleEdit, setToggleEdit] = useState(false);

  // Slice
  const {
    singleUser,
    status: singleUserStatus,
    error,
  } = useSelector((state) => state.singleUser);
  const { status: userStatus, error: userError } = useSelector(
    (state) => state.user,
  );
  const { universities } = useSelector((state) => state.university);
  const { residenceAddresses } = useSelector((state) => state.residenceAddress);
  const { majors } = useSelector((state) => state.major);
  // react hook form
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: { singleUser },
  });

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
    setValue("university.universityId", university._id);
    setValue("university.shortcut", university.shortcut);
  };
  const handleSelectResidenceAddress = (value) => {
    const residenceAddress = residenceAddresses.find(
      (d) => d.location === value,
    );
    setValue("residenceAddress.address", residenceAddress.address);
  };

  useEffect(() => {
    if (userStatus.update === "succeeded") {
      toast.success("Update Successfully");
      dispatch(userReset());
    } else if (userStatus.update === "failed") {
      toast.error(userError);
      dispatch(userReset());
    }
  }, [userStatus.update, dispatch, userError]);

  const handleEditSubmit = (data) => {
    if (data) {
      const addImage = base64 ? [base64] : null;
      const formattedData = {
        ...data,
        profileImg: addImage ? addImage : singleUser.profileImg,
      };
      dispatch(updateUser({ ...formattedData }));
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  const replaceImage = (error) => {
    error.target.src = altImage;
  };

  useEffect(() => {
    if (userStatus.reset === "succeeded") {
      toast.success("Reset Successfully");
      dispatch(userReset());
      reset({});
    } else if (userStatus.reset === "failed") {
      toast.error(error);
      dispatch(userReset());
    }
  }, [userStatus.reset, dispatch, error, reset]);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleUserStatus.fetchOne === "succeeded") {
      reset(singleUser);
    } else if (singleUserStatus.fetchOne === "failed") {
      toast.error(error);
    }
  }, [singleUserStatus.fetchOne, reset, singleUser, error]);
  return (
    <>
      {isModalOpen && (
        <ResetPasswordModal
          title={"Reset user password"}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userData={{
            emailAddress: singleUser.emailAddress,
            id: singleUser._id,
          }}
        />
      )}
      <section className="relative">
        {singleUser && userStatus.update !== "loading" ? (
          <div className="container mx-auto px-5 py-14">
            <div className="mb-12 flex w-full flex-col text-center">
              <h1 className="title-font m:text-3xl mb-4 text-2xl font-medium text-base-content">
                ຂໍ້ມູນນັກຮຽນ
              </h1>
              <div>
                <div className="avatar">
                  <div className=" w-48 rounded-full">
                    {singleUser?.profileImg ? (
                      <img
                        src={singleUser?.profileImg}
                        alt={singleUser.profileImg}
                        onError={(error) => replaceImage(error, altImage)}
                      />
                    ) : (
                      <BiUserCircle className="h-full w-full text-primary" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto">
              <p className="label-text mb-2 font-semibold">{singleUser._id}</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-neutral btn-outline btn-sm"
              >
                Reset password
              </button>

              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <div className="flex w-[30rem] items-center gap-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className={`label-text text-lg font-semibold `}>
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
                  <label className="form-control w-full">
                    <div className="label">
                      <span className={`label-text text-lg font-semibold `}>
                        Role
                      </span>
                    </div>
                    <select
                      {...register("role", {})}
                      className={`select select-bordered w-full`}
                    >
                      {roleList.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        English Firstname
                      </span>
                    </div>
                    <input
                      {...register("fullname.englishFirstname", {})}
                      type="text"
                      // placeholder="Enter English Firstname"
                      className={inputStyle + "input-bordered"}
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
                      // placeholder="Enter Nickname"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Lao Name
                      </span>
                    </div>
                    <input
                      {...register("fullname.laoName", {})}
                      type="text"
                      // placeholder="Enter Lao Name"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        English Lastname
                      </span>
                    </div>
                    <input
                      {...register("fullname.englishLastname", {})}
                      type="text"
                      // placeholder="Enter English Lastname"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        University
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
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
                      // placeholder="Enter Phone Number"
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
                      // placeholder="Enter Emergency"
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
                      // placeholder="Enter Relationship"
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
                      // placeholder="Enter Visa From"
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
                      // placeholder="Enter Visa To"
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
                      // placeholder="Enter Passport No"
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
                      // placeholder="Enter Passport Expired"
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
                      // placeholder="Enter Student ID"
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
                      // placeholder="Enter Date of Birth"
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
                      // placeholder="Enter Facebook URL"
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
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Email Address
                      </span>
                    </div>
                    <input
                      {...register("emailAddress", {})}
                      type="text"
                      // placeholder="Enter Email Address"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-full p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-lg font-semibold">
                        Upload your image:
                      </span>
                    </div>
                    {base64 ? (
                      <div className="avatar">
                        <div className="w-64 rounded">
                          <button
                            type="button"
                            className="btn btn-neutral btn-xs absolute left-2 top-2"
                          >
                            <AiFillEye />
                          </button>
                          <img
                            src={base64}
                            alt={singleUser?.englishFirstname || "image"}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        {!uploadImageToggle && (
                          <div className="avatar">
                            <div className="w-64 rounded">
                              <img
                                src={singleUser?.profileImg}
                                alt={singleUser?.englishFirstname || "image"}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {uploadImageToggle && <ImageUpload setBase64={setBase64} />}
                  </label>
                  <button
                    type="button"
                    onClick={() => setuploadImageToggle(!uploadImageToggle)}
                    className="btn btn-outline btn-sm mt-4"
                  >
                    <AiFillFileImage />
                    {uploadImageToggle ? "Close" : "Upload"}
                  </button>
                </div>
                <div className="w-full space-x-4 p-2">
                  {!toggleEdit && (
                    <button
                      type="button"
                      onClick={() => setToggleEdit(true)}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  )}
                  {toggleEdit && (
                    <>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                          userStatus.update === "loading" ? true : false
                        }
                      >
                        {userStatus.update === "loading" ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Submit"
                        )}
                      </button>
                      <button
                        onClick={() => setToggleEdit(false)}
                        type="button"
                        className="btn btn-error btn-outline"
                      >
                        Cancel
                      </button>
                    </>
                  )}
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

export default EditStudent;
