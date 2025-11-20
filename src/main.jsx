import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/useAuthContext.jsx";
import { ContactProvider } from "./context/useContactContext";
import { ProjectsProvider } from "./context/useProjectsContext.jsx";
import { ServicesProvider } from "./context/useServicesContext.jsx";
import { JobPostingsProvider } from "./context/useJobPostingsContext.jsx";
import { TeamProvider } from "./context/useTeamContext.jsx";
import { ApplicationsProvider } from "./context/useApplicationsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ContactProvider>
        <ProjectsProvider>
          <ServicesProvider>
            <JobPostingsProvider>
              <TeamProvider>
                <ApplicationsProvider>
                  <App />
                </ApplicationsProvider>
              </TeamProvider>
            </JobPostingsProvider>
          </ServicesProvider>
        </ProjectsProvider>
      </ContactProvider>
    </AuthProvider>
  </StrictMode>
);
