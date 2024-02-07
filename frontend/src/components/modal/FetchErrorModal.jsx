import { TbFaceIdError } from "react-icons/tb";
const FetchErrorModal = ({
  message,
  header,
  onClose,
  btnLable = "close",
}) => {
  return (
    <>
      <dialog id="my_modal_1" className={`modal modal-open`}>
        <div className="modal-box bg-error text-neutral">
          <h3 className="text-lg font-bold">{header}</h3>
          <p className="py-4">{message}</p>
          <TbFaceIdError size={60} />
          <div className="modal-action">
            <div method="dialog">
              <button onClick={onClose} className="btn">
                {btnLable}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FetchErrorModal;
