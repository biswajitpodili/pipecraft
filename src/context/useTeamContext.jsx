import React, { createContext, useState, useEffect, useContext } from "react";
import useAuthContext from "./useAuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const TeamContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeamContext must be used within TeamProvider");
  }
  return context;
};

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const TeamProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTeam = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/users`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setTeam(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTeamMember = async (memberData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", memberData.name);
      formData.append("email", memberData.email);
      formData.append("password", memberData.password);
      formData.append("phone", memberData.phone);
      if (memberData.age) formData.append("age", memberData.age);
      formData.append("role", memberData.role);
      if (memberData.avatar) formData.append("avatar", memberData.avatar);

      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        await getTeam();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error creating team member:", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateTeamMember = async (userId, memberData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", memberData.name);
      formData.append("email", memberData.email);
      formData.append("phone", memberData.phone);
      if (memberData.age) formData.append("age", memberData.age);
      if (memberData.avatar) formData.append("avatar", memberData.avatar);

      const response = await fetch(`${API_URL}/users/users/${userId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        await getTeam();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error updating team member:", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTeamMember = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        await getTeam();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getTeam();
    }
  }, [isAuthenticated]);

  return (
    <TeamContext.Provider
      value={{
        team,
        loading,
        getTeam,
        createTeamMember,
        updateTeamMember,
        deleteTeamMember,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
