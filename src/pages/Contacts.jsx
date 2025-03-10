import { useState, useEffect } from "react";
import contactService from "../services/contacts";
import Notification from "../components/Notification";
import ConfirmNotification from "../components/ConfirmNotification";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import ContactsField from "../components/ContactsField";
import ContactDetails from "../components/ContactDetails";
import { useAuth } from "../utils/AuthProvider";

const Contacts = () => {
  const [modal, setModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [clickedContact, setClickedContact] = useState(null);
  const [contactDetailsModal, setContactDetailsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedItem, setSelectedItem] = useState("all");
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [chat, setChat] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("no");
  const [contactFormModal, setContactFormModal] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const user$id = user.$id;
    contactService
      .getAll(user$id)
      .then((initialContacts) => {
        setContacts(initialContacts);
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

  const addContact = (event) => {
    const user$id = user.$id;
    event.preventDefault();
    setContactFormModal(false);
    const contactObject = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      location: location.trim(),
      email: email.trim(),
      phone: phone.trim(),
      chat: chat.trim(),
      linkedIn: linkedIn.trim(),
      twitter: twitter.trim(),
      github: github.trim(),
      notes: notes.trim(),
      priority: priority === "yes" ? true : false,
      createdBy: user$id,
    };
    if (
      contacts.find(
        (contact) =>
          contact.firstName.toUpperCase() ===
            contactObject.firstName.toUpperCase() &&
          contact.lastName.toUpperCase() ===
            contactObject.lastName.toUpperCase()
      )
    ) {
      setModal(true);
      setErrorMessage(
        `'${contactObject.firstName}' '${contactObject.lastName}' has already been already added to your Contacts.`
      );
      setTimeout(() => {
        setModal(false);
        setErrorMessage("");
      }, 5000);
      setFirstName("");
      setLastName("");
      setJobTitle("");
      setCompany("");
      setLocation("");
      setEmail("");
      setPhone("");
      setLinkedIn("");
      setTwitter("");
      setGithub("");
      setNotes("");
      setPriority("no");
      return false;
    }

    contactService
      .create(contactObject)
      .then((returnedContact) => {
        setContacts(contacts.concat(returnedContact));
        setFirstName("");
        setLastName("");
        setJobTitle("");
        setCompany("");
        setLocation("");
        setEmail("");
        setPhone("");
        setLinkedIn("");
        setTwitter("");
        setGithub("");
        setNotes("");
        setPriority("no");
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage("Contact could not be added. Please try again.");
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
      });
  };
  // 0;

  const contactsToShow =
    filteredContacts.length === 0 && newSearch.trim() !== ""
      ? []
      : selectedItem === "all"
      ? filteredContacts.length < 1
        ? contacts
        : filteredContacts
      : filteredContacts.length < 1
      ? contacts.filter((contact) => contact.priority)
      : filteredContacts.filter((contact) => contact.priority);

  const toggleImportanceOf = ($id) => {
    const contact = contacts.find((c) => c.$id === $id);
    const changedContact = { ...contact, priority: !contact.priority };
    const priorityOject = { priority: changedContact.priority };
    contactService
      .update($id, priorityOject)
      .then((returnedContact) => {
        setContacts(contacts.map((c) => (c.$id === $id ? returnedContact : c)));
        if (filteredContacts.length > 0) {
          setFilteredContacts(
            filteredContacts.map((c) => (c.$id === $id ? returnedContact : c))
          );
        }
        if (clickedContact) {
          setClickedContact(changedContact);
        }
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(
          `'${contact.firstName}' '${contact.lastName}'was already deleted from the server.`
        );
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        setContacts(contacts.filter((c) => c.$id !== $id));
        if (filteredContacts.length > 0) {
          setFilteredContacts(
            filteredContacts.map((c) => (c.$id === $id ? returnedContact : c))
          );
        }
        if (contactDetailsModal) {
          setContactDetailsModal(false);
          setClickedContact(null);
        }
      });
  };

  const handleFirstNameInputChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameInputChange = (event) => {
    setLastName(event.target.value);
  };
  const handleJobTitleInputChange = (event) => {
    setJobTitle(event.target.value);
  };
  const handleCompanyInputChange = (event) => {
    setCompany(event.target.value);
  };
  const handleLocationInputChange = (event) => {
    setLocation(event.target.value);
  };
  const handleEmailInputChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneInputChange = (event) => {
    setPhone(event.target.value);
  };
  const handleChatInputChange = (event) => {
    setChat(event.target.value);
  };
  const handleLinkedInInputChange = (event) => {
    setLinkedIn(event.target.value);
  };
  const handleTwitterInputChange = (event) => {
    setTwitter(event.target.value);
  };
  const handleGithubInputChange = (event) => {
    setGithub(event.target.value);
  };
  const handleNotesInputChange = (event) => {
    setNotes(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const removeContact = ($id) => {
    setConfirmationModal(true);

    // Store the function in a variable to pass the $id at confirmation time
    const handleConfirmDeletion = () => {
      contactService
        .remove($id)
        .then(() => {
          setContacts(contacts.filter((c) => c.$id !== $id));
          setContactDetailsModal(false);
          setClickedContact(null);
          if (filteredContacts.length > 0) {
            setFilteredContacts(filteredContacts.filter((c) => c.$id !== $id));
          }
        })
        .catch((error) => {
          setModal(true);
          setErrorMessage("Contact was already deleted from the server.");
          setTimeout(() => {
            setModal(false);
            setErrorMessage("");
          }, 5000);
          setContacts(contacts.filter((c) => c.$id !== $id));
          if (filteredContacts.length > 0) {
            setFilteredContacts(filteredContacts.filter((c) => c.$id !== $id));
          }
          if (contactDetailsModal) {
            setContactDetailsModal(false);
            setClickedContact(null);
          }
        });

      setConfirmationModal(false);
    };

    // Pass `handleConfirmDeletion` to modal
    setConfirmRemove(() => handleConfirmDeletion);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    console.log(searchTerm);
    setNewSearch(searchTerm);

    if (searchTerm.trim() === "") {
      // If search is empty, reset to all contacts
      setFilteredContacts([]);
    } else {
      // Filter contacts as the user types
      const filteredSearch = contacts.filter((contact) =>
        filterByContactOrLocation(contact, searchTerm)
      );
      setFilteredContacts(filteredSearch);
    }
  };
  function filterByContactOrLocation(contact, searchTerm) {
    // console.log(contact);
    // console.log(searchTerm);
    return (
      contact.firstName
        .toUpperCase()
        .includes(searchTerm.toUpperCase().trim()) ||
      contact.lastName
        .toUpperCase()
        .includes(searchTerm.toUpperCase().trim()) ||
      contact.location
        .toUpperCase()
        .includes(searchTerm.toUpperCase().trim()) ||
      contact.jobTitle.toUpperCase().includes(searchTerm.toUpperCase().trim())
    );
  }
  const handleClearSearchClick = () => {
    setFilteredContacts([]);
    setNewSearch("");
  };
  const handleSetSelectedItem = (e) => setSelectedItem(e.target.value);

  const showContactDetails = (contact) => {
    setClickedContact(contact);
    setContactDetailsModal(true);
  };
  const handleEdit = () => {
    console.log("edit clicked");
  };
  return (
    <>
      <Navbar />
      {contactFormModal ? (
        <ContactForm
          onSubmit={addContact}
          onFirstNameInputChange={handleFirstNameInputChange}
          firstNameInputValue={firstName}
          onLastNameInputChange={handleLastNameInputChange}
          lastNameInputValue={lastName}
          onJobTitleInputChange={handleJobTitleInputChange}
          jobTitleInputValue={jobTitle}
          onCompanyInputChange={handleCompanyInputChange}
          companyInputValue={company}
          onLocationInputChange={handleLocationInputChange}
          locationInputValue={location}
          onEmailInputChange={handleEmailInputChange}
          emailInputValue={email}
          onPhoneInputChange={handlePhoneInputChange}
          phoneInputValue={phone}
          onChatInputChange={handleChatInputChange}
          chatInputValue={chat}
          onLinkedInInputChange={handleLinkedInInputChange}
          linkedInInputValue={linkedIn}
          onTwitterInputChange={handleTwitterInputChange}
          twitterInputValue={twitter}
          onGithubInputChange={handleGithubInputChange}
          githubInputValue={github}
          onNotesInputChange={handleNotesInputChange}
          notesInputValue={notes}
          priority={priority}
          onRadioChange={handlePriorityChange}
          openContactFormModal={contactFormModal}
          closeContactFormModal={() => setContactFormModal(false)}
        />
      ) : null}
      <main className="content-container">
        <Filter
          searchValue={newSearch}
          onSearchChange={handleSearchChange}
          onClearSearchClick={handleClearSearchClick}
          selectedItem={selectedItem}
          handleSetSelectedItem={handleSetSelectedItem}
          clickAddButton={() => setContactFormModal(true)}
        />
        <ContactsField
          contactsToShow={[...contactsToShow]}
          toggleImportance={toggleImportanceOf}
          removeContact={removeContact}
          showContactDetails={showContactDetails}
        />
      </main>
      <Footer />
      <Notification
        openModal={modal}
        closeModal={() => setModal(false)}
        message={errorMessage}
      />
      <ConfirmNotification
        openConfirmationModal={confirmationModal}
        closeConfirmationModal={() => setConfirmationModal(false)}
        confirmRemove={confirmRemove}
        confirmTitle="Delete Contact"
      />
      {contactDetailsModal && clickedContact && (
        <ContactDetails
          openContactDetailsModal={contactDetailsModal}
          closeContactDetailsModal={() => {
            setContactDetailsModal(false);
            setClickedContact(null);
          }}
          toggleImportance={toggleImportanceOf}
          handleEdit={handleEdit}
          removeContact={removeContact}
          contact={clickedContact}
        />
      )}
    </>
  );
};

export default Contacts;
