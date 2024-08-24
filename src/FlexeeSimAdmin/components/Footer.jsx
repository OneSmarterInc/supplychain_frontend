import React from "react";
import img1 from "../Assets/wifiService.png";
import map from "../Assets/map.png";

const Footer = () => {
  return (
    <>
      {/* footer */}
      <footer className="bg-gray-900 px-3 text-gray-400 py-8">
        <div className="flex justify-between mx-auto px-4">
          <div className="flex w-full justify-between">
            <div className="h-28 w-44">
              <div className="">
              <img src={map} alt="" className="h-full w-full" />
              </div>
              <h1>Where are we now?</h1>
            </div>

            <div className="flex justify-evenly w-full">
              <div className="w-full px-4 mb-6 text-start pl-20">
                <h3 className="text-white font-bold mb-4">Product</h3>
                <ul>
                  <li>
                    <a href="/" className="hover:text-gray-200">
                      All Jobs
                    </a>
                  </li>
                  <li>
                    <a href="/" className="hover:text-gray-200">
                      Companies
                    </a>
                  </li>
                  <li>
                    <a href="/" className="hover:text-gray-200">
                      Candidates
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full  px-4 mb-6 text-start">
                <h3 className="text-white font-bold mb-4">Resources</h3>
                <ul>
                  <li>
                    <a href="/" className="hover:text-gray-200">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/" className="hover:text-gray-200">
                      User guides
                    </a>
                  </li>
                  <li>
                    <a href="/" className="hover:text-gray-200">
                      Webinars
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full  px-4 mb-6 text-start">
                <h3 className="text-white font-bold mb-4">Company</h3>
                <ul>
                  <li>
                    <a href="/" className="hover:text-gray-200">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/" className="hover:text-gray-200">
                      Join us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-3xl text-start">
              Are You ready to experiance Simulation?
            </h1>
            <button className="p-2 my-3 px-4 h-10  bg-teal-300  text-white">
              Try Now
            </button>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-xs">
            &copy; The Flexee Simulation System 2024 all rights reserved.
          </p>
          <div className="flex justify-center mt-4">
            <a href="/" className="text-gray-400 hover:text-gray-200 mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-200 mx-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-200 mx-2">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-200 mx-2">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
