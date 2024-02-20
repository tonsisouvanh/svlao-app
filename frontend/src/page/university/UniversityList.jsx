import { Link, useLocation } from "react-router-dom";
import {  useSelector } from "react-redux";
import {  useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Unauthorized from "../public/Unauthorized";
import { AiFillPlusCircle } from "react-icons/ai";
import Breadcrumbs from "../../components/Breadcrumbs";
import UniversityTable from "../../components/table/university/UniversityTable";

const UniversityList = () => {
  const { pathname } = useLocation();
  const { auth } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.university);
  const [editToggle, setEditToggle] = useState(false);


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
          <div>
            <Breadcrumbs pathname={pathname} />
          </div>
          <div className="mb-14">
            {editToggle ? null : (
              <label className="flex justify-center font-notosanslao text-4xl font-bold text-primary">
                Unviersity list
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
                            : "/manage-others-data/university-list/add"
                        }
                      >
                        <button
                          className={`tooltipp btn btn-primary font-notosanslao text-white ${
                            auth.role !== "admin" && "btn-disabled"
                          }`}
                        >
                          Add
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
