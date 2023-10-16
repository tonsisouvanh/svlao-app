import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { BsArrowLeft, BsFillCaretDownFill } from "react-icons/bs";
import {
  AiFillDashboard,
  AiOutlinePhone,
  AiFillBook,
  AiOutlineLogout,
  AiOutlineAudit,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../feature/auth/AuthSlice";
import { auth } from "../../firebase";

const dropdownLiStyle = "hover:text-white hover:bg-white/10 rounded-md";
const dropdownNavlinkStyle =
  "group relative flex items-center gap-2 px-4 py-2 font-medium duration-300 ease-in-out";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  const handleSignOut = () => {
    dispatch(signOutUser());
    navigate("/signin");
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[99999] flex h-screen w-72 flex-col overflow-y-hidden bg-primary duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="py-5.5 lg:py-6.5 flex items-center justify-between gap-2 px-6">
        <div className="mt-5 flex w-full items-center gap-16">
          {/* <NavLink className="flex w-full justify-center bg-white py-3" to="/">
            <img className="w-32" src={Logo} alt="Logo" />
          </NavLink> */}
          <div className="bg-white p-2">
            <a className="mb-16 whitespace-nowrap text-center font-notosanslao text-sm font-bold normal-case !text-neutral ">
              <p>LAO STUDENT HCM</p>
            </a>
          </div>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="cursor-pointer text-3xl lg:hidden"
          >
            <BsArrowLeft className="text-3xl" />
          </button>
        </div>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 text-base-100 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div className="font-notosanslao">
            <h3 className="text-bodydark2 mb-4 ml-4 text-sm font-semibold">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-2">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-notosanslao font-medium text-white duration-300 ease-in-out ${
                          (pathname === "/" || pathname.includes("/")) &&
                          "rounded-md bg-primary-focus"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        {/* <AiOutlineDashboard size={23} /> */}
                        <AiFillDashboard size={23} />
                        ຂໍ້ມູນນັກຮຽນ
                        <BsFillCaretDownFill
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li className={dropdownLiStyle}>
                            <NavLink
                              to="/dashboard"
                              className={({ isActive }) =>
                                dropdownNavlinkStyle +
                                (isActive && "border-r-2 !text-white")
                              }
                            >
                              ສັງລວມນັກຮຽນ
                            </NavLink>
                          </li>
                          <li className={dropdownLiStyle}>
                            <NavLink
                              to="/studentlist"
                              className={({ isActive }) =>
                                dropdownNavlinkStyle +
                                (isActive && "border-r-2 !text-white")
                              }
                            >
                              ລາຍຊື່ນັກຮຽນ
                            </NavLink>
                          </li>
                        </ul>
                      </div>

                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}
              {/* <!-- Menu Item Items --> */}

              {/* <!-- Menu Item Items --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to={`/profile/${1}`}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaUser size={23} />
                  ໂປຮຟາຍ
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/establishment"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <AiOutlineAudit size={23} />
                  ອົງການຈັດຕັ້ງຕ່າງໆ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <AiOutlinePhone size={23} />
                  ຕິດຕໍ່
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div className="font-notosanslao">
            <h3 className="text-bodydark2 mb-4 ml-4 text-sm font-semibold">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-2">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <NavLink
                  to="/documents"
                  target="_blank"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:text-white ${
                    pathname.includes("/") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <AiFillBook size={23} />
                  ແບບຟອມເອກະສານຕ່າງໆ
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  type="button"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:text-white`}
                >
                  <AiOutlineLogout size={23} />
                  ອອກຈາກລະບົບ
                </button>
              </li>
              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
