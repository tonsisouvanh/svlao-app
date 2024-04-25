const ViewImageModal = ({ viewImageToggle, setViewImageToggle, image }) => {
  return (
    <>
      <dialog
        id="my_modal_3"
        className={`modal ${viewImageToggle && "modal-open"}`}
      >
        <div className="modal-box w-11/12 max-w-2xl p-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setViewImageToggle(false)}
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <img
            className="h-full w-full object-cover rounded-lg"
            src={image}
            alt="announcement image"
          />
        </div>
      </dialog>
    </>
  );
};

export default ViewImageModal;
