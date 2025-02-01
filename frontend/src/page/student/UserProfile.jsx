import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../../components/ui/Spinner';
import { degreeList } from '../../data/data';
import { useMajor } from '../../hooks/useMajor';
import { useResidenceAddress } from '../../hooks/useResidenceAddress';
import { useUniversity } from '../../hooks/useUniversity';
import { useUser } from '../../hooks/useUser';
import { formatDate, getYearOptions } from '../../utils/utils';
import ComingSoon from '../ComingSoon';

const UserProfile = () => {
  const [base64, setBase64] = useState(null);
  const [uploadImageToggle, setuploadImageToggle] = useState(false);
  const yearOptions = getYearOptions();
  const [toggleEdit, setToggleEdit] = useState(false);

  const { useGetMe, useUpdateUserProfile } = useUser();
  const userUpdateMutate = useUpdateUserProfile();
  const { data: user, isLoading: isMeLoading } = useGetMe();
  const { useGetAllUniversities } = useUniversity();
  const { data: universities } = useGetAllUniversities();
  const { useGetAllMajors } = useMajor();
  const { data: majorList } = useGetAllMajors();
  const { useGetAllResidenceAddresses } = useResidenceAddress();
  const { data: residenceAddressList } = useGetAllResidenceAddresses();
  const { register, handleSubmit, setValue, reset } = useForm();

  const handleSelectDegree = (value) => {
    const vietDegree = degreeList.find((d) => d.laoDegree === value);
    setValue('degree.vietDegree', vietDegree.vietDegree);
  };
  const handleSelectMajor = (value) => {
    const major = majorList.find((d) => d.laoMajor === value);
    setValue('major.vietMajor', major.vietMajor);
  };
  const handleSelectUniversity = (value) => {
    const university = universities?.find((d) => d.shortcut === value);
    setValue('university.universityId', university._id);
    setValue('university.shortcut', university.shortcut);
  };
  const handleSelectResidenceAddress = (value) => {
    const residenceAddress = residenceAddressList.find((d) => d.location === value);
    setValue('residenceAddress.address', residenceAddress.address);
  };

  const handleEditSubmit = (data) => {
    if (data) {
      const addImage = base64 ? [base64] : null;
      const formattedData = {
        ...data,
        dob: new Date(data.dob),
        visa: {
          from: new Date(data.visa.from),
          to: new Date(data.visa.to),
        },
        passport: {
          ...user.passport,
          expired: new Date(user?.passport.expired),
        },
        profileImg: addImage ? addImage : user.profileImg,
        university: {
          // universityId: data?.university?.universityId,
          shortcut: data?.university?.shortcut,
        },
      };
      userUpdateMutate.mutateAsync(formattedData);
      setToggleEdit(false);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        dob: formatDate(user?.dob),
        visa: {
          from: formatDate(user?.visa.from),
          to: formatDate(user?.visa.to),
        },
        passport: {
          ...user.passport,
          expired: formatDate(user?.passport.expired),
        },
        // university: {
        //   universityId: user?.university?.universityId,
        //   shortcut: user?.university?.shortcut,
        // },
      });
    }
  }, [reset, user]);

  if (isMeLoading || userUpdateMutate.isPending) return <Spinner />;
  return (
    // <section className="relative">
    //   <div className="container mx-auto px-5 py-12">
    //     <div className="mb-12 flex w-full flex-col text-center">
    //       <PageHeading title="ຂໍ້ມູນສ່ວນໂຕ" />
    //       {/* Upload picture */}
    //       <div className="flex items-center justify-center gap-2">
    //         {uploadImageToggle && <ImageUpload setBase64={setBase64} />}
    //         <div className="avatar relative">
    //           {base64 ? (
    //             <div className=" w-48 rounded-full">
    //               <img src={base64} alt={'avatar'} onError={(error) => replaceImage(error, altImage)} />
    //             </div>
    //           ) : (
    //             <div className=" w-48 rounded-full">
    //               {user?.profileImg ? (
    //                 <Image image={user?.profileImg} />
    //               ) : (
    //                 <BiUserCircle className="h-full w-full text-primary" />
    //               )}
    //             </div>
    //           )}
    //           <button
    //             onClick={() => setuploadImageToggle(!uploadImageToggle)}
    //             className="btn btn-ghost btn-xs absolute bottom-0 right-0"
    //           >
    //             <BsPencilSquare size={18} className="" />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="mx-auto">
    //       <form onSubmit={handleSubmit(handleEditSubmit)} className="flex flex-wrap items-center justify-center">
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">English Firstname</span>
    //             </div>
    //             <input
    //               {...register('fullname.englishFirstname', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">English Lastname</span>
    //             </div>
    //             <input
    //               {...register('fullname.englishLastname', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Nickname</span>
    //             </div>
    //             <input
    //               {...register('fullname.nickName', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Lao Full Name</span>
    //             </div>
    //             <input
    //               {...register('fullname.laoName', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">University Shortcut</span>
    //             </div>
    //             <select
    //               {...register('university.shortcut', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               onChange={(e) => handleSelectUniversity(e.target.value)}
    //               className={selectStyle}
    //             >
    //               {universities?.map((item, index) => (
    //                 <option key={index} value={item.shortcut}>
    //                   {item.laoName}
    //                 </option>
    //               ))}
    //             </select>
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Duration (From)</span>
    //             </div>
    //             <select
    //               {...register('duration.from', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               className={selectStyle}
    //             >
    //               {yearOptions?.map((year) => (
    //                 <option key={year} value={year}>
    //                   {year}
    //                 </option>
    //               ))}
    //             </select>
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Duration (To)</span>
    //             </div>
    //             <select
    //               {...register('duration.to', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               className={selectStyle}
    //             >
    //               {yearOptions?.map((year) => (
    //                 <option key={year} value={year}>
    //                   {year}
    //                 </option>
    //               ))}
    //             </select>
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Phone Number</span>
    //             </div>
    //             <input
    //               {...register('phone.phoneNumber', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Emergency</span>
    //             </div>
    //             <input
    //               {...register('phone.emergency', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Relationship</span>
    //             </div>
    //             <input
    //               {...register('phone.relationship', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>

    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Lao Degree</span>
    //             </div>
    //             <select
    //               {...register('degree.laoDegree', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               onChange={(e) => handleSelectDegree(e.target.value)}
    //               className={selectStyle}
    //             >
    //               {degreeList?.map((item, index) => (
    //                 <option key={index} value={item.laoDegree}>
    //                   {item.laoDegree}
    //                 </option>
    //               ))}
    //             </select>
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Visa From</span>
    //               <span className="label-text">MM-DD-YYYY</span>
    //             </div>
    //             <input
    //               {...register('visa.from', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="date"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Visa To</span>
    //               <span className="label-text">MM-DD-YYYY</span>
    //             </div>
    //             <input
    //               {...register('visa.to', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="date"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Residence Address</span>
    //             </div>
    //             <select
    //               {...register('residenceAddress.location', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               onChange={(e) => handleSelectResidenceAddress(e.target.value)}
    //               className={selectStyle}
    //             >
    //               {residenceAddressList?.map((item, index) => (
    //                 <option key={index} value={item.location}>
    //                   {item.location}
    //                 </option>
    //               ))}
    //             </select>
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Passport No</span>
    //             </div>
    //             <input
    //               {...register('passport.passportNo', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>

    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Passport Expired</span>
    //               <span className="label-text">MM-DD-YYYY</span>
    //             </div>
    //             <input
    //               {...register('passport.expired', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="date"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Lao Major</span>
    //             </div>
    //             <select
    //               {...register('major.laoMajor', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               onChange={(e) => handleSelectMajor(e.target.value)}
    //               className={selectStyle}
    //             >
    //               {majorList?.map((item, index) => (
    //                 <option key={index} value={item.laoMajor}>
    //                   {item.laoMajor}
    //                 </option>
    //               ))}
    //             </select>
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Student ID</span>
    //             </div>
    //             <input
    //               {...register('studentId', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Date of Birth</span>
    //               <span className="label-text">MM-DD-YYYY</span>
    //             </div>
    //             <input
    //               {...register('dob', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="date"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Gender</span>
    //             </div>
    //             <select
    //               {...register('gender', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               className={selectStyle}
    //             >
    //               <option value={'male'}>Male</option>
    //               <option value={'female'}>Female</option>
    //               <option value={'other'}>Other</option>
    //             </select>
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Facebook URL</span>
    //             </div>
    //             <input
    //               {...register('facebookUrl', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Permanent Address</span>
    //             </div>
    //             <select
    //               {...register('province', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               className={selectStyle}
    //             >
    //               {provinceList?.map((item, index) => (
    //                 <option key={index} value={item.laoName}>
    //                   {item.laoName}
    //                 </option>
    //               ))}
    //             </select>
    //           </label>
    //         </div>

    //         <div className="w-1/2 p-2">
    //           <label className="form-control w-full">
    //             <div className="label">
    //               <span className="label-text font-semibold">Email Address</span>
    //             </div>
    //             <input
    //               {...register('emailAddress', {
    //                 disabled: toggleEdit ? false : true,
    //               })}
    //               type="text"
    //               className={inputStyle}
    //             />
    //           </label>
    //         </div>
    //         {/* Submit buttons */}
    //         <div className="flex w-full items-center justify-center space-x-4 p-2">
    //           {!toggleEdit && (
    //             <button type="button" onClick={() => setToggleEdit(true)} className="btn btn-primary btn-wide">
    //               <FaPencilAlt />
    //               ແກ້ໄຂ
    //             </button>
    //           )}
    //           {toggleEdit && (
    //             <>
    //               <button type="submit" className="btn btn-primary" disabled={user.update === 'loading' ? true : false}>
    //                 <FaSave />
    //                 {user.update === 'loading' ? (
    //                   <span className="loading loading-spinner loading-xs"></span>
    //                 ) : (
    //                   'ບັນທຶກ'
    //                 )}
    //               </button>
    //               <button onClick={() => setToggleEdit(false)} type="button" className="btn btn-error btn-outline">
    //                 ຍົກເລີກ
    //               </button>
    //             </>
    //           )}
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </section>
    <ComingSoon />
  );
};

export default UserProfile;
