import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import PageHeading from '../../components/PageHeading';
import ErrorLoadingData from '../../components/ui/ErrorLoadingData';
import Spinner from '../../components/ui/Spinner';
import { useUniversity } from '../../hooks/useUniversity';

const EditUniversity = () => {
  const { id } = useParams();
  const { useGetUniversity, useUpdateUniversity } = useUniversity();
  const { data: university, isLoading, error } = useGetUniversity(id);
  const universityUpdateMutate = useUpdateUniversity();
  const [form] = Form.useForm();

  useEffect(() => {
    if (university) {
      form.setFieldsValue({
        id: university._id,
        englishName: university.englishName,
        laoName: university.laoName,
        vietName: university.vietName,
        shortcut: university.shortcut,
      });
    }
  }, [university, form]);

  const handleEditSubmit = (values) => {
    if (values) {
      universityUpdateMutate.mutateAsync(values);
    } else {
      toast.warning('Input data not valid');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorLoadingData />;
  }

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-5 py-10">
          <div className="mb-12 flex w-full flex-col text-center">
            <PageHeading title="ແກ້ໄຂຂໍ້ມູນມະຫາວິທະຍາໄລ" path="/manage-others-data/university-list" />
          </div>
          <div className="mx-auto">
            <Form layout="vertical" form={form} onFinish={handleEditSubmit} className="">
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:gap-1">
                <Form.Item name="id" label="id" hidden>
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  name="englishName"
                  label="English Name"
                  rules={[{ required: true, message: 'English Name is required' }]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  name="vietName"
                  label="Viet Name"
                  rules={[{ required: true, message: 'Viet Name is required' }]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  name="laoName"
                  label="Lao Name"
                  rules={[{ required: true, message: 'Lao Name is required' }]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  name="shortcut"
                  label="Shortcut"
                  rules={[{ required: true, message: 'Shortcut is required' }]}
                >
                  <Input size="large" />
                </Form.Item>
              </div>
              <Button
                type="primary"
                icon={<FaSave />}
                htmlType="submit"
                className="bg-color-1 text-white"
                loading={universityUpdateMutate.isPending}
                disabled={universityUpdateMutate.isPending}
              >
                Save
              </Button>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditUniversity;

// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { useParams } from 'react-router-dom';
// import ErrorMessage from '../../components/typography/ErrorMessage';
// import Spinner from '../../components/ui/Spinner';
// import PageHeading from '../../components/PageHeading';
// import { useUniversity } from '../../hooks/useUniversity';
// import ErrorLoadingData from '../../components/ui/ErrorLoadingData';

// const inputStyle = 'input input-bordered w-full text-base-content/80';

// const EditUniversity = () => {
//   const { id } = useParams();

//   // const { status, error, universities } = useSelector((state) => state.university);

//   const { useGetUniversity, useUpdateUniversity } = useUniversity();
//   const { data: university, isLoading, error } = useGetUniversity(id);
//   const universityUpdateMutate = useUpdateUniversity();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       id: university?._id,
//       englishName: university?.englishName,
//       laoName: university?.laoName,
//       vietName: university?.vietName,
//       shortcut: university?.shortcut,
//     },
//   });

//   const [toggleEdit, setToggleEdit] = useState(false);

//   const handleEditSubmit = (data) => {
//     if (data) {
//       universityUpdateMutate.mutateAsync(data);
//       setToggleEdit(false);
//     } else toast.warning('Input data not valid');
//   };

//   useEffect(() => {
//     if (university) {
//       reset({
//         id: university._id,
//         englishName: university.englishName,
//         laoName: university.laoName,
//         vietName: university.vietName,
//         shortcut: university.shortcut,
//       });
//     }
//   }, [university, reset]);

//   if (isLoading) {
//     return <Spinner />;
//   }
//   if (error) {
//     return <ErrorLoadingData />;
//   }
//   return (
//     <>
//       <section className="relative">
//         <div className="container mx-auto px-5 py-10">
//           <div className="mb-12 flex w-full flex-col text-center">
//             <PageHeading title="ແກ້ໄຂຂໍ້ມູນມະຫາວິທະຍາໄລ" path="/manage-others-data/university-list" />
//           </div>
//           <div className="mx-auto">
//             <form onSubmit={handleSubmit(handleEditSubmit)} className="flex flex-wrap items-center justify-center">
//                 <label className="form-control w-full">
//                   <div className="label flex items-center">
//                     <span className="label-text font-semibold">
//                       English Name
//                       <span className="ml-2 text-error">*</span>
//                     </span>
//                     <ErrorMessage styling="sm:text-md" error={errors?.englishName} />
//                   <input
//                     {...register('englishName', {
//                       // required: 'English required',
//                     })}
//                     type="text"
//                     className={inputStyle}
//                   />
//                 </label>
//               </div>
//                 <label className="form-control w-full">
//                   <div className="label flex items-center">
//                     <span className="label-text font-semibold">
//                       Viet Name
//                       <span className="ml-2 text-error">*</span>
//                     </span>
//                     <ErrorMessage styling="sm:text-md" error={errors?.vietName} />
//                   <input
//                     {...register('vietName', {
//                       // required: 'Viet Name is required',
//                     })}
//                     type="text"
//                     className={inputStyle}
//                   />
//                 </label>
//               </div>
//                 <label className="form-control w-full">
//                   <div className="label flex items-center">
//                     <span className="label-text font-semibold">
//                       Lao Name
//                       <span className="ml-2 text-error">*</span>
//                     </span>
//                     <ErrorMessage styling="sm:text-md" error={errors?.laoName} />
//                   <input
//                     {...register('laoName', {
//                       // required: 'Lao Name is required',
//                     })}
//                     type="text"
//                     className={inputStyle}
//                   />
//                 </label>
//               </div>

//                 <label className="form-control w-full">
//                   <div className="label flex items-center">
//                     <span className="label-text font-semibold">
//                       Shortcut
//                       <span className="ml-2 text-error">*</span>
//                     </span>
//                     <ErrorMessage styling="sm:text-md" error={errors?.shortcut} />
//                   <input
//                     {...register('shortcut', {
//                       // required: 'Shortcut is required',
//                     })}
//                     type="text"
//                     className={inputStyle}
//                   />
//                 </label>
//               </div>
//               <div className="w-full space-x-4 p-2">
//                 {!toggleEdit && (
//                   <button type="button" onClick={() => setToggleEdit(true)} className="btn btn-primary">
//                     Update
//                   </button>
//                 )}
//                 {toggleEdit && (
//                   <>
//                     <button
//                       type="submit"
//                       className="btn btn-primary"
//                       disabled={universityUpdateMutate.isPending ? true : false}
//                     >
//                       {universityUpdateMutate.isPending ? (
//                         <span className="loading loading-spinner loading-xs"></span>
//                       ) : (
//                         'Save'
//                       )}
//                     </button>
//                     <button onClick={() => setToggleEdit(false)} type="button" className="btn btn-error btn-outline">
//                       Cancel
//                     </button>
//                   </>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EditUniversity;
