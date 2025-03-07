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
      <div className="document-title-container">
        <h3>Documents:</h3>
        <Button onClick={clickAddButton} className="document-btn">
          Add Document
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Document Url</th>
            <th>
              <Button onClick={removeDocument}>Delete Selected</Button>
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
