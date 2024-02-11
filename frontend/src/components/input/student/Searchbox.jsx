import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Searchbox = ({ filter, setFilter }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/dashboard/student-list/search/${keyword}`);
    } else {
      navigate(`/dashboard/student-list`);
    }
  };
  return (
    // <div className="join flex items-center justify-center font-notosanslao">
    //   <div>
    //     <div>
    //       <input
    //         className="input join-item input-sm bg-base-300 focus:outline-none"
    //         placeholder="ພິມຄົ້ນຫາ"
    //         value={filter || ""}
    //         onChange={(e) => setFilter(e.target.value)}
    //       />
    //     </div>
    //   </div>
    //   <div className="indicator">
    //     <button
    //       onClick={() => setFilter("")}
    //       className={`btn join-item select-bordered btn-sm bg-base-300 p-0 ${
    //         filter === undefined || filter === ""
    //           ? "hidden"
    //           : null
    //       }`}
    //     >
    //       <AiOutlineClose />
    //     </button>
    //     <button className="btn join-item select-bordered btn-sm bg-base-300 ">
    //       <AiOutlineSearch />
    //     </button>
    //   </div>
    // </div>
    <form onSubmit={submitHandler} action="">
      <div className="join">
        <div>
          <div>
            <input
              className="input join-item input-bordered input-sm focus:outline-none"
              placeholder="MSSV, Name, and email"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className="indicator">
          <button type="submit" className="btn btn-primary join-item btn-sm">
            ຄົ້ນຫາ
          </button>
        </div>
      </div>
    </form>
  );
};

export default Searchbox;
