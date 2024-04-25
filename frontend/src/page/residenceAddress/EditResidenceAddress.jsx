import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ErrorMessage from "../../components/typography/ErrorMessage";
import Spinner from "../../components/ui/Spinner";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  getResidenceAddressById,
  residenceAddressReset,
  updateResidenceAddress,
} from "../../feature/globalData/ResidenceAddressSlice";

const inputStyle = "input input-bordered w-full text-base-content/80";

const EditResidenceAddress = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { status, error, residenceAddresses } = useSelector(
    (state) => state.residenceAddress,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: residenceAddresses[0]?._id,
      address: residenceAddresses[0]?.address,
      location: residenceAddresses[0]?.location,
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    if (status.update === "succeeded") {
      toast.success("Update Successfully");
      dispatch(residenceAddressReset());
    } else if (status.update === "failed") {
      toast.error(error);
      dispatch(residenceAddressReset());
    }
  }, [status.update, dispatch, error]);

  const handleEditSubmit = (data) => {
    if (data) {
      dispatch(
        updateResidenceAddress({ ...data, _id: residenceAddresses[0]?._id }),
      );
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  useEffect(() => {
    dispatch(getResidenceAddressById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status.fetchAll === "succeeded") {
      reset({
        id: residenceAddresses[0]?._id,
        address: residenceAddresses[0]?.address,
        location: residenceAddresses[0]?.location,
      });
    } else if (status.fetchAll === "failed") {
      toast.error(error);
    }
  }, [status.fetchAll, reset, residenceAddresses, error]);

  if (status.update === "loading") return <Spinner />;
  return (
    <>
      <section className="relative">
        {residenceAddresses[0] &&
        residenceAddresses.length > 0 &&
        status.fetchAll !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <h1 className="title-font m:text-3xl mb-4 text-2xl font-medium">
                Edit residenceAddress
              </h1>
              <div>
                <p>{residenceAddresses[0]?._id}</p>
              </div>
            </div>
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-full p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text font-semibold">
                        Address
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.address}
                      />
                    </div>
                    <input
                      {...register("address", {
                        required: "Field required",
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
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.location}
                      />
                    </div>
                    <input
                      {...register("location", {
                        required: "Field required",
                      })}
                      type="text"
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
                        disabled={status.update === "loading" ? true : false}
                      >
                        {status.update === "loading" ? (
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

export default EditResidenceAddress;
