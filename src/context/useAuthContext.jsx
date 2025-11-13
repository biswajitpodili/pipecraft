import React from "react";

const authContext = React.createContext();

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

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
    try {
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
        alert(data.message || "Login failed");
        return;
      }

      if (response.ok) {
        setUser(data.data.user);
        setIsAuthenticated(true);
      }
      return data.data.user;
    } catch (error) {
      throw error;
    }
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

  

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  React.useEffect(() => {
    checkAuthStatus();
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
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default useAuthContext;
