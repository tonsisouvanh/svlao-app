import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Unauthorized from "../public/Unauthorized";
import StudentTable from "../../components/table/student/StudentTable";
import { BsGridFill, BsTable } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { listUsers } from "../../feature/user/UserSlice";
import Paginate from "../../components/paginate/Paginate";
import Spinner from "../../components/ui/Spinner";
import PageHeading from "../../components/PageHeading";
import { useAuth } from "../../context/AuthContext";

const StudentList = () => {
  const { pageNumber, keyword } = useParams();
  const dispatch = useDispatch();
  const {
    status: userStatus,
    users,
    page,
    pages,
  } = useSelector((state) => state.user);
  const { user: auth } = useAuth();
  const [editToggle, setEditToggle] = useState(false);

  const [view, setView] = useState("table");
  const toggleView = () => {
    setView((prevView) => (prevView === "table" ? "grid" : "table"));
  };

  useEffect(() => {
    const savedView = localStorage.getItem("viewPreference");
    if (savedView) {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewPreference", view);
  }, [view]);

  useEffect(() => {
    dispatch(listUsers({ pageNumber, keyword }));
  }, [dispatch, pageNumber, keyword]);
  if (userStatus.fetchAll === "loading") {
    return <Spinner />;
  }
  if (userStatus.fetchAll === "failed") {
    return <Unauthorized />;
  }
  return auth?.role === "admin" ? (
    <>
      <section className="relative">
        <div className="container mx-auto p-4">
          {editToggle ? null : <PageHeading title="ລາຍຊື່ນັກຮຽນ" />}
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
                            : "/dashboard/student-list/add"
                        }
                      >
                        <button
                          className={`tooltipp btn btn-primary font-notosanslao text-white ${
                            auth.role !== "admin" && "btn-disabled"
                          }`}
                        >
                          ເພີ່ມນັກຮຽນ
                          <AiFillPlusCircle size={20} />
                        </button>
                      </Link>
                    </div>
                    {editToggle ? null : (
                      <div className="">
                        {view === "table" ? (
                          <button onClick={toggleView} className="btn btn-md">
                            <BsGridFill />
                          </button>
                        ) : (
                          <button onClick={toggleView} className="btn btn-md">
                            <BsTable />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <StudentTable
            view={view}
            editToggle={editToggle}
            setEditToggle={setEditToggle}
            users={users}
            userStatus={userStatus}
            userError={userStatus}
          />
          <Paginate
            path="/dashboard/student-list/page/"
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

export default StudentList;
