import { useState } from "react";
import { AiFillInfoCircle, AiFillQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const style = "text-2xl";

const InfoModal = ({
  title,
  modaltype,
  desc,
  initialValue = false,
  isOnclickEvent = false,
  confirmLabel,
  cancelLabel = "Close!",
  handleClick,
}) => {
  const [openModal, setOpenModal] = useState(initialValue);

  const handleConfirm = () => {
    handleClick();
  }

  const getIcon = () => {
    let icon;
    switch (modaltype) {
      case "info":
        icon = <AiFillInfoCircle className={style + " text-primary"} />;
        break;
      case "question":
        icon = <AiFillQuestionCircle className={style + " text-warning"} />;
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
          <div>{getIcon()}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="py-4">{desc}</p>
        <div className="modal-action">
          {isOnclickEvent ? (
            <button
              onClick={handleConfirm}
              type="button"
              className="btn btn-error"
            >
              {confirmLabel}
            </button>
          ) : (
            <Link className="btn btn-primary" to={`/profile/${"student"}`}>
              ອັບເດດ
            </Link>
          )}
          <button onClick={() => setOpenModal(false)} className="btn">
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
