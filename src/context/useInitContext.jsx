import React from "react";

const InitContext = React.createContext();

export const InitProvider = ({ children }) => {
  const pingMe = async () => {
    try {
     await fetch("/api/pingme");
  
    } catch (error) {
      console.error("Ping failed:", error);
    }
  };

  React.useEffect(() => {
    pingMe();
  }, []);
  return (
    <InitContext.Provider value={InitContext}>{children}</InitContext.Provider>
  );
};

const useInitContext = () => {
  // Initialization logic can be added here in the future
  return React.useContext(InitContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export default useInitContext;