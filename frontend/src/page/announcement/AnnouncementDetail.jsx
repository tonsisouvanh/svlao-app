import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAnnouncementById } from "../../feature/announcement/AnnouncementSlice";
import Spinner from "../../components/ui/Spinner";
import FetchErrorModal from "../../components/modal/FetchErrorModal";
import consule from "../../assets/img/consule.jpg";
import { FaArrowCircleLeft } from "react-icons/fa";
import { replaceImage } from "../../utils/utils";
import LazyLoad from "react-lazy-load";
const AnnouncementDetail = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { announcements, status } = useSelector((state) => state.announcement);
  const announcement = announcements[0];
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
      <section className="body-font text-primary-600">
        <div className="p-4">
          {/* <Breadcrumbs pathname={pathname} /> */}
          <button
            onClick={() => navigate(-1)}
            className="bg-ghost btn btn-circle btn-sm"
          >
            <FaArrowCircleLeft size={20} />
          </button>
        </div>
        <div className="container mx-auto flex flex-col items-center px-5 py-20 md:flex-row">
          <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
            <h1 className="title-font text-primary-900 mb-4 text-3xl font-medium sm:text-4xl">
              {announcement?.title}
            </h1>
            <p className="mb-8 w-full max-w-full whitespace-pre-wrap text-sm leading-relaxed">
              {announcement?.content}
            </p>
            <div className="flex w-full flex-wrap items-center gap-2 p-4">
              {announcement?.category?.map((item) => (
                <div
                  key={item}
                  className="badge badge-ghost badge-md whitespace-nowrap"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
            <img
              className="rounded object-cover object-center"
              alt="img"
              src={announcement?.image}
              onError={(error) => replaceImage(error, consule)}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AnnouncementDetail;
