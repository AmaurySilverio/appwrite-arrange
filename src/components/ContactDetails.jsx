import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const ContactDetails = ({
  openContactDetailsModal,
  closeContactDetailsModal,
  contact,
  toggleImportance,
  removeContact,
  handleEdit,
}) => {
  const [showText, setShowText] = useState("email-copied");
  const ref = useRef();

  const handleEmailClick = () => {
    navigator.clipboard.writeText(contact.email);
    setShowText("email-clicked");
    setTimeout(() => {
      setShowText("email-copied");
    }, 1200);
  };

  useEffect(() => {
    if (openContactDetailsModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openContactDetailsModal]);
  const star = contact.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  return (
    <dialog
      ref={ref}
      onCancel={closeContactDetailsModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeContactDetailsModal();
        }
      }}
      className="contact-details-dialog"
    >
      <div className="contact-details-wrapper">
        <div className="details-container">
          <div className="details-content">
            <div className="details-top-half">
              <div className="details-info">
                <h2 className="pad4">
                  {contact.firstName} {contact.lastName}
                </h2>
                <p className="details-job-title pad4">{contact.jobTitle}</p>
                <p className="details-company pad4">{contact.company}</p>
              </div>
              <div className="details-toggles padding-top">
                <i
                  className={`icon-border ${star}`}
                  style={{ color: "#FFD43B" }}
                  onClick={() => toggleImportance(contact.$id)}
                ></i>
                {/* <i
              className="icon-border fa-solid fa-pen-to-square"
              style={{ color: "#7d7d7d" }}
              onClick={handleEdit}
            ></i> */}
              </div>
            </div>
            <div className="contact-info-details pad4 pad-top1">
              <i className="fa-solid fa-location-dot lightIconColor"></i>
              <p>{contact.location}</p>
            </div>
            <div
              className="contact-info-details email pad4"
              onClick={handleEmailClick}
            >
              <div className={showText}>
                <p>Email Copied</p>
              </div>
              <div className="email-hover">
                <p>Copy Email</p>
              </div>
              <i className="fa-solid fa-envelope lightIconColor"></i>
              <p>{contact.email}</p>
            </div>
            <div className="contact-info-details pad4">
              <i className="fa-solid fa-phone lightIconColor"></i>
              <p>{contact.phone}</p>
            </div>
            <div className="contact-info-details pad4 nowrap">
              <i className="fa-solid fa-mug-hot lightIconColor"></i>
              <p>{contact.chat.substring(0, 10)}</p>
            </div>
            <a
              href={contact.linkedIn}
              target="_blank"
              className="contact-info-details pad4 nowrap"
            >
              <i className="fa-brands fa-linkedin lightIconColor"></i>
              <p>{contact.linkedIn}</p>
            </a>
            <a
              href={contact.twitter}
              target="_blank"
              className="contact-info-details pad4 nowrap"
            >
              <i className="fa-brands fa-x-twitter lightIconColor"></i>
              <p>{contact.twitter}</p>
            </a>
            <a
              href={contact.github}
              target="_blank"
              className="contact-info-details pad4 nowrap"
            >
              <i className="fa-brands fa-square-github lightIconColor"></i>
              <p>{contact.github}</p>
            </a>
            <div className="notes-content pad4">
              <p>Notes:</p>
              <p>{contact.notes}</p>
            </div>
          </div>
        </div>
        <div className="details-buttons">
          <Button onClick={closeContactDetailsModal}>Close</Button>
          <Button
            onClick={() => removeContact(contact.$id)}
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default ContactDetails;
