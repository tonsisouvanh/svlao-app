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
const inputStyle = "input input-bordered w-full text-base-content/80";

const EditAnnouncement = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { status, error, announcements } = useSelector(
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
      id: announcements[0]?._id,
      title: announcements[0]?.title,
      content: announcements[0]?.content,
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    if (status.update === "succeeded") {
      toast.success("Update Successfully");
      dispatch(announcementReset());
    } else if (status.update === "failed") {
      toast.error(error);
      dispatch(announcementReset());
    }
  }, [status.update, dispatch, error]);

  const handleEditSubmit = (data) => {
    if (data) {
      const formattedData = {
        ...data,
        category: data.category.map((item) => item.value),
      };
      dispatch(
        updateAnnouncement({ ...formattedData, _id: announcements[0]?._id }),
      );
      setToggleEdit(false);
    } else toast.warning("Input data not valid");
  };

  const handleDelete = () => {
    dispatch(removeAnnouncement(announcements[0]?._id));
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
        id: announcements[0]?._id,
        title: announcements[0]?.title,
        content: announcements[0]?.content,
      });
    } else if (status.fetchOne === "failed") {
      toast.error(error);
    }
  }, [status.fetchOne, reset, announcements, error]);
  useEffect(() => {
    setValue(
      "category",
      announcements[0]?.category?.map((c) => ({ value: c, label: c })),
    );
  }, [announcements, setValue]);

  if (status.update === "loading") {
    return <Spinner />;
  }
  if (status.fetchOne === "failed") {
    return navigate(-1);
  }
  return (
    <>
      <section className="relative">
        {announcements[0] &&
        announcements.length > 0 &&
        status.fetchAll !== "loading" ? (
          <div className="container mx-auto px-5 py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <Breadcrumbs pathname={pathname} />
              <h1 className="title-font m:text-3xl mb-4 mt-10 text-2xl font-medium">
                Edit announcement
              </h1>
              <div>
                <p className="text-xs">{announcements[0]?._id}</p>
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
