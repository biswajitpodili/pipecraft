import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import NavBar from "./components/common/NavBar";
import { BrowserRouter } from "react-router";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import Footer from "./components/common/Footer";
import Contactus from "./pages/ContactUs";
import Projects from "./pages/Projects";
import { useEffect } from "react";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  document.title = `PipeCraft - ${pathname.split("/").pop() || "Home"}`;

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/service" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contactus />} />
      </Routes> 
      <Footer />
    </BrowserRouter>
  );
}

export default App;
