import React, { useState } from "react";
import grid_img from "../Assets/Navbar-grid-img.png";
import logout_img from "../Assets/logout.png";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/"); // Redirect to login after logout
  };

  const toggleProfileDropdown = () => {
    setProfileOpen(!profileOpen);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="w-full fixed top-0 z-40">
      <div className="flex w-full items-center justify-start bg-white p-1 pb-0 border-b-0 border-gray-200">
        <div className="flex items-center ">
          <div className="text-red-600 text-4xl font-bold border border-b-red-500 border-r-red-500 border-l-0 border-t-0">
            <img src={grid_img} alt="Logo" className="h-40 w-44" />
          </div>
        </div>
        <div className="w-full">
          <div className="flex bg-[#F5F5F5] w-full justify-end items-center">
            <div className="relative cursor-pointer mx-4">
              <i className="fa-solid fa-bell text-gray-500 text-2xl"></i>
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            </div>
            <div className="relative cursor-pointer text-2xl  mx-4">
              <p className="font-medium text-red-500">{`${user.first_name} ${user.last_name}`}</p>
            </div>
            <div className="relative">
              <div
                onClick={toggleProfileDropdown}
                className="flex items-center text-gray-500 cursor-pointer text-xl"
              >
                <i className="fa-solid fa-user-circle text-red-600"></i>
                <span className="ml-2 text-2xl font-medium">My Profile</span>
              </div>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border rounded shadow-lg z-50">
                  <div className="p-4">
                    <p className="font-bold">{`${user.first_name} ${user.last_name}`}</p>
                    <p>{user.email}</p>
                    <p>Role: {user.isadmin ? "Admin" : "User"}</p>
                    <p>Department: {user.department}</p>
                    <p>
                      Last Login: {new Date(user.last_login).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 border-t">
                    <button
                      onClick={openEditModal}
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                      Edit User
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-4 px-4 cursor-pointer">
              <i className="fa-solid fa-bars text-red-500 text-2xl"></i>
            </div>
            <div
              onClick={handleLogOut}
              className="ml-4 border cursor-pointer border-b-red-300 h-24 w-24 bg-[#E1DEDE] flex items-center justify-center"
            >
              <img src={logout_img} className="h-14 w-14" alt="Logout" />
            </div>
          </div>
          <div className=" bg-[#ECECEC] p-3 px-5 flex justify-between items-center text-gray-500">
            <div className=" flex items-center">
              <i className="fa-solid fa-home text-red-600 px-2"></i>
              <span
                onClick={() => navigate("/dashboard")}
                className="ml-2 cursor-pointer"
              >
                Dashboard
              </span>
              <i className="fa-solid fa-angle-right ml-2 text-red-600"></i>
              <div className="links">
                {location.pathname === "/dashboard" && (
                  <span className="ml-2"></span>
                )}
                {location.pathname === "/dashboard/courses" && (
                  <span className="ml-2">Course</span>
                )}
              </div>
            </div>
            <div className="text-xl text-red-500 px-2">
              <svg
                className="h-8 w-8 text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="14" cy="6" r="2" />
                <line x1="4" y1="6" x2="12" y2="6" />
                <line x1="16" y1="6" x2="20" y2="6" />
                <circle cx="8" cy="12" r="2" />
                <line x1="4" y1="12" x2="6" y2="12" />
                <line x1="10" y1="12" x2="20" y2="12" />
                <circle cx="17" cy="18" r="2" />
                <line x1="4" y1="18" x2="15" y2="18" />
                <line x1="19" y1="18" x2="20" y2="18" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            {/* Form fields to edit user details */}
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={user.first_name}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={user.last_name}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* Add more fields as necessary */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
