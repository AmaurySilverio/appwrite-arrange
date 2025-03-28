import { useState, useEffect } from "react";
import companyService from "../services/companies";
import contactService from "../services/contacts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompanyForm from "../components/CompanyForm";
import Filter from "../components/Filter";
import CompaniesField from "../components/CompaniesField";
import Notification from "../components/Notification";
import ConfirmNotification from "../components/ConfirmNotification";
import CompanyDetails from "../components/CompanyDetails";
import { useAuth } from "../utils/AuthProvider";

function Board() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [priority, setPriority] = useState("no");
  const [applied, setApplied] = useState("no");
  const [selectedItem, setSelectedItem] = useState("all");
  const [newSearch, setNewSearch] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [modal, setModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [clickedCompany, setClickedCompany] = useState(null);
  const [companyDetailsModal, setCompanyDetailsModal] = useState(false);
  const [createJob, setCreateJob] = useState(false);
  const [companyFormModal, setCompanyFormModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [showAddContacts, setShowAddContacts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showContactsDropdown, setShowContactsDropdown] = useState(false);
  const [showContactsFormDropdown, setShowContactsFormDropdown] =
    useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const user$id = user.$id;
    companyService
      .getAll(user$id)
      .then((initialCompanies) => {
        setCompanies(initialCompanies);
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(
          "There is a problem with the server. Please refresh the page"
        );
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
      });
    contactService
      .getAll(user$id)
      .then((initialContacts) => {
        setOptions(
          initialContacts.map((contact) => ({
            value: contact.$id,
            label: `${contact.firstName} ${contact.lastName}`,
          }))
        );
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

  const companiesToShow =
    filteredCompanies.length === 0 && newSearch.trim() !== ""
      ? []
      : selectedItem === "all"
      ? filteredCompanies.length < 1
        ? companies
        : filteredCompanies
      : selectedItem === "applied"
      ? filteredCompanies.length < 1
        ? companies.filter((company) => company.applied)
        : filteredCompanies.filter((company) => company.applied)
      : filteredCompanies.length < 1
      ? companies.filter((company) => company.priority)
      : filteredCompanies.filter((company) => company.priority);

  const toggleImportanceOf = ($id) => {
    const company = companies.find((c) => c.$id === $id);
    const changedCompany = { ...company, priority: !company.priority };
    const priorityOject = { priority: changedCompany.priority };
    companyService
      .update($id, priorityOject)
      .then((returnedCompany) => {
        setCompanies(
          companies.map((c) => (c.$id === $id ? returnedCompany : c))
        );
        if (filteredCompanies.length > 0) {
          setFilteredCompanies(
            filteredCompanies.map((c) => (c.$id === $id ? returnedCompany : c))
          );
        }
        if (clickedCompany) {
          setClickedCompany(changedCompany);
        }
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(
          `'${company.name}' was already deleted from the server.`
        );
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        setCompanies(companies.filter((c) => c.$id !== $id));
        if (filteredCompanies.length > 0) {
          setFilteredCompanies(
            filteredCompanies.map((c) => (c.$id === $id ? returnedCompany : c))
          );
        }
      });
  };
  const toggleApplied = ($id) => {
    const company = companies.find((c) => c.$id === $id);
    const changedCompany = { ...company, applied: !company.applied };
    const appliedObject = { applied: changedCompany.applied };
    companyService
      .update($id, appliedObject)
      .then((returnedCompany) => {
        setCompanies(
          companies.map((c) => (c.$id === $id ? returnedCompany : c))
        );
        if (filteredCompanies.length > 0) {
          setFilteredCompanies(
            filteredCompanies.map((c) => (c.$id === $id ? returnedCompany : c))
          );
        }
        if (clickedCompany) {
          setClickedCompany(changedCompany);
        }
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(
          `'${company.name}' was already deleted from the server.`
        );
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        setCompanies(companies.filter((c) => c.$id !== $id));
        if (filteredCompanies.length > 0) {
          setFilteredCompanies(
            filteredCompanies.map((c) => (c.$id === $id ? returnedCompany : c))
          );
        }
      });
  };

  const addCompany = (event) => {
    const user$id = user.$id;
    event.preventDefault();
    setCompanyFormModal(false);
    const companyObject = {
      name: newCompany.trim(),
      location: newLocation.trim(),
      position: newPosition.trim(),
      link: newLink.trim(),
      description: newDescription.trim(),
      priority: priority === "yes" ? true : false,
      applied: applied === "yes" ? true : false,
      contacts: selectedOptions.map((opt) => opt.value),
      createdBy: user$id,
    };
    if (
      companies.find(
        (company) =>
          company.name.toUpperCase() === companyObject.name.toUpperCase()
      )
    ) {
      setModal(true);
      setErrorMessage(
        `'${companyObject.name}' has already been already added to your Hitlist.`
      );
      setTimeout(() => {
        setModal(false);
        setErrorMessage("");
      }, 5000);
      setNewCompany("");
      setNewLocation("");
      setNewPosition("");
      setNewLink("");
      setNewDescription("");
      setPriority("no");
      setApplied("no");
      return false;
    }

    companyService
      .create(companyObject)
      .then((returnedCompany) => {
        setCompanies(companies.concat(returnedCompany));
        setNewCompany("");
        setNewLocation("");
        setNewPosition("");
        setNewLink("");
        setNewDescription("");
        setPriority("no");
        setApplied("no");
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage("Company could not be added. Please try again.");
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
      });
  };

  const removeCompany = ($id) => {
    setConfirmationModal(true);

    // Store the function in a variable to pass the $id at confirmation time
    const handleConfirmDeletion = () => {
      companyService
        .remove($id)
        .then(() => {
          setCompanies(companies.filter((c) => c.$id !== $id));
          setCompanyDetailsModal(false);
          setClickedCompany(null);
          if (filteredCompanies.length > 0) {
            setFilteredCompanies(
              filteredCompanies.filter((c) => c.$id !== $id)
            );
          }
        })
        .catch((error) => {
          setModal(true);
          setErrorMessage("Company was already deleted from the server.");
          setTimeout(() => {
            setModal(false);
            setErrorMessage("");
          }, 5000);
          setCompanies(companies.filter((c) => c.$id !== $id));
          if (filteredCompanies.length > 0) {
            setFilteredCompanies(
              filteredCompanies.filter((c) => c.$id !== $id)
            );
          }
        });

      setConfirmationModal(false);
    };

    // Pass `handleConfirmDeletion` to modal
    setConfirmRemove(() => handleConfirmDeletion);
  };
  const showCompanyDetails = (company) => {
    setClickedCompany(company);
    setCompanyDetailsModal(true);
  };

  const handleCompanyInputChange = (event) => {
    setNewCompany(event.target.value);
  };
  const handleLocationInputChange = (event) => {
    setNewLocation(event.target.value);
  };
  const handlePositionInputChange = (event) => {
    setNewPosition(event.target.value);
  };
  const handleDescriptionInputChange = (event) => {
    setNewDescription(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleAppliedChange = (event) => {
    setApplied(event.target.value);
  };
  const handleLinkInputChange = (event) => {
    setNewLink(event.target.value);
  };
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    console.log(searchTerm);
    setNewSearch(searchTerm);

    if (searchTerm.trim() === "") {
      // If search is empty, reset to all companies
      setFilteredCompanies([]);
    } else {
      // Filter companies as the user types
      const filteredSearch = companies.filter((company) =>
        filterByCompanyOrLocation(company, searchTerm)
      );
      setFilteredCompanies(filteredSearch);
    }
  };
  function filterByCompanyOrLocation(company, searchTerm) {
    return (
      company.name.toUpperCase().includes(searchTerm.toUpperCase().trim()) ||
      company.location.toUpperCase().includes(searchTerm.toUpperCase().trim())
    );
  }
  const handleClearSearchClick = () => {
    setFilteredCompanies([]);
    setNewSearch("");
  };
  const handleSetSelectedItem = (e) => setSelectedItem(e.target.value);

  // const toggleOption = (e, option) => {
  //   e.preventDefault();
  //   setSelectedOptions((prevSelected) => {
  //     // If it's already selected, remove it, otherwise add it
  //     if (prevSelected.includes(option)) {
  //       return prevSelected.filter((o) => o.value !== option.value);
  //     } else {
  //       return prevSelected.concat(option);
  //     }
  //   });
  // };
  const toggleOption = (e, option) => {
    e.preventDefault();
    setSelectedOptions((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (opt) => opt.value === option.value
      );

      if (isAlreadySelected) {
        // Remove the option if already selected
        return prevSelected.filter((opt) => opt.value !== option.value);
      } else {
        // Add the option if not already selected
        return [...prevSelected, option];
      }
    });
  };
  const toggleShowAddContacts = () => {
    setShowAddContacts(!showAddContacts);
  };
  const closeShowAddContacts = () => {
    setShowAddContacts(false);
  };
  const clearSelectedOptions = () => {
    setSelectedOptions([]);
  };
  const updateContacts = async ($id) => {
    setLoading(true);
    const company = companies.find((c) => c.$id === $id);
    const changedCompany = {
      ...company,
      contacts: selectedOptions.map((opt) => opt.value),
    };
    const contactsObject = { contacts: changedCompany.contacts };
    try {
      const returnedCompany = await companyService.update($id, contactsObject);

      setCompanies(companies.map((c) => (c.$id === $id ? returnedCompany : c)));
      if (filteredCompanies.length > 0) {
        setFilteredCompanies(
          filteredCompanies.map((c) => (c.$id === $id ? returnedCompany : c))
        );
      }
      setClickedCompany(returnedCompany);
    } catch (error) {
      setModal(true);
      setErrorMessage(`'${company.name}' was already deleted from the server.`);
      setTimeout(() => {
        setModal(false);
        setErrorMessage("");
      }, 5000);
      setCompanies(companies.filter((c) => c.$id !== $id));
      if (filteredCompanies.length > 0) {
        setFilteredCompanies(
          filteredCompanies.map((c) => (c.$id === $id ? returnedCompany : c))
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const toggleShowContactsDropdown = () => {
    setShowContactsDropdown(!showContactsDropdown);
  };
  const toggleShowContactsFormDropdown = () => {
    setShowContactsFormDropdown(!showContactsFormDropdown);
  };

  return (
    <>
      <Navbar />
      {companyFormModal ? (
        <CompanyForm
          onSubmit={addCompany}
          onCompanyInputChange={handleCompanyInputChange}
          companyInputValue={newCompany}
          onLocationInputChange={handleLocationInputChange}
          locationInputValue={newLocation}
          onLinkInputChange={handleLinkInputChange}
          linkInputValue={newLink}
          onPositionInputChange={handlePositionInputChange}
          positionInputValue={newPosition}
          onDescriptionInputChange={handleDescriptionInputChange}
          descriptionInputValue={newDescription}
          priority={priority}
          onRadioChange={handlePriorityChange}
          applied={applied}
          onAppliedRadioChange={handleAppliedChange}
          openCompanyFormModal={companyFormModal}
          closeCompanyFormModal={() => setCompanyFormModal(false)}
          toggleOption={toggleOption}
          selectedOptions={selectedOptions}
          options={options}
          showContactsFormDropdown={showContactsFormDropdown}
          toggleShowContactsFormDropdown={toggleShowContactsFormDropdown}
        />
      ) : null}
      <main className="content-container">
        <h1>Companies</h1>
        <Filter
          searchValue={newSearch}
          onSearchChange={handleSearchChange}
          onClearSearchClick={handleClearSearchClick}
          selectedItem={selectedItem}
          handleSetSelectedItem={handleSetSelectedItem}
          optionChoiceRender={applied}
          clickAddButton={() => setCompanyFormModal(true)}
        />
        <CompaniesField
          companiesToShow={[...companiesToShow]}
          toggleImportance={toggleImportanceOf}
          removeCompany={removeCompany}
          showCompanyDetails={showCompanyDetails}
        />
      </main>
      <Footer />
      {companyDetailsModal && clickedCompany && (
        <CompanyDetails
          openCompanyDetailsModal={companyDetailsModal}
          closeCompanyDetailsModal={() => {
            setCompanyDetailsModal(false);
            setClickedCompany(null);
          }}
          toggleImportance={toggleImportanceOf}
          toggleApplied={toggleApplied}
          removeCompany={removeCompany}
          company={clickedCompany}
          toggleShowAddContacts={toggleShowAddContacts}
          closeShowAddContacts={closeShowAddContacts}
          showAddContacts={showAddContacts}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          clearSelectedOptions={clearSelectedOptions}
          toggleOption={toggleOption}
          options={options}
          updateContacts={updateContacts}
          loading={loading}
          toggleShowContactsDropdown={toggleShowContactsDropdown}
          showContactsDropdown={showContactsDropdown}
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
        confirmTitle="Delete Job"
      />
    </>
  );
}

export default Board;
