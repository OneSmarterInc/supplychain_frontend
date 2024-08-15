import { Link, useLocation } from "react-router-dom";
import React from "react";
import logout_img from "../../Assets/logout.png";
const BackOfficeSidebar = () => {
  const location = useLocation();
  return (
    <div className="w-60 fixed top-0 left-0">
      <div className="w-full h-12 text-white">
        <h1 className="text-2xl p-2 bg-[#383838] text-start font-bold pl-4">
          FLEXEE
        </h1>
      </div>
      <div
        className={` w-60  z-40 left-0 h-full min-h-screen text-start bg-[#0E406A] text-gray-300 p-4`}
      >
        <ul>
          <li className="mb-2 cursor-pointer">
            <Link
              to="/flexeesim/backoffice/user"
              className={`hover:text-gray-500 ${
                location.pathname === "/flexeesim/backoffice/user"
                  ? "text-red-500"
                  : "text-gray-100"
              }`}
            >
              View Users
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/flexeesim/backoffice/user"
              className={`hover:text-gray-500 ${
                location.pathname === "/flexeesim/" ? "text-red-500" : "text-gray-100"
              }`}
            >
              Calculate
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/flexeesim/backoffice/rankings"
              className={`hover:text-gray-500 ${
                location.pathname === "/flexeesim/backoffice/rankings"
                  ? "text-red-500"
                  : "text-gray-100"
              }`}
            >
              Ranking
            </Link>
          </li>

          <hr className=" opacity-40 my-4" />
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2 text-blue-500 mt-2">
              REPORTS
            </h2>
            <ul>
              <li className="mb-1">
                <Link
                  to="/flexeesim/backoffice/reports"
                  className={`hover:text-gray-500 ${
                    location.pathname === "/flexeesim/backoffice/reports"
                      ? "text-red-500"
                      : "text-gray-100"
                  }`}
                >
                  Trainer/Teacher Feedback
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/flexeesim/backoffice/reports"
                  className={`hover:text-gray-500 ${
                    location.pathname === "/flexeesim/backoffice/report"
                      ? "text-red-500"
                      : "text-gray-100"
                  }`}
                >
                  Onsite Reporting
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/flexeesim/"
                  className={`hover:text-gray-500 ${
                    location.pathname === "/flexeesim/" ? "text-red-500" : "text-gray-100"
                  }`}
                >
                  KPI Reports
                </Link>
              </li>
            </ul>
          </li>
          <hr className=" opacity-40 my-4" />
          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2 mt-2 text-blue-500">
              QUESTIONNAIRE
            </h2>
            <ul>
              <li className="mb-1">
                <Link
                  to="/flexeesim/"
                  className={`hover:text-gray-500 ${
                    location.pathname === "/flexeesim/" ? "text-red-500" : "text-gray-100"
                  }`}
                >
                  Teamrole Answers
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/flexeesim/"
                  className={`hover:text-gray-500 ${
                    location.pathname === "/flexeesim/" ? "text-red-500" : "text-gray-100"
                  }`}
                >
                  Metaprogram Answers
                </Link>
              </li>
            </ul>
          </li>
          <hr className=" opacity-40 my-4" />

          <li className="mb-4">
            <h2 className="text-lg font-semibold mb-2 mt-2 text-blue-500">
              OTHERS
            </h2>
            <ul>
              <li className="mb-1">
                <Link
                  to="/flexeesim/backoffice/faqs"
                  className={`hover:text-gray-500 ${
                    location.pathname === "/flexeesim/backoffice/faqs"
                      ? "text-red-500"
                      : "text-gray-100"
                  }`}
                >
                  FAQs
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/flexeesim/"
                  className={`hover:text-gray-500 ${
                    location.pathname === "/flexeesim/" ? "text-red-500" : "text-gray-100"
                  }`}
                >
                  Manage Pool
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <div className="fixed bottom-0 left-0">
          <div className="text-xl h-12 flex items-center justify-center w-60 border border-b-red-500 border-b-4  bg-gray-200 text-red-500  text-center">
            <div className="ml-4  cursor-pointer border-b-red-300  mx-3  flex items-center justify-center">
              {/* <i className="fa-solid fa-sign-out-alt text-red-600 text-4xl"></i> */}
              <img src={logout_img} className="h-8 w-8" alt="" />
            </div>{" "}
            LogOut
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackOfficeSidebar;
