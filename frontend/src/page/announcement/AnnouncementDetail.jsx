import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAnnouncementById } from "../../feature/announcement/AnnouncementSlice";
import Spinner from "../../components/ui/Spinner";
import FetchErrorModal from "../../components/modal/FetchErrorModal";
import { replaceImage } from "../../utils/utils";
import AnnouncementRelated from "./AnnouncementRelated";
import { FaEye } from "react-icons/fa";
import ReactQuill from "react-quill";
import Image from "../../components/Image";
const AnnouncementDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleAnnouncement, status } = useSelector(
    (state) => state.announcement,
  );
  const announcement = singleAnnouncement;
  const onCloseModal = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(getAnnouncementById(id));
  }, [dispatch, id]);

  if (status.fetchOne === "loading") {
    return <Spinner />;
  }
  if (status.fetchOne === "failed") {
    return (
      <FetchErrorModal
        header={"Error"}
        message={"Oops! Something went wrong, try again later"}
        onClose={onCloseModal}
        btnLable="Close"
      />
    );
  }

  return (
    <>
      {announcement ? (
        <section className="body-font text-primary-600">
          <article>
            <header className="mx-auto max-w-screen-xl pt-12 text-center">
              <div className="flex items-center justify-center gap-5">
                <p className="text-gray-500">
                  Published on{" "}
                  {new Date(announcement.timestamp).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <FaEye className="text-gray-500" />{" "}
                  <span>{announcement.views}</span>
                </div>
              </div>

              <div className="mx-auto mb-10 mt-2 flex items-center justify-center gap-10">
                {announcement?.category?.map((item) => (
                  <div key={item} className="text-sm font-medium text-primary">
                    {item}
                  </div>
                ))}
              </div>
              <h1 className="mt-2 text-3xl font-bold leading-10 text-gray-900 lg:text-4xl">
                {announcement.title}
              </h1>
              <Image
                classname="mt-10 w-full object-contain sm:h-[34rem]"
                image={announcement.image}
              />
            </header>
            <div className="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 text-lg tracking-wide text-gray-700">
              <ReactQuill
                theme="bubble"
                value={announcement.content}
                readOnly={true}
              />
            </div>
          </article>
          <div className="mx-auto mt-10 flex w-fit space-x-2">
            <div className="h-0.5 w-2 bg-gray-600" />
            <div className="h-0.5 w-32 bg-gray-600" />
            <div className="h-0.5 w-2 bg-gray-600" />
          </div>
          <aside
            aria-label="Related Articles"
            className="mx-auto mt-10 max-w-screen-xl py-20"
          >
            <AnnouncementRelated />
          </aside>
        </section>
      ) : (
        <p>Error laading data</p>
      )}
    </>
  );
};

export default AnnouncementDetail;
