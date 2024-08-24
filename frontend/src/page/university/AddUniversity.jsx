import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/typography/ErrorMessage';
import PageHeading from '../../components/PageHeading';
import { useUniversity } from '../../hooks/useUniversity';
const inputStyle = 'input input-bordered w-full text-base-content/80';

const AddUniversity = () => {
  const navigate = useNavigate();

  const { useAddNewUniversity } = useUniversity();
  const universityMutate = useAddNewUniversity();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      laoName: 'ມລ ',
    },
  });

  useEffect(() => {
    if (universityMutate.isSuccess) {
      reset();
      navigate('/manage-others-data/university-list');
    }
  }, [navigate, reset, universityMutate.isSuccess]);

  const handleSave = (data) => {
    universityMutate.mutateAsync(data);
  };

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <PageHeading title="ເພີ່ມຂໍ້ມູນມະຫາວິທະຍາໄລ" path={'/manage-others-data/university-list'} />
          </div>
          <div className="mx-auto">
            <form onSubmit={handleSubmit(handleSave)} className="flex flex-wrap items-center justify-center">
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label flex items-center">
                    <span className="label-text font-semibold">
                      English Name
                      <span className="ml-2 text-error">*</span>
                    </span>
                    <ErrorMessage styling="sm:text-md" error={errors?.englishName} />
                  </div>
                  <input
                    {...register('englishName', {
                      required: 'English required',
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label flex items-center">
                    <span className="label-text font-semibold">
                      Viet Name
                      <span className="ml-2 text-error">*</span>
                    </span>
                    <ErrorMessage styling="sm:text-md" error={errors?.vietName} />
                  </div>
                  <input
                    {...register('vietName', {
                      required: 'Viet Name is required',
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label flex items-center">
                    <span className="label-text font-semibold">
                      Lao Name
                      <span className="ml-2 text-error">*</span>
                    </span>
                    <ErrorMessage styling="sm:text-md" error={errors?.laoName} />
                  </div>
                  <input
                    {...register('laoName', {
                      required: 'Lao Name is required',
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>

              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label flex items-center">
                    <span className="label-text font-semibold">
                      Shortcut
                      <span className="ml-2 text-error">*</span>
                    </span>
                    <ErrorMessage styling="sm:text-md" error={errors?.shortcut} />
                  </div>
                  <input
                    {...register('shortcut', {
                      required: 'Shortcut is required',
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>
              <div className="w-full space-x-4 p-2">
                <button type="submit" className="btn btn-primary" disabled={universityMutate.isPending ? true : false}>
                  {universityMutate.isPending ? <span className="loading loading-spinner loading-xs"></span> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddUniversity;
