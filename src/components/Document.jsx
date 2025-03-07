const Document = ({ document, handleCheckboxChange, isSelected }) => {
  return (
    <tr className="li-item">
      <td>{document.title}</td>
      <td>
        <a className="document-url" href={document.document} target="_blank">
          {document.document}
        </a>
      </td>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleCheckboxChange(document.$id)}
        />
      </td>
    </tr>
  );
};

export default Document;
