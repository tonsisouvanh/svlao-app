import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAnnouncements } from "../../feature/announcement/AnnouncementSlice";
import Spinner from "../../components/ui/Spinner";
import { Link, useParams } from "react-router-dom";

const AnnouncementRelated = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { announcements, status } = useSelector((state) => state.announcement);
  const announcementData = announcements
    .filter((announcement) => announcement._id !== id)
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  useEffect(() => {
    dispatch(listAnnouncements({}));
  }, [dispatch]);

  if (status.fetchAll === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <h2 className="mb-8 text-center text-5xl font-bold text-gray-900">
        ຂ່າວສານອື່ນໆ
      </h2>
      <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
        {announcementData.map((announcement) => (
          <article
            key={announcement._id}
            className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg"
          >
            <Link to={`/announcement-list/announcement/${announcement._id}`}>
              <img
                src={announcement.image}
                className="h-56 w-full object-cover"
                alt=""
              />
              <div className="flex-auto px-6 py-5">
                <span className="mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  {announcement.category[0]}
                </span>
                <h3 className="mb-3 mt-4 line-clamp-2 text-xl font-semibold xl:text-2xl">
                  {announcement.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-base font-light">
                  {announcement.content}
                </p>
                <span className="btn btn-neutral btn-md">ອ່ານ</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
};

export default AnnouncementRelated;
