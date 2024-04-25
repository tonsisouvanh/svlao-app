import { FaArrowLeft } from "react-icons/fa";

const PageHeading = ({ title = "Page title", className }) => {
  return (
    <div
      className={`bg-base-200d relative mb-16 flex items-center justify-center rounded-md border py-4 text-slate-700 ${className}`}
    >
      <div className="absolute left-2">
        <button className="btn btn-ghost">
          <FaArrowLeft />
        </button>
      </div>
      <h1 className="title-font text-base-contentd text-center font-notosanslao text-2xl font-bold sm:text-4xl">
        {title}
      </h1>
    </div>
  );
};

export default PageHeading;
