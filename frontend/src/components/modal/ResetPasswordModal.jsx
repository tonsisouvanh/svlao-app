import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../typography/ErrorMessage";
import { resetPassword, userReset } from "../../feature/user/UserSlice";
const inputStyle = "input input-bordered w-full text-base-content/80";

const ResetPasswordModal = ({
  title,
  setIsModalOpen,
  isModalOpen,
  userData,
}) => {
  const initialState = {
    userId: userData.id,
    newPassword: "",
    confirmPassword: "",
    emailAddress: userData.emailAddress,
  };
  const dispatch = useDispatch();

  const { createStatus, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialState });

//   useEffect(() => {
//     if (createStatus === "succeeded") {
//       toast.success("Reset Successfully");
//       dispatch(userReset());
//       reset({});
//     } else if (createStatus === "failed") {
//       toast.error(error);
//       dispatch(userReset());
//     }
//   }, [createStatus, dispatch, error, reset]);

  const handleEditSubmit = (data) => {
    if (data) {
      if (data.newPassword !== data.confirmPassword) {
        alert("Password do not match");
      } else {
        const confirmed = window.confirm(
          "Are you sure you want to reset the password?",
        );

        if (confirmed) {
          dispatch(resetPassword({ ...data }));
          setIsModalOpen(false);
        } else {
          console.log("Reset canceled");
        }
      }
    } else {
      toast.warning("Input data not valid");
    }
  };

  return (
    <>
      <div className={`modal ${!isModalOpen ? null : "modal-open"}`}>
        <div className="modal-box font-notosanslao">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="py-4">{`Reset password for user: "${userData?.emailAddress}"`}</p>
          <form
            onSubmit={handleSubmit(handleEditSubmit)}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-full p-2">
              <label className="form-control w-full">
                <div className="label flex items-center">
                  <span className="label-text font-semibold">
                    New password
                    <span className="ml-2 text-error">*</span>
                  </span>
                  <ErrorMessage
                    styling="sm:text-md"
                    error={errors?.newPassword}
                  />
                </div>
                <input
                  {...register("newPassword", {
                    required: "Field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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
                    Confirm password
                    <span className="ml-2 text-error">*</span>
                  </span>
                  <ErrorMessage
                    styling="sm:text-md"
                    error={errors?.confirmPassword}
                  />
                </div>
                <input
                  {...register("confirmPassword", {
                    required: "Field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="text"
                  className={inputStyle}
                />
              </label>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary">Reset</button>
              <button onClick={() => setIsModalOpen(false)} className="btn">
                {"Cancel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordModal;
