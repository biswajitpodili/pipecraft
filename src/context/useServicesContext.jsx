import React, { createContext, useState, useEffect } from "react";

export const ServicesContext = createContext();

const useServicesContext = () => {
  const context = React.useContext(ServicesContext);
  if (!context) {
    throw new Error(
      "useServicesContext must be used within a ServicesProvider"
    );
  }
  return context;
};

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const getServices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setServices(data.data || []);
      } else {
        console.error("Failed to fetch services:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData) => {
    try {
      const response = await fetch(`${API_URL}/services`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();

      if (response.ok) {
        await getServices();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to create service");
      }
    } catch (error) {
      console.error("Failed to create service:", error);
      throw error;
    }
  };

  const updateService = async (serviceId, serviceData) => {
    try {
      const response = await fetch(`${API_URL}/services/${serviceId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();

      if (response.ok) {
        await getServices();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to update service");
      }
    } catch (error) {
      console.error("Failed to update service:", error);
      throw error;
    }
  };

  const deleteService = async (serviceId) => {
    try {
      const response = await fetch(`${API_URL}/services/${serviceId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        await getServices();
        return data.data;
      } else {
        throw new Error(data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
      throw error;
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        services,
        loading,
        getServices,
        createService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default useServicesContext;
