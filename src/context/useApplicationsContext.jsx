import React, { createContext, useState, useEffect, useContext } from "react";

export const ApplicationsContext = createContext();

export const useApplicationsContext = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error(
      "useApplicationsContext must be used within ApplicationsProvider"
    );
  }
  return context;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setApplications(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getApplicationsByCareer = async (careerId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/applications/career/${careerId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
    } catch (error) {
      console.error("Error fetching applications by career:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (applicationId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/applications/${applicationId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.success) {
        await getApplications();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        loading,
        getApplications,
        getApplicationsByCareer,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
