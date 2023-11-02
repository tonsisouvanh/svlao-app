import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const ColumnFilter = ({ column, title, fieldName, options }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="join flex items-center justify-center">
      <div>
        <div>
          <input
            className="input input-xs join-item bg-base-300 focus:outline-none"
            placeholder="Search"
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="indicator">
        <button className="btn btn-xs join-item select-bordered   bg-base-300 ">
          <AiOutlineSearch />
        </button>
      </div>
    </div>

    // <div className="form-control w-fit max-w-xs">
    //   <select
    //     value={filterValue || ""}
    //     onChange={(e) => setFilter(e.target.value)}
    //     className="select select-bordered font-notosanslao "
    //   >
    //     <option disabled value="">
    //       {title}
    //     </option>
    //     {options.map((ele, index) => (
    //       <option key={index} value={ele[fieldName]}>
    //         {ele[fieldName]}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
};

export default ColumnFilter;
