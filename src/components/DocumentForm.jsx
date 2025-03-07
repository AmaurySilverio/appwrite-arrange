import Button from "./Button";
import { useEffect, useRef } from "react";

const DocumentForm = ({
  onSubmit,
  onChange,
  value,
  onRadioChange,
  typeOfDocument,
  titleValue,
  onTitleChange,
  openDocumentFormModal,
  closeDocumentFormModal,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openDocumentFormModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openDocumentFormModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeDocumentFormModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeDocumentFormModal();
        }
      }}
      className="form-dialog"
    >
      <form onSubmit={onSubmit}>
        <div className="form-wrapper">
          <div className="form-content">
            <div className="radio-btns">
              <label htmlFor="document-type">
                Is this a Portfolio, Resume, or Cover Letter?
              </label>
              <div className="radio-btns-documents">
                <div>
                  <input
                    type="radio"
                    id="resume-radio"
                    value="resume"
                    onChange={onRadioChange}
                    checked={typeOfDocument === "resume"}
                  />
                  <label htmlFor="resume-radio">Resume</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="coverLetter-radio"
                    value="coverLetter"
                    onChange={onRadioChange}
                    checked={typeOfDocument === "coverLetter"}
                  />
                  <label htmlFor="coverLetter-radio">Cover Letter</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="portfolio-radio"
                    value="portfolio"
                    onChange={onRadioChange}
                    checked={typeOfDocument === "portfolio"}
                  />
                  <label htmlFor="portfolio-radio" className="yes-radio-input">
                    Portfolio
                  </label>
                </div>
              </div>
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                placeholder="Software Engineer II Resume"
                value={titleValue}
                onChange={onTitleChange}
                required
              />
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="portfolio">Document Url:</label>
              <input
                type="url"
                id="portfolio"
                placeholder="https://example.com"
                pattern="https://.*"
                value={value}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-buttons">
            <Button onClick={closeDocumentFormModal} type="button">
              Discard
            </Button>
            <Button type="submit" className="small-document-btn">
              Add Link
            </Button>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default DocumentForm;
