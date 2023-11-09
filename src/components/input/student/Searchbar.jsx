import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const Searchbar = ({ filter, setFilter }) => {
  return (
    <div className="join flex items-center justify-center font-notosanslao">
      <div>
        <div>
          <input
            className="input join-item input-sm bg-base-300 focus:outline-none"
            placeholder="ພິມຄົ້ນຫາ"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="indicator">
        <button
          onClick={() => setFilter("")}
          className={"btn join-item select-bordered btn-sm bg-base-300 p-0 "}
        >
          <AiOutlineClose />
        </button>
        <button className="btn join-item select-bordered btn-sm bg-base-300 ">
          <AiOutlineSearch />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
