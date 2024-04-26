import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Unauthorized from "../public/Unauthorized";
import { AiFillPlusCircle } from "react-icons/ai";
import UniversityTable from "../../components/table/university/UniversityTable";
import { listUniversity } from "../../feature/globalData/UniversitySlice";
import PageHeading from "../../components/PageHeading";
import { useTranslation } from "react-i18next";

const UniversityList = () => {
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.university);
  const [editToggle, setEditToggle] = useState(false);

  useEffect(() => {
    dispatch(listUniversity());
  }, [dispatch]);

  if (status.fetchAll === "loading") {
    return <Spinner />;
  }
  if (status.fetchAll === "failed") {
    return <div>Error loading universities</div>;
  }
  return auth?.role === "admin" ? (
    <>
      <section className="">
        <div className="container mx-auto p-4">
          {editToggle ? null : <PageHeading title="ຂໍ້ມູນມະຫາວິທະຍາໄລ" />}
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
                            : "/manage-others-data/university-list/add"
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
          <UniversityTable
            editToggle={editToggle}
            setEditToggle={setEditToggle}
          />
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default UniversityList;
