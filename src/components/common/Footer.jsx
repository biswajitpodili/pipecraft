import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">PipeCraft</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Delivering excellence in engineering solutions with a commitment
              to quality, efficiency, and innovation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/pipecraft-design-solutions-834521374"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-blue-400 transition-colors duration-300"
                  href="#projects"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li className="hover:text-blue-400 transition-colors duration-300">
                Process Engineering
              </li>
              <li className="hover:text-blue-400 transition-colors duration-300">
                Piping Engineering
              </li>
              <li className="hover:text-blue-400 transition-colors duration-300">
                Mechanical Engineering
              </li>
              <li className="hover:text-blue-400 transition-colors duration-300">
                Structural Engineering
              </li>
              <li className="hover:text-blue-400 transition-colors duration-300">
                E&I Engineering
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                <span className="text-gray-400">
                  FF 5, TIRUPATI MALL, KANSA ROAD VISNAGAR-384315
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-blue-400 shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  +91 8320068081
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-blue-400 shrink-0" />
                <a
                  href="mailto:info@pipecraft.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  PIPECRAFTDESIGN@GMAIL.COM
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PipeCraft. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
