import { useState, useEffect } from "react";
import { themes } from "../../../data/data";
import { AiFillBell, AiFillInfoCircle } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { GiCupcake } from "react-icons/gi";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { signOut } from "../../../feature/auth/AuthSlice";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );
  const { auth } = useSelector((state) => state.auth);
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <header className="bg-active sticky top-0 z-[999] flex w-full bg-base-100">
      <div className="flex w-full items-center justify-between px-4 py-4 shadow-md md:px-6 2xl:px-11">
        <button
          className="group btn btn-sm flex flex-col items-center justify-center rounded border p-1 lg:invisible"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>

        <div className="flex items-center gap-2">
          <div>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn rounded-btn btn-sm m-1 font-notosanslao"
              >
                {theme === "cupcake" ? (
                  <GiCupcake size={16} />
                ) : theme === "night" ? (
                  <BiSolidMoon size={16} />
                ) : (
                  <BiSolidSun size={16} />
                )}
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box z-[1] w-fit space-y-2 bg-base-100 p-2 shadow"
              >
                {themes.map((theme) => (
                  <div
                    className="btn btn-xs w-fit"
                    onClick={() => setTheme(theme)}
                    key={theme}
                  >
                    {theme === "cupcake" ? (
                      <GiCupcake size={16} />
                    ) : theme === "night" ? (
                      <BiSolidMoon size={16} />
                    ) : (
                      <BiSolidSun size={16} />
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="dropdown-end dropdown">
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
                {/* <div className="avatar placeholder">
                  <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                    <span className="text-md">
                      {auth ? auth?.emailAddress[0].toUpperCase() : <Spinner />}
                    </span>
                  </div>
                </div> */}
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={auth.profileImg} />
                  </div>
                </div>
              </label>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] w-fit space-y-2 border border-primary-focus bg-base-100 p-2 font-notosanslao shadow"
            >
              <Link
                className={`btn btn-ghost btn-sm relative whitespace-nowrap`}
                to={`/profile`}
              >
                Profile
                {auth?.userStatus === "pending" && (
                  <AiFillInfoCircle className="absolute right-0 top-0 text-secondary" />
                )}
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-ghost btn-sm whitespace-nowrap"
              >
                Log out
              </button>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
