import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import ImageUpload from '../../components/input/ImageUpload';
import PageHeading from '../../components/PageHeading';
import ErrorMessage from '../../components/typography/ErrorMessage';
import Spinner from '../../components/ui/Spinner';
import { degreeList, provinceList, statusList } from '../../data/data';
import { userTestData } from '../../data/TestData';
import { useMajor } from '../../hooks/useMajor';
import { useResidenceAddress } from '../../hooks/useResidenceAddress';
import { useUniversity } from '../../hooks/useUniversity';
import { useUser } from '../../hooks/useUser';
import { inputStyle, selectStyle } from '../../style/global.value';
import { formatDate, getYearOptions } from '../../utils/utils';

const AddStudent = () => {
  const [base64, setBase64] = useState(null);
  const yearOptions = getYearOptions();

  const { useAddNewUser } = useUser();
  const userAddMutation = useAddNewUser();
  const { useGetAllUniversities } = useUniversity();
  const { data: universities } = useGetAllUniversities();
  const { useGetAllMajors } = useMajor();
  const { data: majorList } = useGetAllMajors();
  const { useGetAllResidenceAddresses } = useResidenceAddress();
  const { data: residenceAddressList } = useGetAllResidenceAddresses();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: userTestData,
  });

  const handleSelectDegree = (value) => {
    const vietDegree = degreeList.find((d) => d.laoDegree === value);
    setValue('degree.vietDegree', vietDegree.vietDegree);
  };

  const handleSelectMajor = (value) => {
    const major = majorList.find((d) => d.laoMajor === value);
    setValue('major.vietMajor', major.vietMajor);
  };

  const handleSelectUniversity = (value) => {
    const university = universities.find((d) => d.shortcut === value);
    setValue('university', university);
  };

  const handleSelectResidenceAddress = (value) => {
    const residenceAddress = residenceAddressList.find((d) => d.location === value);
    setValue('residenceAddress.address', residenceAddress.address);
  };

  const handleEditSubmit = (data) => {
    if (data) {
      // const addImage = base64 ? [base64] : null;
      const formattedData = {
        ...data,
        dob: formatDate(data?.dob),
        visa: {
          from: formatDate(data?.visa.from),
          to: formatDate(data?.visa.to),
        },
        passport: {
          ...data.passport,
          expired: formatDate(data?.passport.expired),
        },
        // profileImg: addImage ? addImage : [],
        profileImg: '',
      };
      const confirmed = window.confirm('Are you sure you want to update the user?');
      if (confirmed) {
        userAddMutation.mutate(formattedData);
      } else {
        console.log('Update canceled');
      }
    } else {
      toast.warning('Input data not valid');
    }
  };

  if (userAddMutation.isPending) {
    return <Spinner />;
  }
  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-5 py-8">
          <div className="mb-12 flex w-full flex-col text-center">
            <PageHeading title="ເພີ່ມຂໍ້ມູນນັກຮຽນ" />
            <div className="flex items-center justify-center gap-4">
              <ImageUpload setBase64={setBase64} />
              {base64 && <img className="h-36 w-36 rounded-md object-cover" src={base64}></img>}
            </div>
          </div>
          <div className="mx-auto">
            <form
              onSubmit={handleSubmit(handleEditSubmit)}
              // className="flex flex-wrap items-center justify-center gap-6"
              className=""
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text text-sm font-semibold">
                        Email Address
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage styling="sm:text-md" error={errors?.emailAddress} />
                    </div>
                    <input
                      {...register('emailAddress', {
                        required: 'Email required',
                      })}
                      type="text"
                      // className="input input-bordered"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className={`label-text text-sm font-semibold`}>Status</span>
                    </div>
                    <select {...register('userStatus', {})} className={selectStyle}>
                      {statusList?.map((item, index) => (
                        <option key={index} value={item.status}>
                          {item.status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">
                        Firstname
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage styling="sm:text-md" error={errors?.fullname?.englishFirstname?.message} />
                    </div>
                    <input
                      {...register('fullname.englishFirstname', {
                        required: 'Field required',
                      })}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">
                        Lastname<span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage styling="sm:text-md" error={errors?.fullname?.englishLastname?.message} />
                    </div>
                    <input
                      {...register('fullname.englishLastname', {
                        required: 'Field required',
                      })}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">
                        Lao Name<span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage styling="sm:text-md" error={errors?.fullname?.laoName} />
                    </div>
                    <input
                      {...register('fullname.laoName', {
                        required: 'Field required',
                      })}
                      type="text"
                      className={inputStyle}
                    />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Nickname</span>
                    </div>
                    <input {...register('fullname.nickName', {})} type="text" className={inputStyle} />
                  </label>
                </div>

                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">University Shortcut</span>
                    </div>
                    <select
                      {...register('university.shortcut', {})}
                      onChange={(e) => handleSelectUniversity(e.target.value)}
                      className={selectStyle}
                    >
                      {universities?.map((item, index) => (
                        <option key={index} value={item.shortcut}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Duration (From)</span>
                    </div>
                    <select {...register('duration.from', {})} className={selectStyle}>
                      {yearOptions?.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Duration (To)</span>
                    </div>
                    <select {...register('duration.to', {})} className={selectStyle}>
                      {yearOptions?.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Phone Number</span>
                    </div>
                    <input {...register('phone.phoneNumber', {})} type="text" className={inputStyle} />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Emergency</span>
                    </div>
                    <input {...register('phone.emergency', {})} type="text" className={inputStyle} />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Relationship</span>
                    </div>
                    <input {...register('phone.relationship', {})} type="text" className={inputStyle} />
                  </label>
                </div>

                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Lao Degree</span>
                    </div>
                    <select
                      {...register('degree.laoDegree', {})}
                      onChange={(e) => handleSelectDegree(e.target.value)}
                      className={selectStyle}
                    >
                      {degreeList?.map((item, index) => (
                        <option key={index} value={item.laoDegree}>
                          {item.laoDegree}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Visa From</span>
                    </div>
                    <input {...register('visa.from', {})} type="date" className={inputStyle} />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Visa To</span>
                    </div>
                    <input {...register('visa.to', {})} type="date" className={inputStyle} />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Residence Address</span>
                    </div>
                    <select
                      {...register('residenceAddress.location', {})}
                      onChange={(e) => handleSelectResidenceAddress(e.target.value)}
                      className={selectStyle}
                    >
                      {residenceAddressList?.map((item, index) => (
                        <option key={index} value={item.location}>
                          {item.location}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Passport No</span>
                    </div>
                    <input {...register('passport.passportNo', {})} type="text" className={inputStyle} />
                  </label>
                </div>

                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Passport Expired</span>
                    </div>
                    <input {...register('passport.expired', {})} type="date" className={inputStyle} />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Lao Major</span>
                    </div>
                    <select
                      {...register('major.laoMajor', {})}
                      onChange={(e) => handleSelectMajor(e.target.value)}
                      className={selectStyle}
                    >
                      {majorList?.map((item, index) => (
                        <option key={index} value={item.laoMajor}>
                          {item.laoMajor}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Student ID</span>
                    </div>
                    <input {...register('studentId', {})} type="text" className={inputStyle} />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Date of Birth</span>
                    </div>
                    <input {...register('dob', {})} type="date" className={inputStyle} />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
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
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Facebook URL</span>
                    </div>
                    <input {...register('facebookUrl', {})} type="text" className={inputStyle} />
                  </label>
                </div>
                <div className="w-[25rem] p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-sm font-semibold">Province</span>
                    </div>
                    <select {...register('province', {})} className={selectStyle}>
                      {provinceList?.map((item, index) => (
                        <option key={index} value={item.laoName}>
                          {item.laoName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              <div className="mt-5 flex w-full justify-center space-x-4 p-2">
                <button type="submit" className="btn btn-primary btn-wide" disabled={userAddMutation.isPending}>
                  <FaSave />
                  {userAddMutation.isPending ? <span className="loading loading-spinner loading-xs"></span> : 'ບັນທຶກ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddStudent;

// const { Option } = Select;

// const AddStudent = () => {
//   const [base64, setBase64] = useState(null);
//   const navigate = useNavigate();

//   const { useAddNewUser } = useUser();
//   const userAddMutation = useAddNewUser();
//   const { useGetAllUniversities } = useUniversity();
//   const { data: universities } = useGetAllUniversities();
//   const { useGetAllMajors } = useMajor();
//   const { data: majorList } = useGetAllMajors();
//   const { useGetAllResidenceAddresses } = useResidenceAddress();
//   const { data: residenceAddressList } = useGetAllResidenceAddresses();

//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (userAddMutation.isSuccess) {
//       form.resetFields();
//       navigate('/student-list');
//     }
//   }, [navigate, form, userAddMutation.isSuccess]);

//   const handleSave = (values) => {
//     // const addImage = base64 ? [base64] : null;
//     // const formattedData = {
//     //   ...values,
//     //   dob: formatDate(values?.dob),
//     //   visa: {
//     //     from: formatDate(values?.visa.from),
//     //     to: formatDate(values?.visa.to),
//     //   },
//     //   passport: {
//     //     ...values.passport,
//     //     expired: formatDate(values?.passport.expired),
//     //   },
//     //   profileImg: addImage ? addImage : [],
//     // };
//     // const confirmed = window.confirm('Are you sure you want to update the user?');
//     // if (confirmed) {
//     //   userAddMutation.mutate(formattedData);
//     // } else {
//     //   console.log('Update canceled');
//     // }
//   };

//   if (userAddMutation.isPending) {
//     return <Spin />;
//   }

//   return (
//     <>
//       <section className="relative">
//         <div className="container mx-auto px-5 py-8">
//           <div className="mb-12 flex w-full flex-col text-center">
//             <PageHeading title="ເພີ່ມຂໍ້ມູນນັກຮຽນ" />
//             <div className="flex items-center justify-center gap-4">
//               <ImageUpload setBase64={setBase64} />
//               {base64 && <img className="h-36 w-36 rounded-md object-cover" src={base64} alt="Profile" />}
//             </div>
//           </div>
//           <div className="mx-auto">
//             <Form layout="vertical" form={form} onFinish={handleSave} initialValues={{}}>
//               <div className="grid grid-cols-2 gap-4">
//                 <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required' }]}>
//                   <Input />
//                 </Form.Item>
//                 <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Email is required' }]}>
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   name="university"
//                   label="University"
//                   rules={[{ required: true, message: 'University is required' }]}
//                 >
//                   <Select
//                     loading={universities === undefined}
//                     options={universities?.map((university) => ({
//                       value: university._id,
//                       label: university.englishName,
//                     }))}
//                   />
//                 </Form.Item>
//                 <Form.Item name="major" label="Major" rules={[{ required: true, message: 'Major is required' }]}>
//                   <Select
//                     options={majorList?.map((major) => ({
//                       value: major._id,
//                       label: major.laoMajor,
//                     }))}
//                   ></Select>
//                 </Form.Item>
//               </div>
//               <Form.Item
//                 name="residenceAddress"
//                 label="Residence Address"
//                 rules={[{ required: true, message: 'Residence Address is required' }]}
//               >
//                 <Select
//                   options={residenceAddressList?.map((item) => ({
//                     value: item._id,
//                     label: item.location,
//                   }))}
//                 ></Select>
//               </Form.Item>
//               <Form.Item className="mx-auto max-w-fit">
//                 <Button
//                   type="primary"
//                   className="w-24 bg-color-1 text-white"
//                   htmlType="submit"
//                   disabled={userAddMutation.isPending}
//                 >
//                   {userAddMutation.isPending ? <Spin size="small" /> : 'Save'}
//                 </Button>
//               </Form.Item>
//             </Form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AddStudent;
