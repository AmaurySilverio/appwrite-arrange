const Company = ({
  company,
  toggleImportance,
  showCompanyDetails,
  removeCompany,
}) => {
  const star = company.priority ? "fa-solid fa-star" : "fa-regular fa-star";
  const applied = company.applied ? "applied" : "";
  return (
    <li
      className={`card ${applied}`}
      onClick={() => showCompanyDetails(company)}
      // onTouchStart={() => showCompanyDetails(company)}
    >
      <div className="company-title-container">
        <h4>{company.name}</h4> <p>{company.position}</p>
      </div>
      <div className="icon-container">
        <i
          className={`icon-border ${star}`}
          style={{ color: "#FFD43B" }}
          onClick={(e) => {
            toggleImportance(company.$id);
            e.stopPropagation();
          }}
        ></i>
        <div className="hidden-icons">
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
          <i
            className="icon-border fa-solid fa-trash lightIconColor"
            onClick={(e) => {
              removeCompany(company.$id);
              e.stopPropagation();
            }}
          ></i>
        </div>
      </div>
    </li>
  );
};

export default Company;
