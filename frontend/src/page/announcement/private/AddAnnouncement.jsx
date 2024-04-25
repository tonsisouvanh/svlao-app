import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  announcementReset,
  createAnnouncement,
} from "../../../feature/announcement/AnnouncementSlice";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ErrorMessage from "../../../components/typography/ErrorMessage";
import Spinner from "../../../components/ui/Spinner";
import Select from "react-select";
import { announcementCategoryList } from "../../../data/data";
import ImageUpload from "../../../components/input/ImageUpload";

import QuillEditor from "./QuillEditor";
import PageHeading from "../../../components/PageHeading";

const inputStyle = "input input-bordered w-full text-base-content/80";

const AddAnnouncement = () => {
  const [base64, setBase64] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.announcement);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({});

  useEffect(() => {
    if (status.create === "succeeded") {
      toast.success("Create Successfully");
      dispatch(announcementReset());
      reset({});
      navigate(-1);
    } else if (status.create === "failed") {
      toast.error(error);
      dispatch(announcementReset());
    }
  }, [status.create, dispatch, error, navigate, reset]);

  const clearImage = () => {
    setBase64(null);
  };

  const handleCreateSubmit = (data) => {
    if (data) {
      const addImage = base64 ? [base64] : null;

      const formattedData = {
        ...data,
        content: data.quillContent,
        image: addImage ? addImage : [],
        category: data?.category?.map((item) => item.value) || [],
      };
      const confirmed = window.confirm(
        "Are you sure you want to update the announcement?",
      );

      if (confirmed) {
        dispatch(createAnnouncement({ ...formattedData }));
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
              <PageHeading title="ເພີ່ມຂໍ້ມູນຂ່າວສານ"/>
            </div>
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit(handleCreateSubmit)}
                className="flex flex-col items-center justify-center"
              >
                <div className="flex items-center justify-center gap-4">
                  <ImageUpload setBase64={setBase64} />
                  {base64 && (
                    <img
                      className="h-36 w-36 rounded-md object-cover"
                      src={base64}
                    ></img>
                  )}
                </div>
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
                      defaultValue=""
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
                      //   rules={{ required: "Field required" }}
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

export default AddAnnouncement;
