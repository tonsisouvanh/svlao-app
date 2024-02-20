import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GobackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    // <button
    //   className={`btn btn-primary fixed z-[10]

    // ${isVisible ? "opacity-100" : "opacity-50"}
    // `}
    //   onClick={handleClick}
    // >
    //   go back
    // </button>
    <button onClick={handleClick} className="btn btn-sm fixed right-10 z-[10]">
      Go Back
    </button>
  );
};

export default GobackButton;
