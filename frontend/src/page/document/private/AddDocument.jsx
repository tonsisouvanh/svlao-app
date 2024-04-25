import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  documentReset,
  createDocument,
} from "../../../feature/document/DocumentSlice";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ErrorMessage from "../../../components/typography/ErrorMessage";
import Spinner from "../../../components/ui/Spinner";
const inputStyle = "input input-bordered w-full text-base-content/80";

const AddDocument = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.document);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  useEffect(() => {
    if (status.create === "succeeded") {
      toast.success("Create Successfully");
      dispatch(documentReset());
      reset({});
      navigate(-1);
    } else if (status.create === "failed") {
      toast.error(error);
      dispatch(documentReset());
    }
  }, [status.create, dispatch, error, navigate, reset]);

  const handleCreateSubmit = (data) => {
    if (data) {
      const confirmed = window.confirm(
        "Are you sure you want to update the document?",
      );

      if (confirmed) {
        dispatch(createDocument({ ...data }));
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
              <h1 className="title-font m:text-3xl mb-4 mt-10 text-2xl font-medium">
                Add Document
              </h1>
            </div>
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit(handleCreateSubmit)}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-full p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text font-semibold">
                        Title
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.title}
                      />
                    </div>
                    <input
                      {...register("title", {
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
                        File Url
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.fileUrl}
                      />
                    </div>
                    <input
                      {...register("fileUrl", {
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
                        Description
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.description}
                      />
                    </div>
                    <textarea
                      {...register("description", {})}
                      className={`textarea textarea-bordered h-48 w-full max-w-full`}
                    />
                  </label>
                </div>
                <div className="w-full space-x-4 p-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status.create === "loading"}
                  >
                    {status.create === "loading" ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Create"
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

export default AddDocument;
