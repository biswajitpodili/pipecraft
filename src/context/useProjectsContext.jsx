import React, { createContext, useState, useEffect } from "react";

export const ProjectsContext = createContext();

const useProjectsContext = () => {
  const context = React.useContext(ProjectsContext);
  if (!context) {
    throw new Error(
      "useProjectsContext must be used within a ProjectsProvider"
    );
  }
  return context;
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";;

  const getProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProjects(data.data || []);
      } else {
        console.error("Failed to fetch projects:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      const formData = new FormData();
      formData.append("name", projectData.name);
      formData.append("client", projectData.client);
      formData.append("scope", projectData.scope);

      if (projectData.image) {
        formData.append("image", projectData.image);
      }

      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        await getProjects();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error;
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      const formData = new FormData();
      formData.append("name", projectData.name);
      formData.append("client", projectData.client);
      formData.append("scope", projectData.scope);

      if (projectData.image && projectData.image instanceof File) {
        formData.append("image", projectData.image);
      }

      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        await getProjects();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      throw error;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        await getProjects();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to delete project");
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      throw error;
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        getProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default useProjectsContext;
