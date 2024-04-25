import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ErrorMessage from "../../components/typography/ErrorMessage";
import Spinner from "../../components/ui/Spinner";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  getMajorById,
  majorReset,
  updateMajor,
} from "../../feature/globalData/MajorSlice";

const inputStyle = "input input-bordered w-full text-base-content/80";

const EditMajor = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { status, error, majors } = useSelector((state) => state.major);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: majors[0]?._id,
      laoMajor: majors[0]?.laoMajor,
      vietMajor: majors[0]?.vietMajor,
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    if (status.update === "succeeded") {
      toast.success("Update Successfully");
      dispatch(majorReset());
    } else if (status.update === "failed") {
      toast.error(error);
      dispatch(majorReset());
    }
  }, [status.update, dispatch, error]);

  const handleEditSubmit = (data) => {
    if (data) {
      dispatch(updateMajor({ ...data, _id: majors[0]?._id }));
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  useEffect(() => {
    dispatch(getMajorById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status.fetchOne === "succeeded") {
      reset({
        id: majors[0]?._id,
        laoMajor: majors[0]?.laoMajor,
        vietMajor: majors[0]?.vietMajor,
      });
    } else if (status.fetchOne === "failed") {
      toast.error(error);
    }
  }, [status.fetchOne, reset, majors, error]);

  return (
    <>
      <section className="relative">
        {majors[0] && majors.length > 0 && status.list !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <h1 className="title-font m:text-3xl mb-4 text-2xl font-medium">
                Edit major
              </h1>
              <div>
                <p>{majors[0]?._id}</p>
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
                        Viet Name
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.vietMajor}
                      />
                    </div>
                    <input
                      {...register("vietMajor", {
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
                        Lao Name
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.laoMajor}
                      />
                    </div>
                    <input
                      {...register("laoMajor", {
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

export default EditMajor;
