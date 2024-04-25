import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  documentReset,
  getDocumentById,
  removeDocument,
  updateDocument,
} from "../../../feature/document/DocumentSlice";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ErrorMessage from "../../../components/typography/ErrorMessage";
import Spinner from "../../../components/ui/Spinner";
import { useForm } from "react-hook-form";
const inputStyle = "input input-bordered w-full text-base-description/80";

const EditDocument = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { status, error, documents } = useSelector((state) => state.document);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: documents[0]?._id,
      title: documents[0]?.title,
      fileUrl: documents[0]?.fileUrl,
      downloadsCount: documents[0]?.downloadsCount,
      description: documents[0]?.description,
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    if (status.update === "succeeded") {
      toast.success("Update Successfully");
      dispatch(documentReset());
    } else if (status.update === "failed") {
      toast.error(error);
      dispatch(documentReset());
    }
  }, [status.update, dispatch, error]);

  const handleEditSubmit = (data) => {
    if (data) {
      dispatch(updateDocument({ ...data}));
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  const handleDelete = () => {
    dispatch(removeDocument(documents[0]?._id));
  };

  useEffect(() => {
    if (status.remove === "succeeded") {
      toast.success("Deleted document");
      dispatch(documentReset());
      navigate(-1);
    }
    if (status.remove === "failed") {
      toast.success("Failed to delete");
      dispatch(documentReset());
    }
  }, [navigate, status, dispatch]);

  useEffect(() => {
    dispatch(getDocumentById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status.fetchOne === "succeeded") {
      reset({
        id: documents[0]?._id,
        title: documents[0]?.title,
        fileUrl: documents[0]?.fileUrl,
        downloadsCount: documents[0]?.downloadsCount,
        description: documents[0]?.description,
      });
    } else if (status.fetchOne === "failed") {
      toast.error(error);
    }
  }, [status.fetchOne, reset, documents, error]);

  if (status.update === "loading") {
    return <Spinner />;
  }
  if (status.fetchOne === "failed") {
    return navigate(-1);
  }
  return (
    <>
      <section className="relative">
        {documents[0] &&
        documents.length > 0 &&
        status.fetchAll !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <h1 className="title-font m:text-3xl mb-4 mt-10 text-2xl font-medium">
                Edit document
              </h1>
              <div>
                <p className="text-xs">{documents[0]?._id}</p>
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
                        Download Count
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.downloadsCount}
                      />
                    </div>
                    <input
                      {...register("downloadsCount", {})}
                      className={`input input-bordered w-full max-w-full`}
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
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-error btn-outline"
                  >
                    Delete
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

export default EditDocument;
