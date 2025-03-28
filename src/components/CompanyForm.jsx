import { useEffect, useRef } from "react";
import Button from "./Button";

const CompanyForm = ({
  onSubmit,
  onCompanyInputChange,
  companyInputValue,
  onLocationInputChange,
  locationInputValue,
  onPositionInputChange,
  positionInputValue,
  onDescriptionInputChange,
  descriptionInputValue,
  onRadioChange,
  priority,
  onAppliedRadioChange,
  applied,
  openCompanyFormModal,
  closeCompanyFormModal,
  onLinkInputChange,
  linkInputValue,
  toggleOption,
  selectedOptions,
  options,
  showContactsFormDropdown,
  toggleShowContactsFormDropdown,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openCompanyFormModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openCompanyFormModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeCompanyFormModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeCompanyFormModal();
        }
      }}
      className="form-dialog"
    >
      <form onSubmit={onSubmit} className="form-wrapper">
        <div className="form-content">
          <div className="form-top">
            <div className="form-input-data-half-width">
              <label htmlFor="company">Company: </label>
              <input
                type="text"
                id="company"
                placeholder="Audible"
                value={companyInputValue}
                onChange={onCompanyInputChange}
                required
              />
            </div>
            <div className="form-input-data-half-width">
              <label htmlFor="location">Location: </label>
              <input
                type="text"
                id="location"
                placeholder="Philadelphia, PA"
                value={locationInputValue}
                onChange={onLocationInputChange}
                required
              />
            </div>
          </div>
          <div className="form-input-data-full-width">
            <label htmlFor="position">Position: </label>
            <input
              type="text"
              id="position"
              placeholder="Software Engineer"
              value={positionInputValue}
              onChange={onPositionInputChange}
              required
            />
          </div>
          <div className="form-input-data-full-width">
            <label htmlFor="url">Link: </label>
            <input
              type="url"
              id="url"
              placeholder="https://example.com"
              pattern="https://.*"
              value={linkInputValue}
              onChange={onLinkInputChange}
              required
            />
          </div>
          <div className="form-input-data-full-width">
            <label htmlFor="description">Position Description: </label>
            <textarea
              // type="text"
              id="description"
              placeholder="Full-time hybrid position (In-Office 3 days a week)"
              value={descriptionInputValue}
              onChange={onDescriptionInputChange}
              rows="6"
              cols="40"
              required
            />
          </div>
          <div className="radio-btns">
            <label>Points of Contact (Select all that apply)</label>
            <div className="custom-dropdown">
              <div
                className="dropdown-selection"
                onClick={toggleShowContactsFormDropdown}
              >
                <span className="selected-options">
                  {selectedOptions.length === 0
                    ? "Select Contacts"
                    : selectedOptions.map((option) => {
                        // Directly use option.label because selectedOptions holds the entire object
                        return (
                          <span key={option.value}>{option.label} - </span>
                        );
                      })}
                </span>
              </div>
              {showContactsFormDropdown && (
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
            {/* <div>
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={(e) => toggleOption(e, option.value)}
                  style={{
                    backgroundColor: selectedOptions.includes(option.value)
                      ? "lightgreen"
                      : "lightgray",
                    margin: "5px",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div> */}
            {/* <p>Selected options: {selectedOptions.join(", ")}</p> */}
          </div>
          <div className="radio-btns">
            <label htmlFor="company-apply">Have you applied?</label>
            <div>
              <input
                type="radio"
                id="yes-apply-radio"
                value="yes"
                onChange={onAppliedRadioChange}
                checked={applied === "yes"}
              />
              <label htmlFor="yes-apply-radio" className="yes-radio-input">
                Yes
              </label>
              <input
                type="radio"
                id="no-apply-radio"
                value="no"
                onChange={onAppliedRadioChange}
                checked={applied === "no"}
              />
              <label htmlFor="no-apply-radio">No</label>
            </div>
          </div>
          <div className="radio-btns">
            <label htmlFor="company-priority">
              Is this Company a top priority?
            </label>
            <div>
              <input
                type="radio"
                id="yes-radio"
                value="yes"
                onChange={onRadioChange}
                checked={priority === "yes"}
              />
              <label htmlFor="yes-radio">Yes</label>
              <input
                type="radio"
                id="no-radio"
                value="no"
                onChange={onRadioChange}
                checked={priority === "no"}
              />
              <label htmlFor="no-radio">No</label>
            </div>
          </div>
        </div>
        <div className="form-buttons">
          <Button onClick={closeCompanyFormModal} type="button">
            Discard
          </Button>
          <Button type="submit" className="small-add-btn">
            Add Job
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default CompanyForm;
