const Filter = ({ filter, setFilter, options, title, fieldName }) => {
  return (
    <div className="form-control max-w-xs w-fit">
      <select
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="select select-sm select-bordered font-notosanslao focus:outline-none"
      >
        <option disabled value="">
          {title}
        </option>
        {options.map((ele, index) => (
          <option key={index} value={ele[fieldName]}>
            {ele[fieldName]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;