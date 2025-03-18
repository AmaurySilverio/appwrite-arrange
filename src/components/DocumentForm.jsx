import Button from "./Button";
import { useEffect, useRef } from "react";

const DocumentForm = ({
  onSubmit,
  onChange,
  value,
  onSelectChange,
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
              <select onChange={onSelectChange}>
                <option value="portfolio">Portfolio</option>
                <option value="resume">Resume</option>
                <option value="coverLetter">Cover Letter</option>
              </select>
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
