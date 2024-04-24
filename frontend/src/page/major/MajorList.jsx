import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Unauthorized from "../public/Unauthorized";
import { AiFillPlusCircle } from "react-icons/ai";
import Breadcrumbs from "../../components/Breadcrumbs";
import MajorTable from "../../components/table/major/MajorTable";
import { listMajor } from "../../feature/globalData/MajorSlice";
import PageHeading from "../../components/PageHeading";

const MajorList = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { auth } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.major);
  const [editToggle, setEditToggle] = useState(false);
  useEffect(() => {
    dispatch(listMajor());
  }, [dispatch]);
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
          {editToggle ? null : <PageHeading title="ຂໍ້ມູນຂະແໜງຮຽນ" />}
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
                            : "/manage-others-data/major-list/add"
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
          <MajorTable editToggle={editToggle} setEditToggle={setEditToggle} />
        </div>
      </section>
    </>
  ) : (
    <Unauthorized />
  );
};

export default MajorList;
