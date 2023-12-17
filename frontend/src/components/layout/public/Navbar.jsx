import { useState, useEffect } from "react";
import { themes } from "../../../data/data";
import { AiFillBell, AiFillInfoCircle } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { GiCupcake } from "react-icons/gi";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { signOutUser } from "../../../feature/auth/AuthSlice";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(user);
  // const userData = JSON.parse(
  //   sessionStorage.getItem("userData")
  //     ? sessionStorage.getItem("userData")
  //     : null,
  // );
  const handleSignOut = () => {
    dispatch(signOutUser());
    navigate("/signin");
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("userData")));
  }, [user]);
  return (
    <header className="bg-active sticky top-0 z-[999] flex w-full bg-base-100">
      {/* <header className="bg-active sticky top-0 z-[999] flex w-full bg-base-100"> */}
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
              {userData?.userStatus === "pending" && (
                <span className="badge indicator-item badge-secondary badge-xs animate-bounce">
                  <AiFillBell size={8} />
                </span>
              )}
              <label
                tabIndex={0}
                className="btn btn-circle btn-ghost btn-sm m-1 font-notosanslao"
              >
                <div className="avatar placeholder">
                  <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                    <span className="text-md">
                      {userData?.email ? (
                        userData?.email[0].toUpperCase()
                      ) : (
                        <Spinner />
                      )}
                    </span>
                  </div>
                </div>
              </label>
              {/* <div className="avatar placeholder online">
                <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                  <span className="text-md">{userData.email[0]}</span>
                </div>
              </div> */}
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] w-fit space-y-2 border border-primary-focus bg-base-100 p-2 font-notosanslao shadow"
            >
              <Link
                className={`btn btn-ghost btn-sm relative whitespace-nowrap`}
                to={`/profile/${userData?.role}`}
              >
                Profile
                {userData?.userStatus === "pending" && (
                  <AiFillInfoCircle className="absolute right-0 top-0 text-secondary" />
                )}
              </Link>
              <Link
                className="btn btn-ghost btn-sm whitespace-nowrap"
                to="/profile"
              >
                Setting
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-ghost btn-sm whitespace-nowrap"
                to="/profile"
              >
                Log out
              </button>
            </ul>
          </div>
        </div>
      </div>
    </header>

    // <div className="navbar fixed top-0 bg-primary ">
    //   {/* <div>
    //     <div className="dropdown">
    //       <label tabIndex={0} className="btn m-1 rounded-full font-notosanslao">
    //         Theme
    //       </label>
    //       <div className="btn rounded-full font-notosanslao">
    //         <li>
    //           <Link to="/login">Login</Link>
    //         </li>
    //       </div>
    //       <ul
    //         tabIndex={0}
    //         className="dropdown-content  space-y-2 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    //       >
    //         {themes.map((theme) => (
    //           <li
    //             className="btn btn-xs w-fit"
    //             onClick={() => setTheme(theme)}
    //             key={theme}
    //           >
    //             {theme}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div> */}
    //   <div className="flex items-center justify-end w-full">
    //   <div className="join flex justify-end items-center ">
    //     <div>
    //       <div>
    //         <input
    //           className="input input-bordered join-item !bg-white"
    //           placeholder="Search"
    //         />
    //       </div>
    //     </div>
    //     <select className="select select-bordered join-item !bg-white">
    //       <option disabled defaultValue={10}>
    //         Filter
    //       </option>
    //       <option>10</option>
    //       <option>20</option>
    //       <option>30</option>
    //       <option>40</option>
    //       <option>50</option>
    //       <option>All</option>
    //     </select>
    //     <div className="indicator">
    //       <span className="indicator-item badge badge-secondary">new</span>
    //       <button className="btn join-item !bg-white  flex ">Search</button>
    //     </div>
    //   </div>
    //   </div>

    //   {/* <div className="navbar-center hidden lg:flex !text-white ">
    //     <ul className="menu menu-horizontal px-1 text-xl font-notosanslao">
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About</Link>
    //       </li>
    //       <li>
    //         <a>Contact</a>
    //       </li>
    //     </ul>
    //   </div> */}
    // </div>
  );
};

export default Navbar;
