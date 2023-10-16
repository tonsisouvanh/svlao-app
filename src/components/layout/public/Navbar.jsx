import { useState, useEffect } from "react";
import { themes } from "../../../data/data";
import { AiFillThunderbolt, AiFillBell } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

const user = {
  role: "admin",
};
const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <header className="bg-active sticky top-0 z-[999] flex w-full">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-md md:px-6 2xl:px-11">
        <button
          className="group btn btn-sm flex flex-col items-center justify-center rounded border p-1 lg:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
        <div className="flex w-full items-center justify-center">
          <div className="join flex items-center justify-center">
            <div>
              <div>
                <input
                  className="input join-item input-bordered !bg-white"
                  placeholder="Search"
                />
              </div>
            </div>
            <select className="select join-item select-bordered !bg-white">
              <option disabled defaultValue={10}>
                Filter
              </option>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
              <option>All</option>
            </select>
            <div className="indicator">
              {/* <span className="badge indicator-item badge-secondary">new</span> */}
              <button className="btn join-item flex  !bg-white ">Search</button>
            </div>
          </div>
        </div>
        <div>
          <AiFillBell />
        </div>
        <div>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn m-1 rounded-full font-notosanslao"
            >
              <AiFillThunderbolt />
            </label>

            <ul
              tabIndex={0}
              className="menu  dropdown-content rounded-box z-[1] w-52 space-y-2 bg-base-100 p-2 shadow"
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
