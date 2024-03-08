import { Link } from "react-router-dom";

const Paginate = ({ pages, page, style = "", path }) => {
  const renderPageNumber = (pageNumber) => {
    return (
      <Link key={pageNumber} to={`${path}${pageNumber}`}>
        <button
          className={`btn join-item btn-sm ${
            pageNumber === page ? "btn-primary btn-active" : ""
          }`}
        >
          {pageNumber}
        </button>
      </Link>
    );
  };

  const renderEllipsis = () => {
    return (
      <button key="ellipsis" className="btn join-item btn-sm">
        ...
      </button>
    );
  };

  const renderPrevButton = () => {
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    return (
      <Link key="prev" to={`${path}${prevPage}`} disabled={page === 1}>
        <button className={`btn join-item btn-sm`} disabled={page === 1}>
          &lt;
        </button>
      </Link>
    );
  };

  const renderNextButton = () => {
    const nextPage = page + 1 <= pages ? page + 1 : pages;
    return (
      <Link key="next" to={`${path}${nextPage}`} disabled={page === pages}>
        <button className={`btn join-item btn-sm`} disabled={page === pages}>
          &gt;
        </button>
      </Link>
    );
  };

  return (
    <div className={`join ${style}`}>
      {renderPrevButton()}
      {[...Array(pages).keys()].map((x) => {
        if (pages <= 5 || x + 1 === page || x + 1 === 1 || x + 1 === pages) {
          return renderPageNumber(x + 1);
        } else if (x + 1 >= page - 1 && x + 1 <= page + 1) {
          return renderPageNumber(x + 1);
        } else if (x + 1 === page - 2 || x + 1 === page + 2) {
          return renderEllipsis();
        } else {
          return null;
        }
      })}
      {renderNextButton()}
    </div>
  );
};

export default Paginate;
