import { useDispatch, useSelector } from "react-redux";
import InfoModal from "../../components/modal/InfoModal";
import ActivitySlider from "../../components/slider/ActivitySlider";
import { listAnnouncements } from "../../feature/announcement/AnnouncementSlice";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import Paginate from "../../components/paginate/Paginate";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import ScrollToTop from "../../components/ScrollToTop";

const AnnouncementPage = () => {
  const [t, i18n] = useTranslation("global");
  const { pageNumber, keyword } = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { announcements, status, page, pages } = useSelector(
    (state) => state.announcement,
  );
  useEffect(() => {
    dispatch(listAnnouncements({ pageNumber, keyword }));
  }, [dispatch, pageNumber, keyword]);

  if (status.fetchAll === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <div>
        {auth?.userStatus === "pending" && auth?.role === "student" ? (
          <InfoModal
            title={"ແຈ້ງເຕືອນ"}
            modaltype={"info"}
            conditionData={auth}
            desc={"ກາລຸນນາອັບເດດຂໍ້ມູນ"}
            initialValue={true}
          />
        ) : null}

        <section className="body-font overflow-hidden">
          <div className="container mx-auto p-3">
            <div className="">
              <h1 className="title-font mb-10 text-center font-notosanslao text-base font-bold sm:text-3xl">
                {t("AnnouncePage.announceHeader") || "ແຈ້ງການຕ່າງໆ"}
              </h1>
              <ActivitySlider
                slides={[
                  "https://www.udn.vn/Portals/1/EasyDNNnews/11102/img-20.4.21.jpg",
                  "https://imagevietnam.vnanet.vn//MediaUpload/Org/2022/06/23/vna-potal-thanh-pho-ho-chi-minh-tao-moi-truong-huu-nghi-gan-ket-tinh-cam-cho-sinh-vien-lao-va-campuchia-618259923-12-9-58.jpeg",
                  "https://file3.qdnd.vn/data/images/0/2022/04/13/lehungkhoa/8d8dc4b9-7cf3-4b8c-a0ec-846a0c88d6c3.png",
                ]}
              />
              <div className="mt-10">
                {status.fetchAll === "succeeded" && (
                  <>
                    {announcements.map((announcement) => (
                      <div
                        key={announcement._id}
                        className="flex flex-wrap py-8 md:flex-nowrap"
                      >
                        <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
                          <span className="title-font text-base-600 font-semibold">
                            {t("AnnouncePage.announceLeftNoti") || "Announce"}
                            <div className="indicator">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                              </svg>
                              <span className="badge indicator-item badge-primary badge-xs"></span>
                            </div>
                          </span>
                          <span className="mt-1 text-sm text-gray-500">
                            {new Date(
                              announcement.timestamp,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="md:flex-grow">
                          <h2 className="title-font mb-2 text-2xl font-bold">
                            {announcement.title}
                          </h2>
                          <p className="truncate leading-relaxed">
                            {announcement.content}
                          </p>
                          <Link
                            to={`/announcement-list/announcement/${announcement._id}`}
                            className="btn-link mt-4 inline-flex items-center text-primary-focus"
                          >
                            See more
                            <AiOutlineArrowRight className="ml-2" />
                          </Link>
                        </div>
                      </div>
                    ))}
                    <Paginate
                      path="/announcement-list/page/"
                      style="mt-10"
                      page={page}
                      pages={pages}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnnouncementPage;
