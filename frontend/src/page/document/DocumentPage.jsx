import { useEffect } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listDocuments } from "../../feature/document/DocumentSlice";
import Spinner from "../../components/ui/Spinner";
import { formatDateDDMMYYYY } from "../../utils/utils";
import Paginate from "../../components/paginate/Paginate";
import EmptyState from "../../components/EmptyState";
import PageHeading from "../../components/PageHeading";
const DocumentPage = () => {
  const { pageNumber, keyword } = useParams();
  const dispatch = useDispatch();
  const { documents, status, page, pages } = useSelector(
    (state) => state.document,
  );
  useEffect(() => {
    dispatch(listDocuments({ pageNumber, keyword }));
  }, [dispatch, pageNumber, keyword]);

  if (status.fetchAll === "loading") {
    return <Spinner />;
  }
  return (
    <section className="body-font text-primary-600 overflow-hidden">
      <div className="container mx-auto px-5 py-4">
        <PageHeading title="ແບບຟອມ ແລະ ເອກະສານຕ່າງໆ" />
        {documents && documents.length > 0 ? (
          <>
            <div className="-my-8 divide-y-2 divide-gray-100">
              {documents.map((document) => (
                <div
                  key={document._id}
                  className="flex flex-wrap gap-2 py-8 md:flex-nowrap"
                >
                  <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
                    <span className="title-font text-primary-700 font-semibold">
                      {document.downloadsCount}
                    </span>
                    <span className="text-primary-500 mt-1 text-sm">
                      {formatDateDDMMYYYY(document.timestamp)}
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <p className="leading-relaxed">{document.title}</p>
                    <p className="text-xs leading-relaxed">
                      {document.description}
                    </p>
                    <a
                      target="_blank"
                      href={document.fileUrl}
                      rel="noreferrer"
                      className="btn btn-xs inline-flex items-center text-primary"
                    >
                      Download
                      <AiOutlineCloudDownload className="text-md text-xl" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <Paginate
              path="/document-form-list/page/"
              style="mt-10"
              page={page}
              pages={pages}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};

export default DocumentPage;
