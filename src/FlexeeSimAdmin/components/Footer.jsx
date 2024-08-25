import React from "react";
import map from "../Assets/map.png"; // Replace with your actual map image
// import markerIcon from "../Assets/markerIcon.png"; // Replace with your actual marker ico÷n image

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center text-center md:text-left">
          {/* Map Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="uppercase tracking-wide text-gray-500 mb-4">Where we are now</h3>
            <div className="relative inline-block mx-auto md:mx-0">
              <img src={map} alt="World Map" className="w-full h-auto" />
              {/* <img src={markerIcon} alt="Location Marker" className="absolute bottom-16 left-1/2 transform -translate-x-1/2" /> */}
            </div>
            <p className="text-gray-500 mt-2 text-sm italic">Rio de Janeiro, Brazil</p>
          </div>

          {/* Social Media Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="uppercase tracking-wide text-gray-500 mb-4">Follow us</h3>
            <div className="flex justify-center space-x-6">
              <a href="/" aria-label="Instagram" className="text-gray-700 hover:text-red-600">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="/" aria-label="Facebook" className="text-gray-700 hover:text-red-600">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a href="/" aria-label="Pinterest" className="text-gray-700 hover:text-red-600">
                <i className="fab fa-pinterest text-2xl"></i>
              </a>
              <a href="/" aria-label="YouTube" className="text-gray-700 hover:text-red-600">
                <i className="fab fa-youtube text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex justify-center space-x-4 mb-4 md:mb-0">
              <a href="/" className="text-gray-500 hover:text-gray-700">
                SUPPORT
              </a>
              <span className="text-gray-500">•</span>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                JOIN US
              </a>
              <span className="text-gray-500">•</span>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                PRIVACY POLICY
              </a>
              <span className="text-gray-500">•</span>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                TERMS OF SERVICE
              </a>
            </div>
            <p className="text-gray-500 text-xs">
              &copy; flex simulation 2024 all rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;