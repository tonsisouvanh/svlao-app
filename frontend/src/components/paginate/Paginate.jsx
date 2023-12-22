import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="join">
        {[...Array(pages).keys()].map((x) => (
          <Link key={x + 1} to={`/dashboard/studentlist/page/${x + 1}`}>
            <button
              className={`btn join-item ${
                x + 1 === page && "btn-primary btn-active"
              }`}
            >
              {x + 1}
            </button>
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
