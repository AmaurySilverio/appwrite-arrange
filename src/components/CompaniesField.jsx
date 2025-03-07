import Company from "./Company";
const CompaniesField = ({
  companiesToShow,
  toggleImportance,
  removeCompany,
  showCompanyDetails,
}) => {
  return (
    <div className="companies-container">
      <ul>
        {companiesToShow.length < 1 ? (
          <h3>No Companies Found</h3>
        ) : (
          companiesToShow.map((company) => (
            <Company
              key={company.$id}
              company={company}
              toggleImportance={toggleImportance}
              showCompanyDetails={showCompanyDetails}
              removeCompany={removeCompany}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default CompaniesField;
