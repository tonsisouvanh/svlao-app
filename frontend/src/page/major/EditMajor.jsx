import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../components/typography/ErrorMessage';
import Spinner from '../../components/ui/Spinner';
import PageHeading from '../../components/PageHeading';
import { useMajor } from '../../hooks/useMajor';
import ErrorLoadingData from '../../components/ui/ErrorLoadingData';

const inputStyle = 'input input-bordered w-full text-base-content/80';

const EditMajor = () => {
  const { id } = useParams();

  const { useGetMajor, useUpdateMajor } = useMajor();
  const { data: major, isLoading, error } = useGetMajor(id);
  const majorUpdateMutate = useUpdateMajor();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: major?._id,
      vietMajor: major?.vietMajor,
      laoMajor: major?.laoMajor,
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);

  const handleEditSubmit = (data) => {
    if (data) {
      majorUpdateMutate.mutateAsync(data);
      setToggleEdit(false);
    } else toast.warning('Input data not valid');
  };

  useEffect(() => {
    if (major) {
      reset({
        id: major._id,
        vietMajor: major.vietMajor,
        laoMajor: major.laoMajor,
      });
    }
  }, [major, reset]);

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
            <PageHeading title="Edit Major" path="/manage-others-data/major-list" />
          </div>
          <div className="mx-auto">
            <form onSubmit={handleSubmit(handleEditSubmit)} className="flex flex-wrap items-center justify-center">
              <div className="w-1/2 p-2">
                <label className="form-control w-full">
                  <div className="label flex items-center">
                    <span className="label-text font-semibold">
                      Viet Name
                      <span className="ml-2 text-error">*</span>
                    </span>
                    <ErrorMessage styling="sm:text-md" error={errors?.vietMajor} />
                  </div>
                  <input
                    {...register('vietMajor', {
                      required: 'Field required',
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
                    <ErrorMessage styling="sm:text-md" error={errors?.laoMajor} />
                  </div>
                  <input
                    {...register('laoMajor', {
                      required: 'Field required',
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>
              <div className="w-full space-x-4 p-2">
                {!toggleEdit && (
                  <button type="button" onClick={() => setToggleEdit(true)} className="btn btn-primary">
                    Update
                  </button>
                )}
                {toggleEdit && (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={majorUpdateMutate.isPending ? true : false}
                    >
                      {majorUpdateMutate.isPending ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        'Save'
                      )}
                    </button>
                    <button onClick={() => setToggleEdit(false)} type="button" className="btn btn-error btn-outline">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditMajor;
