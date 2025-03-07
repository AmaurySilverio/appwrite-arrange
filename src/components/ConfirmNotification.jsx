import { useEffect, useRef } from "react";
import Button from "./Button";

const ConfirmNotification = ({
  openConfirmationModal,
  closeConfirmationModal,
  confirmRemove,
  confirmTitle,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openConfirmationModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openConfirmationModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeConfirmationModal}
      className="confirm-dialog"
      onClick={(e) => {
        if (e.target === ref.current) {
          closeConfirmationModal();
        }
      }}
    >
      <h3 className="confirm-title">{confirmTitle}</h3>
      <p className="confirm-p">Are you sure you want to delete?</p>
      <div className="confirm-buttons-container">
        <Button onClick={closeConfirmationModal}>Cancel</Button>
        <Button onClick={confirmRemove} className="delete-btn">
          Delete
        </Button>
        {/* <button autoFocus onClick={closeConfirmationModal}>
          Cancel
        </button> */}
        {/* <button onClick={confirmRemove}>Yes</button> */}
      </div>
    </dialog>
  );
};
export default ConfirmNotification;
