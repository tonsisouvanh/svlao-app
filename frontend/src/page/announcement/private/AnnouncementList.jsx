import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Spinner from "../../../components/ui/Spinner";
import Unauthorized from "../../public/Unauthorized";
import { listAnnouncements } from "../../../feature/announcement/AnnouncementSlice";
import AnnounceTable from "../../../components/table/announcement/AnnouncementTable";
import Paginate from "../../../components/paginate/Paginate";
import EmptyState from "../../../components/EmptyState";
import PageHeading from "../../../components/PageHeading";
import { useTranslation } from "react-i18next";

const AnnouncementList = () => {
  const [t] = useTranslation("global");
  const { pageNumber, keyword } = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [editToggle, setEditToggle] = useState(false);

  const { status, page, pages, announcements } = useSelector(
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
          {editToggle ? null : <PageHeading title="ຂໍ້ມູນຂ່າວສານ" />}

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
                          {t("AddButton")}
                          <AiFillPlusCircle size={20} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {announcements && announcements.length > 0 ? (
            <>
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
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default AnnouncementList;
