import { useEffect, useRef } from "react";
import Button from "./Button";

const CompanyDetails = ({
  openCompanyDetailsModal,
  closeCompanyDetailsModal,
  company,
  toggleImportance,
  toggleApplied,
  removeCompany,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (openCompanyDetailsModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openCompanyDetailsModal]);
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
              className="icon-border"
            >
              <i className="fa-solid fa-link" style={{ color: "#7d7d7d" }}></i>
            </a>
            {/* <i
              className="icon-border fa-solid fa-pen-to-square"
              style={{ color: "#7d7d7d" }}
              onClick={handleEdit}
            ></i> */}
            <i
              className={`icon-border applied ${checkOr}`}
              style={{ color: "#7d7d7d" }}
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
          <Button onClick={closeCompanyDetailsModal}>Close</Button>
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
