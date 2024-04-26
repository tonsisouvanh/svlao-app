import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  announcementReset,
  getAnnouncementById,
  removeAnnouncement,
  updateAnnouncement,
} from "../../../feature/announcement/AnnouncementSlice";
import ErrorMessage from "../../../components/typography/ErrorMessage";
import Spinner from "../../../components/ui/Spinner";
import { announcementCategoryList } from "../../../data/data";
import ImageUpload from "../../../components/input/ImageUpload";
import QuillEditor from "./QuillEditor";
import PageHeading from "../../../components/PageHeading";
import { replaceImage } from "../../../utils/utils";
import images from "../../../assets/img";
import { BiUserCircle } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import ViewImageModal from "../../../components/ViewImageModal";
const inputStyle = "input input-bordered w-full text-base-content/80";

const EditAnnouncement = () => {
  const [base64, setBase64] = useState(null);
  const [currentViewImage, setCurrentViewImage] = useState(null);
  const [uploadImageToggle, setuploadImageToggle] = useState(false);
  const [viewImageToggle, setViewImageToggle] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

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
        content: data.quillContent,
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
        quillContent: singleAnnouncement?.content,
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
      <ViewImageModal
        viewImageToggle={viewImageToggle}
        setViewImageToggle={setViewImageToggle}
        image={currentViewImage}
      />
      <section className="relative">
        {singleAnnouncement &&
        singleAnnouncement &&
        status.fetchAll !== "loading" ? (
          <div className="container mx-auto px-5 py-14">
            <div className="mb-ູ flex w-full flex-col text-center">
              <PageHeading title="ແກ້ໄຂຂ່າວສານ" />
            </div>
            <div className="flex items-center justify-center gap-2">
              {uploadImageToggle && <ImageUpload setBase64={setBase64} />}
              <div className="relative border">
                {base64 ? (
                  <div className="h-36 w-36">
                    <img
                      src={base64}
                      alt={"avatar"}
                      onError={(error) => replaceImage(error, images.altImage)}
                    />
                  </div>
                ) : (
                  <div className="h-36 w-36">
                    {singleAnnouncement?.image ? (
                      <img
                        src={singleAnnouncement?.image}
                        alt={singleAnnouncement?.image}
                        className="h-full w-full object-cover"
                        onError={(error) =>
                          replaceImage(error, images.altImage)
                        }
                      />
                    ) : (
                      <BiUserCircle className="h-full w-full text-primary" />
                    )}
                  </div>
                )}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <button
                    onClick={() => setuploadImageToggle(!uploadImageToggle)}
                    className="btn btn-xs "
                  >
                    <BsPencilSquare className="" />
                  </button>
                  <button
                    onClick={() => {
                      setViewImageToggle(!viewImageToggle);
                      setCurrentViewImage(singleAnnouncement?.image);
                    }}
                    className="btn btn-xs"
                  >
                    <FaEye className="" />
                  </button>
                </div>
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
                    <Controller
                      name="quillContent"
                      control={control}
                      defaultValue={singleAnnouncement?.content}
                      render={({ field, fieldState }) => (
                        <QuillEditor
                          field={field}
                          fieldState={fieldState}
                          label="Content"
                          placeholder="Type your content here..."
                        />
                      )}
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
