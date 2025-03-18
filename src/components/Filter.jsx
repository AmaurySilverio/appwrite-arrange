import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import documentService from "../services/documents";
import { useAuth } from "../utils/AuthProvider";

const Filter = ({
  searchValue,
  onSearchChange,
  onClearSearchClick,
  selectedItem,
  handleSetSelectedItem,
  optionChoiceRender,
  clickAddButton,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [documents, setDocuments] = useState([]);
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  const documentsClicked = () => {
    setShowDropDown(!showDropDown);
  };
  useEffect(() => {
    // Fetch user's documents
    const fetchDocuments = async () => {
      if (user?.$id) {
        const initialDocuments = await documentService.getAll(user.$id);
        setDocuments(initialDocuments);
      }
    };
    fetchDocuments();

    // Handle outside click to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setShowDropDown(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // useEffect(() => {
  //   const user$id = user.$id;
  //   documentService.getAll(user$id).then((initialDocuments) => {
  //     setDocuments(initialDocuments);
  //   });
  // }, []);

  return (
    <div className="search-container">
      <div className="filter-inputs">
        <div className="search-wrapper">
          <input
            className="input"
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="search-icon"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <button className="x-icon" id="button" onClick={onClearSearchClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="label-wrapper">
          <label>
            <select value={selectedItem} onChange={handleSetSelectedItem}>
              <option value="all">Show All</option>
              <option value="priority">Priority</option>
              {optionChoiceRender ? (
                <option value="applied">Applied</option>
              ) : null}
            </select>
          </label>
        </div>
      </div>
      <div
        className="add-button-container"
        ref={dropdownRef}
        // onMouseLeave={() => setShowDropDown(false)}
      >
        <div className="documents-dropdown-wrapper">
          <Button className={"document-btn"} onClick={documentsClicked}>
            {/* My Documents */}
            <i
              className="fa-solid fa-folder-open"
              style={{ color: "beige" }}
            ></i>
          </Button>
          {showDropDown && (
            <div className="documents-dropdown-container">
              {documents.length > 0 ? (
                documents.map((document) => (
                  <a
                    key={document.$id}
                    className="dropdown-item"
                    href={document.document}
                    target="_blank"
                  >
                    {document.title}
                  </a>
                ))
              ) : (
                <span className="dropdown-item">No Documents</span>
              )}
            </div>
          )}
        </div>
        <Button className={"add-btn"} onClick={clickAddButton}>
          {/* {optionChoiceRender ? "Add Job" : "Add Contact"} */}
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
    </div>
  );
};

export default Filter;
