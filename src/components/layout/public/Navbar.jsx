import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { themes } from "../../../data/data";
const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  //   const handleToggle = (e) => {
  //     if (e.target.checked) {
  //       setTheme("dark");
  //     } else {
  //       setTheme("light");
  //     }
  //   };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="navbar fixed top-0 bg-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <a className="btn btn-ghost normal-case text-2xl !text-white ">
          LAO STU
        </a>
      </div>
      <div className="navbar-center hidden lg:flex !text-white ">
        <ul className="menu menu-horizontal px-1 text-xl">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex-none">
          {/* <button className="btn btn-square btn-ghost">
            <label className="swap swap-rotate w-12 h-12">
              <input
                type="checkbox"
                onChange={handleToggle}
                checked={theme === "light" ? false : true}
              />
              <FaSun className="w-8 h-8 swap-on" />
              <FaMoon className="w-8 h-8 swap-off" />
            </label>
          </button> */}
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 rounded-full">
              Theme
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content w-fit space-y-2 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {themes.map((theme) => (
                <li
                  className="btn btn-xs w-fit"
                  onClick={() => setTheme(theme)}
                  key={theme}
                >
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a className="btn rounded-full">Admin</a>
      </div>
    </div>
  );
};

export default Navbar;
