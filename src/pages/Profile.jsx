import Navbar from "../components/Navbar";
import documentService from "../services/documents";
import Notification from "../components/Notification";
import ConfirmNotification from "../components/ConfirmNotification";
import { useState, useEffect } from "react";
import DocumentsField from "../components/DocumentsField";
import DocumentForm from "../components/DocumentForm";

const Profile = () => {
  const [modal, setModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [documentFormModal, setDocumentFormModal] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState("");
  const [title, setTitle] = useState("");
  const [typeOfDocument, setTypeOfDocument] = useState("resume");
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  useEffect(() => {
    documentService
      .getAll()
      .then((initialDocuments) => {
        setDocuments(initialDocuments);
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(
          "There is a problem with the server. Please refresh the page."
        );
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
      });
  }, []);

  const handleDocumentInputChange = (e) => {
    setDocument(e.target.value);
  };
  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };
  const handleRadioChange = (event) => {
    setTypeOfDocument(event.target.value);
  };

  const documentsToShow = [...documents];

  const handleCheckboxChange = (documentId) => {
    setSelectedDocuments((prevSelectedDocuments) =>
      prevSelectedDocuments.includes(documentId)
        ? prevSelectedDocuments.filter(($id) => $id !== documentId)
        : [...prevSelectedDocuments, documentId]
    );
  };

  const addDocument = (e) => {
    e.preventDefault();
    setDocumentFormModal(false);
    const documentObject = {
      typeOfDocument: typeOfDocument.trim(),
      document: document.trim(),
      title: title.trim(),
    };
    console.log(documentObject);
    if (
      documents.find(
        (document) =>
          document.title.toUpperCase() === documentObject.title.toUpperCase()
      )
    ) {
      setModal(true);
      setErrorMessage(
        `'${documentObject.title}' has already been already added to your Documents. Documents Must have all have unique titles.`
      );
      setTimeout(() => {
        setModal(false);
        setErrorMessage("");
      }, 5000);
      setDocument("");
      setTitle("");
      setTypeOfDocument("resume");
      return false;
    }
    documentService
      .create(documentObject)
      .then((returnedDocuments) => {
        setDocuments(documents.concat(returnedDocuments));
        setDocument("");
        setTitle("");
        setTypeOfDocument("resume");
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage("Document could not be added. Please try again.");
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
      });
  };

  const removeDocument = () => {
    if (selectedDocuments.length === 0) {
      return;
    }
    setConfirmationModal(true);

    const handleConfirmDeletion = () => {
      selectedDocuments.forEach(($id) => {
        documentService
          .remove($id)
          .then(() => {
            // Remove the document from the state after successful deletion
            setDocuments((prevDocuments) =>
              prevDocuments.filter((document) => document.$id !== $id)
            );
          })
          .catch((error) => {
            setModal(true);
            setErrorMessage("Document was already deleted from the server.");
            setTimeout(() => {
              setModal(false);
              setErrorMessage("");
            }, 5000);
            setDocuments((prevDocuments) =>
              prevDocuments.filter((document) => document.$id !== $id)
            );
          });
        setConfirmationModal(false);
      });
    };
    // Pass `handleConfirmDeletion` to modal
    setConfirmRemove(() => handleConfirmDeletion);
    setSelectedDocuments([]);
  };

  return (
    <>
      <Navbar />
      <div className="profile-header-container">
        <p>
          Store and organize all your job-specific resumes, cover letters, and
          portfolios in one place. Easily upload your Google Docs links and
          manage them with ease—view, upload, or delete them below.
        </p>
      </div>
      {documentFormModal && (
        <DocumentForm
          onSubmit={addDocument}
          onChange={handleDocumentInputChange}
          value={document}
          onTitleChange={handleTitleInputChange}
          titleValue={title}
          onRadioChange={handleRadioChange}
          typeOfDocument={typeOfDocument}
          openDocumentFormModal={documentFormModal}
          closeDocumentFormModal={() => setDocumentFormModal(false)}
        />
      )}
      <DocumentsField
        documentsToShow={[...documentsToShow]}
        clickAddButton={() => setDocumentFormModal(true)}
        handleCheckboxChange={handleCheckboxChange}
        selectedDocuments={selectedDocuments}
        removeDocument={removeDocument}
      />
      <Notification
        openModal={modal}
        closeModal={() => setModal(false)}
        message={errorMessage}
      />
      <ConfirmNotification
        openConfirmationModal={confirmationModal}
        closeConfirmationModal={() => setConfirmationModal(false)}
        confirmRemove={confirmRemove}
        confirmTitle="Delete Document(s)"
      />
    </>
  );
};

export default Profile;
