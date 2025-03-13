import { useEffect, useRef } from "react";
import Button from "./Button";

const Notification = ({ message, openModal, closeModal, title }) => {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className="confirm-dialog">
      <h3 className="confirm-title">{title}</h3>
      <p className="confirm-p">{message}</p>
      <div className="confirm-buttons-container">
        <Button onClick={closeModal}>Close</Button>
      </div>
    </dialog>
  );
};
export default Notification;
