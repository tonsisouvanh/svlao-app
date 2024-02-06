import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  style = "",
  path,
}) => {
  return (
    pages > 1 && (
      <div className={`join ${style}`}>
        {[...Array(pages).keys()].map((x) => (
          <Link key={x + 1} to={`${path}${x + 1}`}>
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
