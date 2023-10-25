import React, { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const style = "text-2xl text-primary";

const InfoModal = ({ title, modaltype, desc, initialValue = false }) => {
  const [openModal, setOpenModal] = useState(initialValue);
  const getIcon = (modaltype) => {
    let icon;
    switch (modaltype) {
      case "info":
        icon = <AiFillInfoCircle className={style} />;
        break;

      default:
        break;
    }
    return icon;
  };
  return (
    <div className={`modal ${!openModal ? null : "modal-open"}`}>
      <div className="modal-box font-notosanslao">
        <div className="flex items-center gap-2">
          <div>{getIcon(modaltype)}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="py-4">{desc}</p>
        <div className="modal-action">
          <Link className="btn btn-primary" to={`/profile/${1}`}>
            ອັບເດດ
          </Link>
          <button onClick={() => setOpenModal(false)} className="btn">
            Close!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
