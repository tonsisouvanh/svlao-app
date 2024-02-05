import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";
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
import { getUserById } from "../feature/user/SingleUserSlice";
import { useLocation, useParams } from "react-router-dom";
import { updateUser, userReset } from "../feature/user/UserSlice";
import { listUniversity } from "../feature/globalData/UniversitySlice";
import altImage from "../assets/img/profile.png";
import Breadcrumbs from "../components/Breadcrumbs";
import ResetPasswordModal from "../components/modal/ResetPasswordModal";
const inputStyle = "input input-bordered w-full text-base-content/80";

const EditStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const yearOptions = getYearOptions();

  const { singleUser, status, error } = useSelector(
    (state) => state.singleUser,
  );
  const {
    updateStatus,
    createStatus,
    error: userError,
  } = useSelector((state) => state.user);
  const { universities } = useSelector((state) => state.university);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: singleUser });

  const [toggleEdit, setToggleEdit] = useState(false);
  // const dispatch = useDispatch((state) => state.user);

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
    if (updateStatus === "succeeded") {
      toast.success("Update Successfully");
      dispatch(userReset());
    } else if (updateStatus === "failed") {
      toast.error(userError);
      dispatch(userReset());
    }
  }, [updateStatus, dispatch, userError]);

  const handleEditSubmit = (data) => {
    if (data) {
      dispatch(updateUser(data));
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  const replaceImage = (error) => {
    error.target.src = altImage;
  };

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Reset Successfully");
      dispatch(userReset());
      reset({});
    } else if (createStatus === "failed") {
      toast.error(error);
      dispatch(userReset());
    }
  }, [createStatus, dispatch, error, reset]);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === "succeeded") {
      reset(singleUser);
    } else if (status === "failed") {
      toast.error(error);
    }
  }, [status, reset, singleUser, error]);
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
        {singleUser && status !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <Breadcrumbs pathname={pathname} />

              <h1 className="title-font m:text-3xl mb-4 text-2xl font-medium">
                ຂໍ້ມູນນັກຮຽນ
              </h1>
              <div>
                <div className="avatar">
                  <div className="w-48 rounded">
                    {singleUser?.profileImg ? (
                      <img
                        src={singleUser?.profileImg}
                        alt={singleUser.profileImg}
                        onError={replaceImage}
                      />
                    ) : (
                      <BiUserCircle className="h-full w-full text-primary" />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p>{singleUser._id}</p>
              </div>
            </div>
            <div className="mx-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-neutral btn-outline btn-sm"
              >
                Reset password
              </button>

              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex flex-wrap items-center justify-center"
              >
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
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">Nickname</span>
                    </div>
                    <input
                      {...register("fullname.nickName", {})}
                      type="text"
                      // placeholder="Enter Nickname"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">Lao Name</span>
                    </div>
                    <input
                      {...register("fullname.laoName", {})}
                      type="text"
                      // placeholder="Enter Lao Name"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
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
                      // placeholder="Enter Phone Number"
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
                      // placeholder="Enter Emergency"
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
                      // placeholder="Enter Relationship"
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
                      // placeholder="Enter Visa From"
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
                      // placeholder="Enter Visa To"
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
                      // placeholder="Enter Passport No"
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
                      // placeholder="Enter Passport Expired"
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
                      // placeholder="Enter Student ID"
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
                      // placeholder="Enter Date of Birth"
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
                      // placeholder="Enter Facebook URL"
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
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
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
                        disabled={updateStatus === "loading" ? true : false}
                      >
                        {updateStatus === "loading" ? (
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
