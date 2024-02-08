import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const DocumentForm = () => {
  const navigate = useNavigate();
  return (
    // <div className="container mx-auto mt-8">
    //   <h1 className="mb-6 text-3xl font-semibold">Document Forms</h1>

    //   <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    //     {documentForms.map((form, index) => (
    //       <li key={index} className="rounded-md border p-4">
    //         <h2 className="mb-2 text-lg font-medium">{form.name}</h2>
    //         <a
    //           href={form.link}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-blue-500 hover:underline"
    //         >
    //           Download Form
    //         </a>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <section className="body-font text-primary-600 overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="bg-ghost btn btn-circle btn-sm"
      >
        <FaArrowCircleLeft size={20} />
      </button>
      <div className="container mx-auto px-5 py-20">
        <h2 className="title-font text-primary-900 mb-10 text-2xl font-bold">
          All documents form
        </h2>
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="flex flex-wrap py-8 md:flex-nowrap">
            <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
              <span className="title-font text-primary-700 font-semibold">
                CATEGORY
              </span>
              <span className="text-primary-500 mt-1 text-sm">12 Jun 2019</span>
            </div>
            <div className="md:flex-grow">
              <p className="leading-relaxed">Visa extend form NA5</p>
              <button className="btn btn-xs mt-4 inline-flex items-center text-primary">
                Download
                <AiOutlineCloudDownload className="text-md text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentForm;
