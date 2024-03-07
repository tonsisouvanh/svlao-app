import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAnnouncementById } from "../../feature/announcement/AnnouncementSlice";
import Spinner from "../../components/ui/Spinner";
import FetchErrorModal from "../../components/modal/FetchErrorModal";
import consule from "../../assets/img/consule.jpg";
import { FaArrowCircleLeft } from "react-icons/fa";
import { formatDateDDMMYYYY, replaceImage } from "../../utils/utils";
import AnnouncementRelated from "./AnnouncementRelated";
const AnnouncementDetail = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { pathname } = useLocation();
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
      {announcement && (
        <section className="body-font text-primary-600">
          <article>
            <header className="mx-auto max-w-screen-xl pt-28 text-center">
              <p className="text-gray-500">
                {formatDateDDMMYYYY(announcement.timestamp)}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
                {announcement.title}
              </h1>
              <div
                className="mt-6 flex flex-wrap justify-center gap-2"
                aria-label="Tags"
              >
                {announcement &&
                  announcement.lenght > 0 &&
                  announcement.category.map((item, index) => (
                    <button
                      key={index}
                      className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200"
                    >
                      {item}
                    </button>
                  ))}
              </div>
              <img
                className="mt-10 w-full object-contain sm:h-[34rem]"
                alt={announcement.title}
                src={announcement.image}
                onError={(error) => replaceImage(error, consule)}
              />
            </header>
            <div className="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 text-lg tracking-wide text-gray-700">
              <p>{announcement.content}</p>
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
      )}
    </>
  );
};

export default AnnouncementDetail;
