const Contact = ({
  contact,
  toggleImportance,
  showContactDetails,
  removeContact,
}) => {
  const star = contact.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  return (
    <li onClick={() => showContactDetails(contact)}>
      <div className="contact-top-half">
        <div className="contact-title">
          <h4>
            {contact.firstName} {contact.lastName}{" "}
          </h4>
          <p>{contact.jobTitle}</p>
          <p>{contact.company}</p>
        </div>
        <div className="icon-container">
          <i
            className={`icon-border ${star}`}
            style={{ color: "#FFD43B" }}
            onClick={(e) => {
              toggleImportance(contact.$id);
              e.stopPropagation();
            }}
          ></i>
          <div className="hidden-icons">
            <i
              className="icon-border fa-solid fa-trash"
              style={{ color: "#7d7d7d" }}
              onClick={(e) => {
                removeContact(contact.$id);
                e.stopPropagation();
              }}
            ></i>
          </div>
        </div>
      </div>
      <div className="contact-info-wrapper">
        <div className="contact-info-container">
          <div className="contact-info">
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "#7d7d7d" }}
            ></i>
            <p>{contact.location}</p>
          </div>
          <div className="contact-info">
            <i className="fa-solid fa-phone" style={{ color: "#7d7d7d" }}></i>
            <p>{contact.phone}</p>
          </div>
          <div className="contact-info">
            <i
              className="fa-solid fa-envelope"
              style={{ color: "#7d7d7d" }}
            ></i>
            <p>{contact.email}</p>
          </div>
        </div>

        {/* <div className="contact-info-container">
          <div className="contact-info">
            <i
              className="fa-brands fa-linkedin"
              style={{ color: "#7d7d7d" }}
            ></i>
            <p>{contact.linkedIn}</p>
          </div>
          <div className="contact-info">
            <i
              className="fa-brands fa-x-twitter"
              style={{ color: "#7d7d7d" }}
            ></i>
            <p>{contact.twitter}</p>
          </div>
          <div className="contact-info">
            <i
              className="fa-brands fa-square-github"
              style={{ color: "#7d7d7d" }}
            ></i>
            <p>{contact.github}</p>
          </div>
        </div> */}
      </div>
    </li>
  );
};

export default Contact;
