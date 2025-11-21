import React, { useEffect } from "react";
import useAuthContext from "./useAuthContext";

const ContactContext = React.createContext();

const useContactContext = () => {
  const context = React.useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { isAuthenticated } = useAuthContext();

  const createAContact = async (contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create contact");
      }

      setContacts((prevContacts) => [...prevContacts, data.data]);
      return data;
    } catch (err) {
      console.error("Error in createAContact:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/all`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch contacts");
      }
      setContacts(data.data);
    } catch (err) {
      console.error("Error in getContacts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (contactId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update contact");
      }
      // Update the contact in local state
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.contactId === contactId ? data.data : contact
        )
      );
      return data;
    } catch (err) {
      console.error("Error in updateContact:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (contactId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete contact");
      }
      // Remove the contact from local state
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.contactId !== contactId)
      );
      return data;
    } catch (err) {
      console.error("Error in deleteContact:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      if (isAuthenticated) {
        getContacts();
      }
    }
    loadData();
  }, [isAuthenticated]);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        setContacts,
        loading,
        setLoading,
        error,
        setError,
        createAContact,
        getContacts,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export { ContactProvider };
// eslint-disable-next-line react-refresh/only-export-components
export default useContactContext;
