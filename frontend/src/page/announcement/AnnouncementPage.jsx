import { useDispatch, useSelector } from "react-redux";
import InfoModal from "../../components/modal/InfoModal";
import AnnouncementCarousel from "../../components/slider/AnnouncementCarousel";
import {
  countViews,
  listAnnouncements,
} from "../../feature/announcement/AnnouncementSlice";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import Paginate from "../../components/paginate/Paginate";
import { useTranslation } from "react-i18next";
import { replaceImage } from "../../utils/utils";
import images from "../../assets/img/index";
import { FaEye } from "react-icons/fa";
import EmptyState from "../../components/EmptyState";
import PageHeading from "../../components/PageHeading";
const AnnouncementPage = () => {
  const [t] = useTranslation("global");
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
              <PageHeading
                title={t("AnnouncePage.announceHeader") || "ແຈ້ງການຕ່າງໆ"}
                className="bg-transparent !text-slate-700"
              />
              <AnnouncementCarousel
                slides={[
                  "https://www.udn.vn/Portals/1/EasyDNNnews/11102/img-20.4.21.jpg",
                  "https://imagevietnam.vnanet.vn//MediaUpload/Org/2022/06/23/vna-potal-thanh-pho-ho-chi-minh-tao-moi-truong-huu-nghi-gan-ket-tinh-cam-cho-sinh-vien-lao-va-campuchia-618259923-12-9-58.jpeg",
                  "https://file3.qdnd.vn/data/images/0/2022/04/13/lehungkhoa/8d8dc4b9-7cf3-4b8c-a0ec-846a0c88d6c3.png",
                ]}
              />
              <div className="mt-10">
                {status.fetchAll === "succeeded" &&
                announcements &&
                announcements.length > 0 ? (
                  <>
                    {announcements.map((announcement) => (
                      <div
                        key={announcement._id}
                        className="mb-6 flex flex-wrap"
                      >
                        <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
                          <div
                            className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                            data-te-ripple-init=""
                            data-te-ripple-color="light"
                          >
                            <img
                              className="w-full"
                              src={announcement.image}
                              alt={announcement.title}
                              onError={(error) =>
                                replaceImage(error, images.defaultImage)
                              }
                            />
                            <Link
                              onClick={() =>
                                dispatch(countViews(announcement._id))
                              }
                              to={`/announcement-list/announcement/${announcement._id}`}
                            >
                              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98.4%,.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                            </Link>
                          </div>
                        </div>
                        <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
                          <h5 className="mb-3 text-lg font-bold">
                            {announcement.title}
                          </h5>
                          <div className="flex items-center gap-4">
                            {announcement.category.map((item) => (
                              <div
                                key={item}
                                className="text-sm font-medium text-primary"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                          <div className="mb-6 flex items-center gap-10 text-neutral-500">
                            <small>
                              Published{" "}
                              <u>
                                {new Date(
                                  announcement.timestamp,
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </u>{" "}
                            </small>
                            <p className="flex items-center justify-center gap-2">
                              <FaEye size={10} className="text-gray-500" />{" "}
                              <span className="text-sm">
                                {announcement.views}
                              </span>
                            </p>
                          </div>
                          <p
                            className="line-clamp-2 text-neutral-500"
                            dangerouslySetInnerHTML={{
                              __html: announcement.content,
                            }}
                          />
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
                ) : (
                  <EmptyState message="ບໍ່ມີຂໍ້ມູນແຈ້ງການ" />
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
