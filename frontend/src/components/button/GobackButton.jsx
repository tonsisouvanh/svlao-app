import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const GobackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleClick} className="btn btn-sm btn-neutral fixed right-10 z-[10]">
      {/* Go Back */}
      <BiArrowBack size={20} />
    </button>
  );
};

export default GobackButton;
