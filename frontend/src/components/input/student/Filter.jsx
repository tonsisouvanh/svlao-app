import { useEffect, useState } from "react";

const Filter = ({ filter, setFilter, options, title, fieldName }) => {
  const [sortedOptions, setsortedOptions] = useState(options || []);
  const sortArray = () => {
    const sortedArray = [...sortedOptions].sort((a, b) =>
      a[fieldName].localeCompare(b[fieldName]),
    );
    setsortedOptions(sortedArray);
  };

  useEffect(() => {
    sortArray();
  }, []);
  return (
    <div className="form-control w-fit max-w-xs">
      <select
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="select select-bordered select-sm font-notosanslao focus:outline-none"
      >
        <option disabled value="">
          {title}
        </option>
        {sortedOptions &&
          sortedOptions?.map((ele, index) => (
            <option key={index} value={ele[fieldName]}>
              {ele[fieldName]}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Filter;
