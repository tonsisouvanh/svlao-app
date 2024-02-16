const PaginateNoPath = ({
  setCurrentPage,
  currentPage,
  itemsPerPage,
  total,
}) => {
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumber = (pageNumber) => {
    const totalPages = Math.ceil(total / itemsPerPage);

    if (totalPages <= 5) {
      // If there are 5 or fewer pages, display all pages
      return (
        <button
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          className={`btn join-item btn-md ${
            currentPage === pageNumber && "btn-neutral"
          }`}
        >
          {pageNumber}
        </button>
      );
    } else {
      // If there are more than 5 pages, show a limited set with ellipsis
      if (
        pageNumber === 1 ||
        pageNumber === totalPages ||
        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
      ) {
        // Display the first, last, and a few pages around the current page
        return (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`btn join-item btn-md ${
              currentPage === pageNumber && "btn-neutral"
            }`}
          >
            {pageNumber}
          </button>
        );
      } else if (
        pageNumber === currentPage - 2 ||
        pageNumber === currentPage + 2
      ) {
        // Display an ellipsis for skipped pages
        return (
          <button key={pageNumber} disabled className="btn join-item btn-md">
            ...
          </button>
        );
      } else {
        // Hide other pages
        return null;
      }
    }
  };

  return (
    <div className="join">
      <button
        onClick={() => paginate(currentPage - 1)}
        className={`btn join-item btn-md ${
          currentPage === 1 && "btn-disabled"
        }`}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {Array.from({ length: Math.ceil(total / itemsPerPage) }, (_, index) =>
        renderPageNumber(index + 1),
      )}

      <button
        onClick={() => paginate(currentPage + 1)}
        className={`btn join-item btn-md ${
          currentPage === Math.ceil(total / itemsPerPage) && "btn-disabled"
        }`}
        disabled={currentPage === Math.ceil(total / itemsPerPage)}
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginateNoPath;
