// type ErrorMessageProps = {
//   error: FieldError | string | undefined;
//   styling?: string;
// };

const ErrorMessage = ({ styling, error }) => {
  if (!error) {
    return null;
  }
  if (typeof error === "string") {
    return (
      <p
        className={"label-text text-xs italic text-red-500 " + styling}
        role="alert"
      >
        {error}
      </p>
    );
  } else if ("message" in error) {
    return (
      <p
        className={"label-text text-xs italic text-red-500 " + styling}
        role="alert"
      >
        {error.message}
      </p>
    );
  }

  return null;
};

export default ErrorMessage;
