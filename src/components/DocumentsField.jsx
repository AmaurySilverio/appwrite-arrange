import Document from "./Document";
import Button from "./Button";

const DocumentsField = ({
  documentsToShow,
  clickAddButton,
  removeDocument,
  handleCheckboxChange,
  isSelected,
  selectedDocuments,
}) => {
  return (
    <div className="documents-container">
      <div className="custom-shape-divider-top-17422417061">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="document-content">
        <div className="document-title-container">
          <h3>Documents:</h3>
          <Button onClick={clickAddButton} className="small-document-btn">
            Add Document
          </Button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Document Url</th>
              <th>
                <Button className="delete-btn" onClick={removeDocument}>
                  Delete Selected
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {documentsToShow.length < 1 ? (
              <tr>
                <td>No Documents Found</td>
              </tr>
            ) : (
              documentsToShow.map((document) => (
                <Document
                  key={document.$id}
                  document={document}
                  handleCheckboxChange={handleCheckboxChange}
                  isSelected={selectedDocuments.includes(document.$id)}
                  // removeDocument={removeDocument}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* {documentsToShow.length < 1 ? (
          <h3>No Documents Found</h3>
        ) : (
          documentsToShow.map((document) => (
            <Document
              key={document.id}
              document={document}
              // removeDocument={removeDocument}
            />
          ))
        )} */}
    </div>
  );
};

export default DocumentsField;
