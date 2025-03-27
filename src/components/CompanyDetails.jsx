import { useEffect, useRef } from "react";
import Button from "./Button";

const CompanyDetails = ({
  openCompanyDetailsModal,
  closeCompanyDetailsModal,
  company,
  toggleImportance,
  toggleApplied,
  removeCompany,
  toggleShowAddContacts,
  closeShowAddContacts,
  showAddContacts,
  selectedOptions,
  setSelectedOptions,
  clearSelectedOptions,
  toggleOption,
  options,
  updateContacts,
  loading,
  toggleShowContactsDropdown,
  showContactsDropdown,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openCompanyDetailsModal) {
      ref.current?.showModal();

      // Ensure selectedOptions matches the company's current contacts
      setSelectedOptions(
        company.contacts.map((contact) => ({
          value: contact.$id,
          label: `${contact.firstName} ${contact.lastName}`,
        }))
      );
    } else {
      ref.current?.close();
    }
  }, [openCompanyDetailsModal, company.contacts]);
  const star = company.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  const checkOr = company.applied
    ? "fa-solid fa-check"
    : "fa-solid fa-hourglass-half";
  return (
    <dialog
      className="company-details-dialog"
      ref={ref}
      onCancel={closeCompanyDetailsModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeCompanyDetailsModal();
          closeShowAddContacts();
          clearSelectedOptions();
        }
      }}
    >
      <div className="company-details-wrapper">
        <div className="details-container">
          <div className="details-content">
            <h2>{company.name}</h2>
            <p>{company.location}</p>
            <h3>{company.position}</h3>
            <p className="underline">Description:</p>
            <p className="job-description">{company.description}</p>
            {showAddContacts && (
              <div className="custom-dropdown">
                <p>Click below to Add/Remove Contacts:</p>
                <div
                  className="dropdown-selection"
                  onClick={toggleShowContactsDropdown}
                >
                  <span className="selected-options">
                    {selectedOptions.length === 0
                      ? "No Contacts Selected"
                      : selectedOptions.map((option) => {
                          // Directly use option.label because selectedOptions holds the entire object
                          return (
                            <span key={option.value}>{option.label} - </span>
                          );
                        })}
                  </span>
                </div>
                {showContactsDropdown && (
                  <div className="dropdown-menu">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        className={`dropdown-option ${
                          selectedOptions.some(
                            (opt) => opt.value === option.value
                          )
                            ? "selected"
                            : ""
                        }`}
                        onClick={(e) => toggleOption(e, option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="add-contact-container">
              <div className="add-contact">
                <p className="underline">Points of Contact:</p>
                <i
                  className="fa-solid fa-plus icon-border cursor"
                  onClick={toggleShowAddContacts}
                ></i>
                {showAddContacts && (
                  <Button
                    className="small-add-btn"
                    onClick={() => {
                      updateContacts(company.$id);
                      closeShowAddContacts();
                      clearSelectedOptions();
                    }}
                  >
                    Update Contacts
                  </Button>
                )}
              </div>

              <p className="points-of-contact">
                {loading ? (
                  <span>Updating...</span> // Add your spinner/loader component here
                ) : (
                  company.contacts.map((contact, index) => (
                    <span key={contact.$id || index}>
                      {contact.firstName} {contact.lastName}
                      {index < company.contacts.length - 1 && ", "}
                    </span>
                  ))
                )}
              </p>
            </div>
          </div>
          <div className="details-toggles">
            <i
              className={`icon-border ${star}`}
              style={{ color: "#FFD43B" }}
              onClick={() => toggleImportance(company.$id)}
            ></i>
            <a
              href={company.link}
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="icon-border lightIconColor"
            >
              <i className="fa-solid fa-link"></i>
            </a>
            {/* <i
              className="icon-border fa-solid fa-pen-to-square"
              style={{ color: "#7d7d7d" }}
              onClick={handleEdit}
            ></i> */}
            <i
              className={`icon-border applied lightIconColor ${checkOr}`}
              onClick={() => toggleApplied(company.$id)}
            >
              <div className="applied-hover">
                <p>
                  Toggle<br></br>applied<br></br>status
                </p>
              </div>
            </i>
          </div>
        </div>
        <div className="details-buttons">
          <Button
            onClick={() => {
              closeCompanyDetailsModal();
              closeShowAddContacts();
              clearSelectedOptions();
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => removeCompany(company.$id)}
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default CompanyDetails;
