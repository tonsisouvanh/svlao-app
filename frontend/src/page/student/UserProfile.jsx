import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { degreeList, provinceList } from "../../data/data";
import { authReset, updateUserProfile } from "../../feature/auth/AuthSlice";
import { getYearOptions, replaceImage } from "../../utils/utils";
import Spinner from "../../components/ui/Spinner";
import altImage from "../../assets/img/profile.png";
import ImageUpload from "../../components/input/ImageUpload";
import { inputStyle, selectStyle } from "../../style/global.value";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import PageHeading from "../../components/PageHeading";
import { getUserProfile } from "../../feature/user/UserSlice";
import Image from "../../components/Image";

const UserProfile = () => {
  const [base64, setBase64] = useState(null);
  const [uploadImageToggle, setuploadImageToggle] = useState(false);
  const yearOptions = getYearOptions();
  const dispatch = useDispatch();
  const [toggleEdit, setToggleEdit] = useState(false);

  const { users, status, error } = useSelector((state) => state.user);
  const { universities } = useSelector((state) => state.university);
  const { majors: majorList } = useSelector((state) => state.major);
  const { residenceAddresses: residenceAddressList } = useSelector(
    (state) => state.residenceAddress,
  );

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: users[0],
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
    setValue("university.universityId", university._id);
    setValue("university.shortcut", university.shortcut);
  };
  const handleSelectResidenceAddress = (value) => {
    const residenceAddress = residenceAddressList.find(
      (d) => d.location === value,
    );
    setValue("residenceAddress.address", residenceAddress.address);
  };

  useEffect(() => {
    reset(users[0]);
  }, [users, reset]);

  useEffect(() => {
    if (status.setInfo === "succeeded") {
      toast.success("Update Successfully");
      dispatch(authReset());
    } else if (status.setInfo === "failed") {
      toast.error(error);
      dispatch(authReset());
    }
  }, [status.setInfo, dispatch, error]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleEditSubmit = (data) => {
    if (data) {
      const addImage = base64 ? [base64] : null;
      const formattedData = {
        ...data,
        profileImg: addImage ? addImage : users[0].profileImg,
      };
      dispatch(updateUserProfile({ ...formattedData }));
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  if (status.setInfo === "loading") return <Spinner />;
  return (
    <section className="relative">
      {users[0] && status.setInfo !== "loading" ? (
        <div className="container mx-auto px-5 py-12">
          <div className="mb-12 flex w-full flex-col text-center">
            <PageHeading title="ຂໍ້ມູນສ່ວນໂຕ" />
            {/* Upload picture */}
            <div className="flex items-center justify-center gap-2">
              {uploadImageToggle && <ImageUpload setBase64={setBase64} />}
              <div className="avatar relative">
                {base64 ? (
                  <div className=" w-48 rounded-full">
                    <img
                      src={base64}
                      alt={"avatar"}
                      onError={(error) => replaceImage(error, altImage)}
                    />
                  </div>
                ) : (
                  <div className=" w-48 rounded-full">
                    {users[0]?.profileImg ? (
                      <Image image={users[0]?.profileImg} />
                    ) : (
                      <BiUserCircle className="h-full w-full text-primary" />
                    )}
                  </div>
                )}
                <button
                  onClick={() => setuploadImageToggle(!uploadImageToggle)}
                  className="btn btn-ghost btn-xs absolute bottom-0 right-0"
                >
                  <BsPencilSquare size={18} className="" />
                </button>
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
                    {...register("fullname.englishFirstname", {
                      disabled: toggleEdit ? false : true,
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
                      English Lastname
                    </span>
                  </div>
                  <input
                    {...register("fullname.englishLastname", {
                      disabled: toggleEdit ? false : true,
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
                    {...register("fullname.nickName", {
                      disabled: toggleEdit ? false : true,
                    })}
                    type="text"
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
                    {...register("fullname.laoName", {
                      disabled: toggleEdit ? false : true,
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
                      University Shortcut
                    </span>
                  </div>
                  <select
                    {...register("university.shortcut", {
                      disabled: toggleEdit ? false : true,
                    })}
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
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Duration (From)
                    </span>
                  </div>
                  <select
                    {...register("duration.from", {
                      disabled: toggleEdit ? false : true,
                    })}
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
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Duration (To)
                    </span>
                  </div>
                  <select
                    {...register("duration.to", {
                      disabled: toggleEdit ? false : true,
                    })}
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
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Phone Number
                    </span>
                  </div>
                  <input
                    {...register("phone.phoneNumber", {
                      disabled: toggleEdit ? false : true,
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Emergency</span>
                  </div>
                  <input
                    {...register("phone.emergency", {
                      disabled: toggleEdit ? false : true,
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
                      Relationship
                    </span>
                  </div>
                  <input
                    {...register("phone.relationship", {
                      disabled: toggleEdit ? false : true,
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>

              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Lao Degree</span>
                  </div>
                  <select
                    {...register("degree.laoDegree", {
                      disabled: toggleEdit ? false : true,
                    })}
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
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Visa From</span>
                  </div>
                  <input
                    {...register("visa.from", {
                      disabled: toggleEdit ? false : true,
                    })}
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
                    {...register("visa.to", {
                      disabled: toggleEdit ? false : true,
                    })}
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
                    {...register("residenceAddress.location", {
                      disabled: toggleEdit ? false : true,
                    })}
                    onChange={(e) =>
                      handleSelectResidenceAddress(e.target.value)
                    }
                    className={selectStyle}
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
                    {...register("passport.passportNo", {
                      disabled: toggleEdit ? false : true,
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
                      Passport Expired
                    </span>
                  </div>
                  <input
                    {...register("passport.expired", {
                      disabled: toggleEdit ? false : true,
                    })}
                    type="date"
                    className={inputStyle}
                  />
                </label>
              </div>
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Lao Major</span>
                  </div>
                  <select
                    {...register("major.laoMajor", {
                      disabled: toggleEdit ? false : true,
                    })}
                    onChange={(e) => handleSelectMajor(e.target.value)}
                    className={selectStyle}
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
                    <span className="label-text font-semibold">Student ID</span>
                  </div>
                  <input
                    {...register("studentId", {
                      disabled: toggleEdit ? false : true,
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
                      Date of Birth
                    </span>
                  </div>
                  <input
                    {...register("dob", {
                      disabled: toggleEdit ? false : true,
                    })}
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
                    {...register("gender", {
                      disabled: toggleEdit ? false : true,
                    })}
                    className={selectStyle}
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
                    {...register("facebookUrl", {
                      disabled: toggleEdit ? false : true,
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
                      Permanent Address
                    </span>
                  </div>
                  <select
                    {...register("province", {
                      disabled: toggleEdit ? false : true,
                    })}
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

              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Email Address
                    </span>
                  </div>
                  <input
                    {...register("emailAddress", {
                      disabled: toggleEdit ? false : true,
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>
              {/* Submit buttons */}
              <div className="flex w-full items-center justify-center space-x-4 p-2">
                {!toggleEdit && (
                  <button
                    type="button"
                    onClick={() => setToggleEdit(true)}
                    className="btn btn-primary btn-wide"
                  >
                    <FaPencilAlt />
                    ແກ້ໄຂ
                  </button>
                )}
                {toggleEdit && (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={users[0].update === "loading" ? true : false}
                    >
                      <FaSave />
                      {users[0].update === "loading" ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "ບັນທຶກ"
                      )}
                    </button>
                    <button
                      onClick={() => setToggleEdit(false)}
                      type="button"
                      className="btn btn-error btn-outline"
                    >
                      ຍົກເລີກ
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
  );
};

export default UserProfile;
