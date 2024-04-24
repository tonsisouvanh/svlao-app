import React, { useEffect, useRef, useState } from "react";
import {
  foldermanagement,
  hierarchy,
  speedometer,
  documentation,
  promotion,
  logout,
} from "../../assets/icons/index";
import { BsArrowLeft, BsFillCaretDownFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../feature/auth/AuthSlice";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { useTranslation } from "react-i18next";

const dropdownLiStyle = "hover:opacity-60 hover:bg-white/10 rounded-md";
const dropdownNavlinkStyle =
  "group relative flex items-center gap-2 px-4 py-2 font-semibold duration-300 ease-in-out";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [t] = useTranslation("global");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { auth } = useSelector((state) => state.auth);
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      dispatch(signOut());
      navigate("/signin");
    }
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
      className={`absolute left-0 top-0 z-[99999] flex h-screen w-72 flex-col overflow-y-hidden bg-slate-900 shadow-md duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="py-5.5 lg:py-6.5 flex items-center justify-between gap-2 px-6">
        <div className="mt-5 flex w-full items-center gap-16">
          <div className=" p-2">
            <a className="mb-16 whitespace-nowrap text-center font-sans text-sm font-bold normal-case text-base-200">
              <p className="text-lg">LAOS-HCM STUDENT.</p>
            </a>
          </div>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="cursor-pointer text-base-100 lg:hidden"
          >
            <BsArrowLeft className="text-3xl" />
          </button>
        </div>
      </div>
      {/* <!-- SIDEBAR MENU --> */}
      <div className="no-scrollbar flex h-full flex-col justify-between overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 text-base-100 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div className="font-notosanslao">
            <h3 className="text-bodydark2 mb-4 ml-4 text-sm font-semibold">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-2">
              {/* <!-- Menu Item Dashboard --> */}
              {auth?.role === "admin" && (
                <>
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/" && pathname.includes("dashboard")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-notosanslao font-semibold duration-300 ease-in-out ${
                              pathname.includes("dashboard") &&
                              "rounded-md bg-primary-focus text-white"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            {/* <AiOutlineDashboard size={23} /> */}
                            <img src={speedometer} className="w-6" alt="" />
                            {t("Sidebar.menu.headline").includes(".")
                              ? "ຈັດການນັກຮຽນ"
                              : t("Sidebar.menu.headline")}
                            <BsFillCaretDownFill
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-all duration-300 ${
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
                                  to="/dashboard/"
                                  className={({ isActive }) =>
                                    dropdownNavlinkStyle +
                                    (isActive &&
                                      "rounded-md border-r-2 bg-white/10 text-white")
                                  }
                                >
                                  <p className="font-normal">
                                    {t("Sidebar.menu.sublineOne").includes(".")
                                      ? "ສັງລວມນັກຮຽນ"
                                      : t("Sidebar.menu.sublineOne")}
                                  </p>
                                </NavLink>
                              </li>
                              <li className={dropdownLiStyle}>
                                <NavLink
                                  to="/dashboard/student-list/page/1"
                                  className={({ isActive }) =>
                                    dropdownNavlinkStyle +
                                    (isActive &&
                                      "rounded-md border-r-2 bg-white/10 text-white")
                                  }
                                >
                                  {/* TODO: Continue adding language */}
                                  <p className="font-normal">ລາຍຊື່ນັກຮຽນ</p>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                  <SidebarLinkGroup
                    activeCondition={
                      pathname === "/" && pathname.includes("dashboard")
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-notosanslao font-semibold duration-300 ease-in-out ${
                              pathname.includes("manage-others-data") &&
                              "rounded-md bg-primary-focus text-white"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <img
                              src={foldermanagement}
                              className="w-6"
                              alt=""
                            />
                            ຈັກການຂໍ້ມູນອື່ນຯ
                            <BsFillCaretDownFill
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-all duration-300 ${
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
                                  to="/manage-others-data/university-list"
                                  className={({ isActive }) =>
                                    dropdownNavlinkStyle +
                                    (isActive &&
                                      "rounded-md border-r-2 bg-white/10 text-white")
                                  }
                                >
                                  <p className="font-normal">ມະຫາໄລ</p>
                                </NavLink>
                              </li>
                              <li className={dropdownLiStyle}>
                                <NavLink
                                  to="/manage-others-data/major-list"
                                  className={({ isActive }) =>
                                    dropdownNavlinkStyle +
                                    (isActive &&
                                      "rounded-md border-r-2 bg-white/10 text-white")
                                  }
                                >
                                  <p className="font-normal">ຂະແໜງຮຽນ</p>
                                </NavLink>
                              </li>
                              <li className={dropdownLiStyle}>
                                <NavLink
                                  to="/manage-others-data/residence-address-list"
                                  className={({ isActive }) =>
                                    dropdownNavlinkStyle +
                                    (isActive &&
                                      "rounded-md border-r-2 bg-white/10 text-white")
                                  }
                                >
                                  <p className="font-normal">ທີ່ຢູ່ປັດຈຸບັນ</p>
                                </NavLink>
                              </li>
                              <li className={dropdownLiStyle}>
                                <NavLink
                                  to="/manage-others-data/announcement-list"
                                  className={({ isActive }) =>
                                    dropdownNavlinkStyle +
                                    (isActive &&
                                      "rounded-md border-r-2 bg-white/10 text-white")
                                  }
                                >
                                  <p className="font-normal">ປະກາດ</p>
                                </NavLink>
                              </li>
                              <li className={dropdownLiStyle}>
                                <NavLink
                                  to="/manage-others-data/document-form-list"
                                  className={({ isActive }) =>
                                    dropdownNavlinkStyle +
                                    (isActive &&
                                      "rounded-md border-r-2 bg-white/10 text-white")
                                  }
                                >
                                  <p className="font-normal">ຟອມເອກກະສານ</p>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                </>
              )}
              <li>
                <NavLink
                  to="/formal-organization"
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-semibold duration-300 ease-in-out hover:opacity-60 ${
                    pathname === "/formal-organization" &&
                    "rounded-md bg-primary-focus text-white"
                  }`}
                >
                  {/* <AiOutlineAudit size={23} /> */}
                  <img src={hierarchy} className="w-6" alt="" />
                  ອົງການຈັດຕັ້ງຕ່າງໆ
                </NavLink>
              </li>
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
                  to="/document-form-list"
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-semibold duration-300 ease-in-out hover:opacity-60 ${
                    pathname === "/document-form-list" &&
                    "rounded-md bg-primary-focus text-white"
                  }`}
                >
                  {/* <AiFillBook size={23} /> */}
                  <img src={documentation} className="w-6" alt="" />
                  ແບບຟອມເອກະສານຕ່າງໆ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-semibold duration-300 ease-in-out hover:opacity-60 ${
                    pathname === "/" && "rounded-md bg-primary-focus text-white"
                  }`}
                >
                  {/* <AiFillSound size={23} /> */}
                  <img src={promotion} className="w-6" alt="" />
                  ປະກາດ
                </NavLink>
              </li>
              {/* <li>
                <button
                  onClick={handleSignOut}
                  type="button"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-semibold duration-300 ease-in-out hover:opacity-60`}
                >
                  <img src={logout} className="w-6" alt="" />
                  ອອກຈາກລະບົບ
                </button>
              </li> */}
              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        <div className="mb-10 px-5 font-notosanslao">
          <button
            onClick={handleSignOut}
            type="button"
            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-semibold duration-300 ease-in-out hover:opacity-60`}
          >
            <img src={logout} className="w-6" alt="" />
            <span className="text-base-100">ອອກຈາກລະບົບ</span>
          </button>
        </div>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
