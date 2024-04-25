import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import {
  createUniversity,
  universityReset,
} from "../../feature/globalData/UniversitySlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import ErrorMessage from "../../components/typography/ErrorMessage";
import PageHeading from "../../components/PageHeading";
const inputStyle = "input input-bordered w-full text-base-content/80";

const AddUniversity = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.university);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      laoName: "ມລ ",
    },
  });

  useEffect(() => {
    if (status.create === "succeeded") {
      toast.success("Create Successfully");
      dispatch(universityReset());
      reset({});
      navigate(-1);
    } else if (status.create === "failed") {
      toast.error(error);
      dispatch(universityReset());
    }
  }, [status.create, dispatch, error, navigate, reset]);

  const handleEditSubmit = (data) => {
    if (data) {
      const confirmed = window.confirm(
        "Are you sure you want to update the university?",
      );

      if (confirmed) {
        dispatch(
          createUniversity({ ...data, shortcut: data.shortcut.toUpperCase() }),
        );
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
              <PageHeading title="ເພີ່ມຂໍ້ມູນມະຫາວິທະຍາໄລ"/>
            </div>
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex flex-wrap items-center justify-center"
              >
                <div className="w-1/2 p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text font-semibold">
                        English Name
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.englishName}
                      />
                    </div>
                    <input
                      {...register("englishName", {
                        required: "English required",
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
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.vietName}
                      />
                    </div>
                    <input
                      {...register("vietName", {
                        required: "Viet Name is required",
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
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.laoName}
                      />
                    </div>
                    <input
                      {...register("laoName", {
                        required: "Lao Name is required",
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
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.shortcut}
                      />
                    </div>
                    <input
                      {...register("shortcut", {
                        required: "Shortcut is required",
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

export default AddUniversity;
