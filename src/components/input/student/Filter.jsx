const Filter = ({ filter, setFilter, options, title, fieldName }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <select
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="select select-bordered font-notosanslao "
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
