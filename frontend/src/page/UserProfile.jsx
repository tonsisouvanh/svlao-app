import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { listUniversity } from "../feature/globalData/UniversitySlice";
import {
  degreeList,
  majorList,
  perminentAddressList,
  residenceAddressList,
} from "../data/data";
import { updateUserProfile, authReset } from "../feature/auth/AuthSlice";
import Spinner from "../components/ui/Spinner";
import { BiUserCircle } from "react-icons/bi";
const UserProfile = () => {
  const {
    auth: studentData,
    status: authStatus,
    error: authError,
  } = useSelector((state) => state.auth);
  const { universities, status: universityStatus } = useSelector(
    (state) => state.university,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: studentData });

  const [toggleEdit, setToggleEdit] = useState(false);
  const dispatch = useDispatch((state) => state.user);

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
    if (authStatus === "succeeded") {
      toast.success("Update Successfully");
    } else if (authStatus === "failed") toast.error(authError);
    dispatch(authReset());
  }, [authStatus, authError, dispatch]);

  const handleEditSubmit = (data) => {
    if (data) {
      dispatch(updateUserProfile(data));
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };
  return (
    <>
      <section className="relative">
        {studentData && authStatus !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <h1 className="title-font m:text-3xl mb-4 text-2xl font-medium">
                User Info
              </h1>
              <div>
                <div className="avatar">
                  <div className="w-48 rounded">
                    {studentData?.profileImg ? (
                      <img src={studentData?.profileImg} />
                    ) : (
                      <BiUserCircle className="h-full w-full text-primary" />
                    )}
                  </div>
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
                    <div className="label">
                      <span className="label-text font-semibold">
                        English Firstname
                      </span>
                    </div>
                    <input
                      {...register("fullname.englishFirstname", {})}
                      type="text"
                      // placeholder="Enter English Firstname"
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                    <input
                      {...register("duration.from", {})}
                      type="text"
                      // placeholder="Enter Duration (From)"
                      className="input input-bordered w-full text-base-content/80"
                    />
                  </label>
                </div>
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Duration (To)
                      </span>
                    </div>
                    <input
                      {...register("duration.to", {})}
                      type="text"
                      // placeholder="Enter Duration (To)"
                      className="input input-bordered w-full text-base-content/80"
                    />
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
                    />
                  </label>
                </div>
                {/* <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Viet Major</span>
                  </div>
                  <input
                    {...register("major.vietMajor", {})}
                    type="text"
                    // placeholder="Enter Viet Major"
                    className="input input-bordered w-full text-base-content/80"
                  />
                </label>
              </div> */}
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                      className="input input-bordered w-full text-base-content/80"
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
                {/* <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Profile Image
                    </span>
                  </div>
                  <input
                    {...register("profileImg", {})}
                    type="text"
                    // placeholder="Enter Profile Image URL"
                    className="input input-bordered w-full text-base-content/80"
                  />
                </label>
              </div> */}
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
                      className="input input-bordered w-full text-base-content/80"
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
                        disabled={authStatus === "loading" ? true : false}
                      >
                        {authStatus === "loading" ? (
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

export default UserProfile;
