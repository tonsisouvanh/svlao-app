import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = ({ filter, setFilter }) => {
  return (
    <div className="join flex items-center justify-center">
      <div>
        <div>
          <input
            className="input join-item bg-base-300 focus:outline-none"
            placeholder="Search"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="indicator">
        <button className="btn join-item select-bordered   bg-base-300 ">
          <AiOutlineSearch />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
