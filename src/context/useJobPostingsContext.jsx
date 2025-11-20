import React, { createContext, useState, useEffect } from "react";

export const JobPostingsContext = createContext();

const useJobPostingsContext = () => {
  const context = React.useContext(JobPostingsContext);
  if (!context) {
    throw new Error(
      "useJobPostingsContext must be used within a JobPostingsProvider"
    );
  }
  return context;
};

export const JobPostingsProvider = ({ children }) => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const getJobPostings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/careers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setJobPostings(data.data || []);
      } else {
        console.error("Failed to fetch job postings:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch job postings:", error);
    } finally {
      setLoading(false);
    }
  };

  const createJobPosting = async (jobData) => {
    try {
      const response = await fetch(`${API_URL}/careers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (response.ok) {
        await getJobPostings();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to create job posting");
      }
    } catch (error) {
      console.error("Failed to create job posting:", error);
      throw error;
    }
  };

  const updateJobPosting = async (careerId, jobData) => {
    try {
      const response = await fetch(`${API_URL}/careers/${careerId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (response.ok) {
        await getJobPostings();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to update job posting");
      }
    } catch (error) {
      console.error("Failed to update job posting:", error);
      throw error;
    }
  };

  const deleteJobPosting = async (careerId) => {
    try {
      const response = await fetch(`${API_URL}/careers/${careerId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        await getJobPostings();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to delete job posting");
      }
    } catch (error) {
      console.error("Failed to delete job posting:", error);
      throw error;
    }
  };

  useEffect(() => {
    getJobPostings();
  }, []);

  return (
    <JobPostingsContext.Provider
      value={{
        jobPostings,
        loading,
        getJobPostings,
        createJobPosting,
        updateJobPosting,
        deleteJobPosting,
      }}
    >
      {children}
    </JobPostingsContext.Provider>
  );
};

export default useJobPostingsContext;
