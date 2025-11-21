import React, { createContext, useState, useEffect, useContext } from "react";
import useAuthContext from "./useAuthContext";
import { toast } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const ApplicationsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
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
  const { isAuthenticated } = useAuthContext();
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

  const createApplication = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Application submission failed");
        return { success: false, message: data.message };
      }

      if (response.ok) {
        toast.success("Application submitted successfully!");
        return { success: true, data: data.data };
      }
    } catch (error) {
      console.error("Error creating application:", error);
      toast.error("Failed to submit application. Please try again.");
      return { success: false, message: error.message };
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
    if (isAuthenticated) {
      getApplications();
    }
  }, [isAuthenticated]);

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        loading,
        getApplications,
        getApplicationsByCareer,
        createApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
