import { Route, Routes, useLocation } from "react-router";
import Home from "@/pages/landing/Home";
import { BrowserRouter } from "react-router";
import Aboutus from "@/pages/landing/Aboutus";
import Services from "@/pages/landing/Services";
import Contactus from "@/pages/landing/ContactUs";
import Projects from "@/pages/landing/Projects";
import { useEffect } from "react";
import Careers from "@/pages/landing/Careers";
import ApplyJob from "@/pages/landing/ApplyJob";
import Login from "@/pages/auth/Login";
import HomeLayout from "@/layout/HomeLayout";
import DashboardServices from "@/pages/dashboard/Services";
import JobPostings from "@/pages/dashboard/JobPostings";
import Contacts from "@/pages/dashboard/Contacts";
import Applications from "@/pages/dashboard/Applications";
import DashboardProjects from "@/pages/dashboard/Projects";
import Team from "@/pages/dashboard/Team";
import DashboardLayout from "@/layout/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import Error from "@/pages/common/Error";
import Profile from "./pages/dashboard/Profile";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  document.title = `PipeCraft - ${
    pathname.split("/").pop().charAt(0).toUpperCase() +
      pathname.split("/").pop().slice(1).replace(/-/g, " ") || "Home"
  }`;

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="services" element={<Services />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="projects" element={<Projects />} />
          <Route path="careers" element={<Careers />} />
          <Route path="careers/:careerId" element={<ApplyJob />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="/dashboard/services" element={<DashboardServices />} />
          <Route path="/dashboard/projects" element={<DashboardProjects />} />
          <Route path="/dashboard/job-postings" element={<JobPostings />} />
          <Route path="/dashboard/contacts" element={<Contacts />} />
          <Route path="/dashboard/applications" element={<Applications />} />
          <Route path="/dashboard/team" element={<Team />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
