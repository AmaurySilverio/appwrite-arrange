import Navbar from "../components/Navbar";
import documentService from "../services/documents";
import Notification from "../components/Notification";
import ConfirmNotification from "../components/ConfirmNotification";
import { useState, useEffect } from "react";
import DocumentsField from "../components/DocumentsField";
import DocumentForm from "../components/DocumentForm";
import Footer from "../components/Footer";
import { useAuth } from "../utils/AuthProvider";

const Profile = () => {
  const [modal, setModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [documentFormModal, setDocumentFormModal] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState("");
  const [title, setTitle] = useState("");
  const [typeOfDocument, setTypeOfDocument] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [name, setName] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const user$id = user.$id;
    let firstName = user.name.split(" ")[0];
    setName(firstName);
    documentService
      .getAll(user$id)
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
  const handleSelectChange = (e) => {
    setTypeOfDocument(e.target.value);
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
    const user$id = user.$id;
    e.preventDefault();
    setDocumentFormModal(false);
    const documentObject = {
      typeOfDocument: typeOfDocument.trim(),
      document: document.trim(),
      title: title.trim(),
      createdBy: user$id,
    };
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
      setTypeOfDocument("");
      return false;
    }
    documentService
      .create(documentObject)
      .then((returnedDocuments) => {
        setDocuments(documents.concat(returnedDocuments));
        setDocument("");
        setTitle("");
        setTypeOfDocument("");
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
      <main className="content-container">
        <div className="profile-header-container">
          <h1 className="profile-header-text">Profile</h1>
          <p>
            Hello, <span style={{ color: "#3cb228" }}>{name}</span>! Welcome to
            your profile. Store and organize all your job-specific resumes,
            cover letters, portfolios and documents in one place. Easily upload
            your Google Docs links and manage them with ease — view, upload, or
            delete them below.
          </p>
        </div>
        <DocumentsField
          documentsToShow={[...documentsToShow]}
          clickAddButton={() => setDocumentFormModal(true)}
          handleCheckboxChange={handleCheckboxChange}
          selectedDocuments={selectedDocuments}
          removeDocument={removeDocument}
        />
      </main>
      <Footer />
      {documentFormModal && (
        <DocumentForm
          onSubmit={addDocument}
          onChange={handleDocumentInputChange}
          value={document}
          onTitleChange={handleTitleInputChange}
          titleValue={title}
          onSelectChange={handleSelectChange}
          openDocumentFormModal={documentFormModal}
          closeDocumentFormModal={() => setDocumentFormModal(false)}
        />
      )}
      <Notification
        openModal={modal}
        closeModal={() => setModal(false)}
        message={errorMessage}
        title="Network Error"
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
