import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define a custom icon (optional)
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-2">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center text-center md:text-left">
          {/* Map Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            {/* <h3 className="uppercase tracking-wide text-gray-500 mb-4"> we are now</h3> */}
            {/* <div className="relative mx-auto md:mx-0 h-64 w-full">
              <MapContainer
                center={[39.7589, -84.1916]} // Dayton, OH coordinates
                zoom={3}
                scrollWheelZoom={false}
                className="h-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[39.7589, -84.1916]} icon={customIcon}>
                  <Popup>
                    Dayton, OH - Your location.
                  </Popup>
                </Marker>
              </MapContainer>
            </div> */}
          </div>

          {/* Social Media Section */}
          {/* <div className="w-full md:w-1/3 mb-8 md:mb-0">
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
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-0 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex justify-center space-x-4 mb-4 md:mb-0">
              {/* <a href="/" className="text-gray-500 hover:text-gray-700">
                SUPPORT
              </a>
              <span className="text-gray-500">•</span>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                JOIN US
              </a> */}
              {/* <span className="text-gray-500">•</span> */}
              <a href="/" className="text-gray-500 hover:text-gray-700">
                PRIVACY POLICY
              </a>
              <span className="text-gray-500">•</span>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                TERMS OF SERVICE
              </a>
            </div>
            <p className="text-gray-500 text-xs">
              &copy; flexee simulation 2024 all rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;