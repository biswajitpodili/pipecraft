import React from "react";
import { toast } from "sonner";

const authContext = React.createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAuthContext = () => {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      toast.error(data.message || "Login failed");
      return;
    }

    if (response.ok) {
      setUser(data.data.user);
      setIsAuthenticated(true);
    }
    return data.data.user;
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/users/logout`, {
        method: "GET",
        credentials: "include",
      });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshAuthToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/refresh-token`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        await response.json();
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to refresh auth token:", error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setIsAuthenticated(true);
      } else {
        if (response.status === 401) {
          await refreshAuthToken();
          const response = await fetch(`${API_BASE_URL}/users/me`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
            setIsAuthenticated(true);
          }
          return;
        }

        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.log(error);

      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const updateProfile = async (userId, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/users/${userId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Profile update failed");
        return;
      }

      if (response.ok) {
        setUser(data.data);
        toast.success("Profile updated successfully");
        return data.data;
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Password change failed");
        return false;
      }

      if (response.ok) {
        toast.success("Password changed successfully");
        return true;
      }
    } catch (error) {
      console.error("Password change failed:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        checkAuthStatus,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default useAuthContext;
