import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import {
  createResidenceAddress,
  residenceAddressReset,
} from "../../feature/globalData/ResidenceAddressSlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import ErrorMessage from "../../components/typography/ErrorMessage";
const inputStyle = "input input-bordered w-full text-base-content/80";

const AddResidenceAddress = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.residenceAddress);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  useEffect(() => {
    if (status.create === "succeeded") {
      toast.success("Create Successfully");
      dispatch(residenceAddressReset());
      reset({});
      navigate(-1);
    } else if (status.create === "failed") {
      toast.error(error);
      dispatch(residenceAddressReset());
    }
  }, [status.create, dispatch, error, navigate, reset]);

  const handleEditSubmit = (data) => {
    if (data) {
      const confirmed = window.confirm(
        "Are you sure you want to update the residenceAddress?",
      );

      if (confirmed) {
        dispatch(createResidenceAddress({ ...data }));
      } else {
        console.log("Create canceled");
      }
    } else {
      toast.warning("Input data not valid");
    }
  };

  return (
    <>
      <section className="relative">
        {status.create !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <h1 className="title-font m:text-3xl mb-4 text-2xl font-medium text-primary">
                Add Residence Address
              </h1>
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status.create === "loading" ? true : false}
                  >
                    {status.create === "loading" ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Submit"
                    )}
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

export default AddResidenceAddress;
