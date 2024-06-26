import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./ContextApi/MyContext";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  let user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: user?.username,
    email:user?.email,
    Email: user?.email,
    userType: user?.isadmin ? "Admin" : "User",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // (make an API call)
    setIsEditOpen(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setProfile({});
    navigate("/signin");
  };
  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center rounded-full bg-blue-gray-100 w-10 h-10 hover:bg-blue-gray-100"
      >
        {profile?.name ? (
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xl text-white font-bold">
            {profile?.name[0].toUpperCase()}
          </div>
        ):(
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xl text-white font-bold">
            {profile?.Email[0].toUpperCase()}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-40">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xl text-white font-bold">
                {profile?.name[0].toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.name}
                </p>
                <p className="text-sm text-gray-600">{profile?.email}</p>
              </div>
            </div>
            <div
              onClick={openEditModal}
              className=" text-gray-500 hover:text-gray-700"
            >
              <span className="material-icons text-green-400 px-3 w-28 cursor-pointer">
                edit <i class="fa-solid fa-pencil"></i>
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <span className="material-icons font-bold ">Email:</span>
                <span className="ml-3">{profile?.Email}</span>
              </div>
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <span className="material-icons font-bold ">Post:</span>
                <span className="ml-3">{profile?.userType}</span>
              </div>
            </a>
          </div>
          <div className="border-t border-gray-200">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-700 text-white">
                <div
                  className="p-2 text-white font-bold cursor-pointer rounded-md "
                  onClick={handleLogOut}
                >
                  {" "}
                  Log Out
                </div>
              </div>
            </a>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Edit Profile
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile?.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Company Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={profile?.Email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
