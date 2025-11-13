import React, { useState } from "react";
import { useLocation, Link } from "react-router";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: "/", label: "Home" },
    { id: "/aboutus", label: "About" },
    { id: "/services", label: "Service" },
    { id: "/projects", label: "Projects" },
    { id: "/careers", label: "Careers" },
    { id: "/contactus", label: "Contact Us" }
  ];

  return (
    <nav className="bg-white text-gray-800 poppins-semibold sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-18 mt-2" />
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
        <ul
          className={`md:flex md:items-center font-semibold md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                className={`block py-2 px-4 transition-colors duration-300 ${
                  location.pathname === item.id
                    ? "text-blue-600 border-b-2 border-blue-600 md:border-b-2"
                    : "hover:text-blue-600 md:hover:text-blue-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
