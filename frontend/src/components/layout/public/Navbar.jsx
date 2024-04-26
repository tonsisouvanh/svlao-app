import { useEffect, useState } from "react";
import { AiFillBell, AiFillInfoCircle } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../../feature/auth/AuthSlice";
import altImage from "../../../assets/img/profile.png";
import { replaceImage } from "../../../utils/utils";
import LanguageSelect from "../../LanguageSelect";
import Breadcrumbs from "../../Breadcrumbs";
import { FaRegIdCard } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [theme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );
  const { auth } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      dispatch(signOut());
      navigate("/signin");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <header className="bg-active sticky top-0 z-[999] flex w-full bg-white">
      <div className="flex w-full items-center justify-between px-4 py-4 shadow-md md:px-6 2xl:px-11">
        <div className="flex items-center gap-4">
          <button
            className="group btn btn-sm flex flex-col items-center justify-center rounded border p-1 lg:invisible"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <RxHamburgerMenu className="text-2xl" />
          </button>
          <Breadcrumbs pathname={pathname} classname={"!mb-0"} />
        </div>

        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div className="indicator">
              {auth?.userStatus === "pending" && (
                <span className="badge indicator-item badge-secondary badge-xs animate-bounce">
                  <AiFillBell size={8} />
                </span>
              )}
              <label
                tabIndex={0}
                className="btn btn-circle btn-ghost btn-sm m-1 font-notosanslao"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    {auth?.profileImg ? (
                      <img
                        src={auth?.profileImg}
                        alt={auth.profileImg}
                        onError={(error) => replaceImage(error, altImage)}
                      />
                    ) : (
                      <BiUserCircle className="h-full w-full text-primary" />
                    )}
                  </div>
                </div>
              </label>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] w-40 space-y-2 bg-base-100 p-2 font-notosanslao shadow"
            >
              <Link
                className={`btn btn-ghost btn-sm relative whitespace-nowrap`}
                to={`/profile`}
              >
                <FaRegIdCard size={17} />
                <span className="mr-auto">ຂໍ້ມູນສ່ວນໂຕ</span>
                {auth?.userStatus === "pending" && (
                  <AiFillInfoCircle className="absolute right-0 top-0 text-secondary" />
                )}
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-ghost btn-sm whitespace-nowrap"
              >
                <IoLogOutOutline size={20} />
                <span className="mr-auto">ອອກຈາກລະບົບ</span>
              </button>
            </ul>
          </div>
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
