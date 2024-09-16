import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiUserCircle } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { degreeList, provinceList, roleList, statusList } from '../../data/data';
import { formatDate, getYearOptions } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import altImage from '../../assets/img/profile.png';
import ResetPasswordModal from '../../components/modal/ResetPasswordModal';
import Spinner from '../../components/ui/Spinner';
import { FaCopy, FaPencilAlt, FaSave } from 'react-icons/fa';
import PageHeading from '../../components/PageHeading';
import ImageUpload from '../../components/input/ImageUpload';
import { inputStyle, selectStyle } from '../../style/global.value';
import { useUser } from '../../hooks/useUser';
import ErrorLoadingData from '../../components/ui/ErrorLoadingData';
import { useUniversity } from '../../hooks/useUniversity';
import { useMajor } from '../../hooks/useMajor';
import { useResidenceAddress } from '../../hooks/useResidenceAddress';

const EditStudent = () => {
  const { id } = useParams();
  const [base64, setBase64] = useState(null);
  const { useGetUser, useUpdateUser } = useUser();
  const userUpdateMutate = useUpdateUser();
  const { data: singleUser, isLoading: isSingleUserLoading, error: isLoadingUserError } = useGetUser(id);

  const [uploadImageToggle, setuploadImageToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const yearOptions = getYearOptions();

  //state
  const [toggleEdit, setToggleEdit] = useState(false);

  const { useGetAllUniversities } = useUniversity();
  const { data: universities, isLoading: isUniversityLoading, error: isUniversityError } = useGetAllUniversities();

  const { useGetAllMajors } = useMajor();
  const { data: majors, isLoading: isMajorLoading, error: isMajorError } = useGetAllMajors();

  const { useGetAllResidenceAddresses } = useResidenceAddress();
  const {
    data: residenceAddresses,
    isLoading: isResidenceAddressLoading,
    error: isResidenceAddressError,
  } = useGetAllResidenceAddresses();

  // react hook form
  const { register, handleSubmit, setValue, reset } = useForm();

  const handleSelectDegree = (value) => {
    const vietDegree = degreeList.find((d) => d.laoDegree === value);
    setValue('degree.vietDegree', vietDegree.vietDegree);
  };
  const handleSelectMajor = (value) => {
    const major = majors.find((d) => d.laoMajor === value);
    setValue('major.vietMajor', major.vietMajor);
  };
  const handleSelectUniversity = (value) => {
    const university = universities.find((d) => d.shortcut === value);
    setValue('university.universityId', university._id);
    setValue('university.shortcut', university.shortcut);
  };
  const handleSelectResidenceAddress = (value) => {
    const residenceAddress = residenceAddresses.find((d) => d.location === value);
    setValue('residenceAddress.address', residenceAddress.address);
  };

  const handleEditSubmit = (data) => {
    const addImage = base64 ? [base64] : null;
    const formattedData = {
      ...data,
      dob: new Date(data.dob),
      visa: {
        from: new Date(data.visa.from),
        to: new Date(data.visa.to),
      },
      passport: {
        ...singleUser.passport,
        expired: new Date(singleUser?.passport.expired),
      },
      profileImg: addImage ? addImage : singleUser.profileImg,
    };
    userUpdateMutate.mutate({ id: singleUser._id, data: formattedData });
    setToggleEdit(false);
    setuploadImageToggle(false);
  };

  const replaceImage = (error) => {
    error.target.src = altImage;
  };

  useEffect(() => {
    if (singleUser) {
      reset({
        ...singleUser,
        dob: formatDate(singleUser?.dob),
        visa: {
          from: formatDate(singleUser?.visa.from),
          to: formatDate(singleUser?.visa.to),
        },
        passport: {
          ...singleUser.passport,
          expired: formatDate(singleUser?.passport.expired),
        },
      });
    }
  }, [reset, singleUser]);

  if (isSingleUserLoading) {
    return <Spinner />;
  }

  if (isLoadingUserError) {
    return <ErrorLoadingData />;
  }

  return (
    <>
      {isModalOpen && (
        <ResetPasswordModal
          title={'Reset user password'}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userData={{
            emailAddress: singleUser.emailAddress,
            id: singleUser._id,
          }}
        />
      )}
      <section className="relative">
        {singleUser ? (
          <div className="container mx-auto px-5 py-14">
            <div className="mb-12 flex w-full flex-col text-center">
              <PageHeading title="ຂໍ້ມູນນັກຮຽນ" />
              {/* Upload picture */}
              <div className="flex items-center justify-center gap-2">
                {uploadImageToggle && <ImageUpload setBase64={setBase64} />}
                <div className="avatar relative">
                  {base64 ? (
                    <div className=" w-48 rounded-full">
                      <img src={base64} alt={'avatar'} onError={(error) => replaceImage(error, altImage)} />
                    </div>
                  ) : (
                    <div className=" w-48 rounded-full">
                      {singleUser?.profileImg ? (
                        <img
                          src={singleUser?.profileImg}
                          alt={singleUser?.profileImg}
                          onError={(error) => replaceImage(error, altImage)}
                        />
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
                  <button
                    className="btn btn-ghost btn-xs absolute bottom-0 left-0"
                    onClick={() => {
                      navigator.clipboard.writeText(singleUser._id);
                    }}
                  >
                    <FaCopy size={18} className="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <div className="flex w-[30rem] items-center gap-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className={`label-text text-sm font-semibold `}>Status</span>
                    </div>
                    <select {...register('userStatus', {})} className={selectStyle}>
                      {statusList.map((item, index) => (
                        <option key={index} value={item.status}>
                          {item.status}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className={`label-text text-sm font-semibold `}>Role</span>
                    </div>
                    <select {...register('role', {})} className={selectStyle}>
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
                      <span className="label-text text-sm font-semibold">English Firstname</span>
                    </div>
                    <input
                      {...register('fullname.englishFirstname', {})}
                      type="text"
                      // placeholder="Enter English Firstname"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Nickname</span>
                    </div>
                    <input
                      {...register('fullname.nickName', {})}
                      type="text"
                      // placeholder="Enter Nickname"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Lao Name</span>
                    </div>
                    <input
                      {...register('fullname.laoName', {})}
                      type="text"
                      // placeholder="Enter Lao Name"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">English Lastname</span>
                    </div>
                    <input
                      {...register('fullname.englishLastname', {})}
                      type="text"
                      // placeholder="Enter English Lastname"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">University</span>
                    </div>
                    <select
                      {...register('university.shortcut', {})}
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
                      <span className="label-text text-sm font-semibold">Duration (From)</span>
                    </div>
                    <select {...register('duration.from', {})} className={selectStyle}>
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
                      <span className="label-text text-sm font-semibold">Duration (To)</span>
                    </div>
                    <select {...register('duration.to', {})} className={selectStyle}>
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
                      <span className="label-text text-sm font-semibold">Phone Number</span>
                    </div>
                    <input
                      {...register('phone.phoneNumber', {})}
                      type="text"
                      // placeholder="Enter Phone Number"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Emergency</span>
                    </div>
                    <input
                      {...register('phone.emergency', {})}
                      type="text"
                      // placeholder="Enter Emergency"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Relationship</span>
                    </div>
                    <input
                      {...register('phone.relationship', {})}
                      type="text"
                      // placeholder="Enter Relationship"
                      className={inputStyle}
                    />
                  </label>
                </div>

                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Lao Degree</span>
                    </div>
                    <select
                      {...register('degree.laoDegree', {})}
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
                      <span className="label-text text-sm font-semibold">Visa From</span>
                    </div>
                    <input
                      {...register('visa.from', {})}
                      type="date"
                      // placeholder="Enter Visa From"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Visa To</span>
                    </div>
                    <input
                      {...register('visa.to', {})}
                      type="date"
                      // placeholder="Enter Visa To"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Residence Address</span>
                    </div>
                    <select
                      {...register('residenceAddress.location', {})}
                      onChange={(e) => handleSelectResidenceAddress(e.target.value)}
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
                      <span className="label-text text-sm font-semibold">Passport No</span>
                    </div>
                    <input
                      {...register('passport.passportNo', {})}
                      type="text"
                      // placeholder="Enter Passport No"
                      className={inputStyle}
                    />
                  </label>
                </div>

                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Passport Expired</span>
                    </div>
                    <input
                      {...register('passport.expired', {})}
                      type="date"
                      // placeholder="Enter Passport Expired"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Lao Major</span>
                    </div>
                    <select
                      {...register('major.laoMajor', {})}
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
                      <span className="label-text text-sm font-semibold">Student ID</span>
                    </div>
                    <input
                      {...register('studentId', {})}
                      type="text"
                      // placeholder="Enter Student ID"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Date of Birth</span>
                    </div>
                    <input
                      {...register('dob', {})}
                      type="date"
                      // placeholder="Enter Date of Birth"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Gender</span>
                    </div>
                    <select {...register('gender', {})} className={selectStyle}>
                      <option value={'male'}>Male</option>
                      <option value={'female'}>Female</option>
                      <option value={'other'}>Other</option>
                    </select>
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Facebook URL</span>
                    </div>
                    <input
                      {...register('facebookUrl', {})}
                      type="text"
                      // placeholder="Enter Facebook URL"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[30rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Permanent Address</span>
                    </div>
                    <select {...register('province', {})} className={selectStyle}>
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
                      <span className="label-text text-sm font-semibold">Email Address</span>
                    </div>
                    <input
                      {...register('emailAddress', {})}
                      type="text"
                      // placeholder="Enter Email Address"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="flex w-full items-center justify-center space-x-4 p-2">
                  {!toggleEdit && (
                    <button type="button" onClick={() => setToggleEdit(true)} className="btn btn-primary btn-wide">
                      <FaPencilAlt />
                      ແກ້ໄຂ
                    </button>
                  )}
                  {toggleEdit && (
                    <>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={userUpdateMutate.isPending ? true : false}
                      >
                        <FaSave />
                        {userUpdateMutate.isPending ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          'ບັນທຶກ'
                        )}
                      </button>
                      <button onClick={() => setToggleEdit(false)} type="button" className="btn btn-error btn-outline">
                        ຍົກເລີກ
                      </button>
                    </>
                  )}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="btn btn-neutral btn-outline">
                    Reset password
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

export default EditStudent;
