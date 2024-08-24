import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/typography/ErrorMessage';
import { useResidenceAddress } from '../../hooks/useResidenceAddress';
const inputStyle = 'input input-bordered w-full text-base-content/80';

const AddResidenceAddress = () => {
  const navigate = useNavigate();
  const { useAddNewResidenceAddress } = useResidenceAddress();
  const residenceAddressAddMutate = useAddNewResidenceAddress();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  useEffect(() => {
    if (residenceAddressAddMutate.isSuccess) {
      reset();
      navigate('/manage-others-data/residence-address-list');
    }
  }, [
    navigate,
    reset,
    residenceAddressAddMutate.isSuccess,
    residenceAddressAddMutate.isError,
    residenceAddressAddMutate.error,
  ]);

  const handleSave = (data) => {
    residenceAddressAddMutate.mutateAsync(data);
  };

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="title-font m:text-3xl mb-4 text-2xl font-medium">Add Residence Address</h1>
          </div>
          <div className="mx-auto">
            <form onSubmit={handleSubmit(handleSave)} className="flex flex-col items-center justify-center">
              <div className="w-full p-2">
                <label className="form-control w-full">
                  <div className="label flex items-center">
                    <span className="label-text font-semibold">
                      Address
                      <span className="ml-2 text-error">*</span>
                    </span>
                    <ErrorMessage styling="sm:text-md" error={errors?.address} />
                  </div>
                  <input
                    {...register('address', {
                      required: 'Field required',
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>
              <div className="w-full p-2">
                <label className="form-control w-full">
                  <div className="label flex items-center">
                    <span className="label-text font-semibold">
                      Location (KTX)
                      <span className="ml-2 text-error">*</span>
                    </span>
                    <ErrorMessage styling="sm:text-md" error={errors?.location} />
                  </div>
                  <input
                    {...register('location', {
                      required: 'Field required',
                    })}
                    type="text"
                    className={inputStyle}
                  />
                </label>
              </div>
              <div className="w-full space-x-4 p-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={residenceAddressAddMutate.isLoading ? true : false}
                >
                  {residenceAddressAddMutate.isLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddResidenceAddress;
