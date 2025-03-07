import { useEffect, useRef } from "react";
import Button from "./Button";

const ContactForm = ({
  onSubmit,
  onFirstNameInputChange,
  firstNameInputValue,
  onLastNameInputChange,
  lastNameInputValue,
  onJobTitleInputChange,
  jobTitleInputValue,
  onCompanyInputChange,
  companyInputValue,
  onLocationInputChange,
  locationInputValue,
  onEmailInputChange,
  emailInputValue,
  onPhoneInputChange,
  phoneInputValue,
  onChatInputChange,
  chatInputValue,
  onLinkedInInputChange,
  linkedInInputValue,
  onTwitterInputChange,
  twitterInputValue,
  onGithubInputChange,
  githubInputValue,
  onNotesInputChange,
  notesInputValue,
  priority,
  onRadioChange,
  openContactFormModal,
  closeContactFormModal,
}) => {
  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  )
    .toISOString()
    .slice(0, 10);
  const ref = useRef();

  useEffect(() => {
    if (openContactFormModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openContactFormModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeContactFormModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeContactFormModal();
        }
      }}
      className="form-dialog"
    >
      <form onSubmit={onSubmit}>
        <div className="form-wrapper">
          <div className="form-content">
            <div className="form-top">
              <div className="form-input-data-half-width">
                <label htmlFor="first-name">First Name:</label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="Amaury"
                  value={firstNameInputValue}
                  onChange={onFirstNameInputChange}
                  required
                />
              </div>
              <div className="form-input-data-half-width">
                <label htmlFor="last-name">Last Name:</label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Silverio"
                  value={lastNameInputValue}
                  onChange={onLastNameInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="job-title">Job Title:</label>
              <input
                type="text"
                id="job-title"
                placeholder="Software Engineer II"
                value={jobTitleInputValue}
                onChange={onJobTitleInputChange}
                required
              />
            </div>
            <div className="form-top">
              <div className="form-input-data-half-width">
                <label htmlFor="company">Company:</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Google"
                  value={companyInputValue}
                  onChange={onCompanyInputChange}
                  required
                />
              </div>
              <div className="form-input-data-half-width">
                <label htmlFor="location">Location:</label>
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
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                placeholder="Amaury@google.com"
                value={emailInputValue}
                onChange={onEmailInputChange}
              />
            </div>

            <div className="form-input-data-half-width">
              <label htmlFor="phone" className="phone-label">
                Phone:<p>Format: 978-456-7890</p>
              </label>
              <input
                type="tel"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                minLength="12"
                maxLength="12"
                placeholder="978-456-7890"
                value={phoneInputValue}
                onChange={onPhoneInputChange}
              />
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="chat">
                Have you had a coffee chat with this person yet? If so, When?:
              </label>
              <input
                type="date"
                id="chat"
                value={chatInputValue}
                // defaultValue={dateTimeLocalNow}
                onChange={onChatInputChange}
                className="chat-width"
              />
            </div>

            <div className="form-input-data-full-width">
              <label htmlFor="linkedIn">LinkedIn:</label>
              <input
                type="url"
                id="linkedIn"
                placeholder="https://www.linkedin.com/in/amaury-silverio/"
                pattern="https://.*"
                value={linkedInInputValue}
                onChange={onLinkedInInputChange}
              />
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="twitter">Twitter:</label>
              <input
                type="url"
                id="twitter"
                placeholder="https://x.com/AmauryCodes"
                pattern="https://.*"
                value={twitterInputValue}
                onChange={onTwitterInputChange}
              />
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="github">Github:</label>
              <input
                type="url"
                id="github"
                placeholder="https://github.com/AmaurySilverio"
                pattern="https://.*"
                value={githubInputValue}
                onChange={onGithubInputChange}
              />
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="notes">Notes about Contact:</label>
              <textarea
                id="notes"
                placeholder="I met Amaury at RenderATL. He works for Google as a Software Engineer II on their emoji team. We had a great conversation about about AI and bike riding. He is very open to chat."
                value={notesInputValue}
                onChange={onNotesInputChange}
                rows="5"
                cols="40"
              />
            </div>
            <div className="radio-btns">
              <label htmlFor="contact-priority">
                Is this Contact a top priority?
              </label>
              <div className="radio-btns-input">
                <div>
                  <input
                    type="radio"
                    id="yes-radio"
                    value="yes"
                    onChange={onRadioChange}
                    checked={priority === "yes"}
                  />
                  <label htmlFor="yes-radio" className="yes-radio-input">
                    Yes
                  </label>
                </div>
                <div>
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
          </div>
        </div>
        <div className="contact-form-buttons">
          <Button onClick={closeContactFormModal} type="button">
            Discard
          </Button>
          <Button type="submit" className="small-add-btn">
            Add Contact
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default ContactForm;
