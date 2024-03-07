import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  announcementReset,
  getAnnouncementById,
  removeAnnouncement,
  updateAnnouncement,
} from "../../../feature/announcement/AnnouncementSlice";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ErrorMessage from "../../../components/typography/ErrorMessage";
import Spinner from "../../../components/ui/Spinner";
import { announcementCategoryList } from "../../../data/data";
import ImageUpload from "../../../components/input/ImageUpload";
import { AiFillEye, AiFillFileImage } from "react-icons/ai";
const inputStyle = "input input-bordered w-full text-base-content/80";

const EditAnnouncement = () => {
  const [base64, setBase64] = useState(null);
  const [uploadImageToggle, setuploadImageToggle] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { status, error, singleAnnouncement } = useSelector(
    (state) => state.announcement,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      id: singleAnnouncement?._id,
      title: singleAnnouncement?.title,
      content: singleAnnouncement?.content,
      image: singleAnnouncement?.image,
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    if (status.update === "succeeded") {
      toast.success("Update Successfully");
      dispatch(announcementReset());
      setuploadImageToggle(false);
    } else if (status.update === "failed") {
      toast.error(error);
      dispatch(announcementReset());
    }
  }, [status.update, dispatch, error]);

  const handleEditSubmit = (data) => {
    if (data) {
      const addImage = base64 ? [base64] : null;
      const formattedData = {
        ...data,
        image: addImage ? addImage : singleAnnouncement.image,
        category: data.category.map((item) => item.value),
      };
      dispatch(
        updateAnnouncement({ ...formattedData, _id: singleAnnouncement?._id }),
      );
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  const handleDelete = () => {
    dispatch(removeAnnouncement(singleAnnouncement?._id));
  };

  useEffect(() => {
    if (status.remove === "succeeded") {
      toast.success("Deleted announcement");
      dispatch(announcementReset());
      navigate(-1);
    }
    if (status.remove === "failed") {
      toast.success("Failed to delete");
      dispatch(announcementReset());
    }
  }, [navigate, status, dispatch]);

  useEffect(() => {
    dispatch(getAnnouncementById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status.fetchOne === "succeeded") {
      reset({
        id: singleAnnouncement?._id,
        title: singleAnnouncement?.title,
        content: singleAnnouncement?.content,
        image: singleAnnouncement?.image,
      });
    } else if (status.fetchOne === "failed") {
      toast.error(error);
    }
  }, [status.fetchOne, reset, singleAnnouncement, error]);
  useEffect(() => {
    setValue(
      "category",
      singleAnnouncement?.category?.map((c) => ({ value: c, label: c })),
    );
  }, [singleAnnouncement, setValue]);
  if (status.update === "loading") {
    return <Spinner />;
  }
  if (status.fetchOne === "failed") {
    return navigate(-1);
  }
  return (
    <>
      <section className="relative">
        {singleAnnouncement &&
        singleAnnouncement &&
        status.fetchAll !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <Breadcrumbs pathname={pathname} />
              <h1 className="title-font m:text-3xl mb-4 mt-10 text-2xl font-medium">
                Edit announcement
              </h1>
              <div>
                <p className="text-xs">{singleAnnouncement?._id}</p>
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
                        Content
                        <span className="ml-2 text-error">*</span>
                      </span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.content}
                      />
                    </div>
                    <textarea
                      {...register("content", {
                        required: "Field required",
                      })}
                      className={`textarea textarea-bordered h-48 w-full max-w-full`}
                    />
                  </label>
                </div>
                <div className="w-full p-2">
                  <label className="form-control w-full">
                    <div className="label flex items-center">
                      <span className="label-text font-semibold">Category</span>
                      <ErrorMessage
                        styling="sm:text-md"
                        error={errors?.category}
                      />
                    </div>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          className="text-neutral"
                          {...field}
                          isMulti
                          options={announcementCategoryList}
                        />
                      )}
                    />
                  </label>
                </div>
                <div className="w-full p-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Upload your image:
                      </span>
                    </div>
                    {base64 ? (
                      <div className="avatar">
                        <div className="w-64 rounded">
                          <button
                            type="button"
                            className="btn btn-neutral btn-xs absolute left-2 top-2"
                          >
                            <AiFillEye />
                          </button>
                          <img
                            src={base64}
                            alt={singleAnnouncement?.title || "image"}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar">
                        <div className="w-64 rounded">
                          <img
                            src={singleAnnouncement?.image}
                            alt={singleAnnouncement?.title || "image"}
                          />
                        </div>
                      </div>
                    )}
                    {uploadImageToggle && <ImageUpload setBase64={setBase64} />}
                  </label>
                  <button
                    type="button"
                    onClick={() => setuploadImageToggle(!uploadImageToggle)}
                    className="btn btn-outline btn-sm mt-4"
                  >
                    <AiFillFileImage />
                    {uploadImageToggle ? "Close" : "Upload"}
                  </button>
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

export default EditAnnouncement;
