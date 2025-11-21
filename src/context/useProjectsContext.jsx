import React, { createContext, useState, useEffect } from "react";
import projectData from "../lib/data/projects";
import { toast } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
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
  const [projects, setProjects] = useState(projectData);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        const storedProjects = localStorage.getItem("projects");
        const fetchedProjects = data.data || [];
        if (
          !storedProjects ||
          JSON.stringify(JSON.parse(storedProjects)) !==
            JSON.stringify(fetchedProjects)
        ) {
          localStorage.setItem("projects", JSON.stringify(fetchedProjects));
        }
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
        toast.success("Project created successfully");
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
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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


// eslint-disable-next-line react-refresh/only-export-components
export default useProjectsContext;
