import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ErrorMessage from "../../components/typography/ErrorMessage";
import Spinner from "../../components/ui/Spinner";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  getUniversityById,
  universityReset,
  updateUniversity,
} from "../../feature/globalData/UniversitySlice";
import PageHeading from "../../components/PageHeading";

const inputStyle = "input input-bordered w-full text-base-content/80";

const EditUniversity = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { status, error, universities } = useSelector(
    (state) => state.university,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: universities[0]?._id,
      englishName: universities[0]?.englishName,
      laoName: universities[0]?.laoName,
      vietName: universities[0]?.vietName,
      shortcut: universities[0]?.shortcut,
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    if (status.update === "succeeded") {
      toast.success("Update Successfully");
      dispatch(universityReset());
    } else if (status.update === "failed") {
      toast.error(error);
      dispatch(universityReset());
    }
  }, [status.update, dispatch, error]);

  const handleEditSubmit = (data) => {
    if (data) {
      dispatch(updateUniversity({ ...data, _id: universities[0]?._id }));
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  useEffect(() => {
    dispatch(getUniversityById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status.list === "succeeded") {
      reset({
        id: universities[0]?._d,
        englishName: universities[0]?.englishName,
        laoName: universities[0]?.laoName,
        vietName: universities[0]?.vietName,
        shortcut: universities[0]?.shortcut,
      });
    } else if (status.list === "failed") {
      toast.error(error);
    }
  }, [status.list, reset, universities, error]);

  return (
    <>
      <section className="relative">
        {universities[0] &&
        universities.length > 0 &&
        status.list !== "loading" ? (
          <div className="container mx-auto px-5 py-10">
            <div className="mb-12 flex w-full flex-col text-center">
              <PageHeading title="ແກ້ໄຂຂໍ້ມູນມະຫາວິທະຍາໄລ" />
              <div>
                <p className="text-xs">{universities[0]?._id}</p>
              </div>
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

export default EditUniversity;
