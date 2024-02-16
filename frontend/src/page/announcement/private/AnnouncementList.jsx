import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Spinner from "../../../components/ui/Spinner";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Unauthorized from "../../public/Unauthorized";
import { listAnnouncements } from "../../../feature/announcement/AnnouncementSlice";
import AnnounceTable from "../../../components/table/announcement/AnnouncementTable";
import Paginate from "../../../components/paginate/Paginate";

const AnnouncementList = () => {
  const { pageNumber, keyword } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [editToggle, setEditToggle] = useState(false);

  const { status, page, pages } = useSelector(
    (state) => state.announcement,
  );
  useEffect(() => {
    dispatch(listAnnouncements({ pageNumber, keyword }));
  }, [dispatch, pageNumber, keyword]);

  if (status.list === "loading") {
    return <Spinner />;
  }
  if (status.list === "failed") {
    return <div>Error loading majors</div>;
  }
  return auth?.role === "admin" ? (
    <>
      <section className="">
        <div className="container mx-auto p-4">
          <div>
            <Breadcrumbs pathname={pathname} />
          </div>
          <div className="mb-14">
            {editToggle ? null : (
              <label className="flex justify-center font-notosanslao text-4xl font-bold text-primary">
                Announcement list
              </label>
            )}
          </div>
          <div className="">
            {editToggle ? null : (
              <>
                <div className="mb-10 flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Link
                        to={
                          auth.role !== "admin"
                            ? "#"
                            : "/manage-others-data/announcement-list/add"
                        }
                      >
                        <button
                          className={`tooltipp btn btn-primary font-notosanslao text-white ${
                            auth.role !== "admin" && "btn-disabled"
                          }`}
                        >
                          Add Announcement
                          <AiFillPlusCircle size={20} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <AnnounceTable
            editToggle={editToggle}
            setEditToggle={setEditToggle}
          />
          <Paginate
            path="/manage-others-data/announcement-list/page/"
            style="mt-10"
            page={page}
            pages={pages}
          />
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default AnnouncementList;
