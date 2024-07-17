import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import axios from "axios";
import MyContext from "./ContextApi/MyContext";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  let user = JSON.parse(localStorage.getItem("user"));
  const { api } = useContext(MyContext);
  const [profile, setProfile] = useState({
    username: user?.username,
    email: user?.email,
    department: user?.department,
    first_name: user?.first_name,
    last_name: user?.last_name,
    course: user?.course,
    university: user?.university,
    userType: user?.isadmin ? "Admin" : "User",
  });

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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${api}/user-details/${user?.userid}/`,
        profile // Directly send the profile state
      );
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      setProfile(data); // Update the profile state with the new data
      console.log("Updated profile edit:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsEditOpen(false);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setProfile({});
    navigate("/signin");
  };

  return (
    <div className="relative">
      <Popover placement="bottom-end">
        <PopoverHandler>
          <div className="cursor-pointer flex items-center rounded-full bg-blue-gray-100 w-10 h-10 hover:bg-blue-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xl text-white font-bold">
              {profile?.email ? profile?.email[0].toUpperCase() : "U"}
            </div>
          </div>
        </PopoverHandler>
        <PopoverContent className="mt-2 w-80 bg-white rounded-md shadow-lg z-40">
          <div className="px-4 py-3 flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xl text-white font-bold">
                {profile?.email ? profile?.email[0].toUpperCase() : "U"}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.username || "Unknown User"}
                </p>
                <p className="text-sm text-gray-600">
                  {profile?.email || "No Email"}
                </p>
              </div>
            </div>

            <div
              onClick={openEditModal}
              className="text-gray-500 hover:text-gray-700 "
            >
              <span className="material-icons flex space-x-1 hover:scale-125 text-green-400 px-3  cursor-pointer">
                <p>edit</p> <i className="fa-solid fa-pencil"></i>
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="">
              <div className="items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <span className="material-icons font-bold">Full Name:</span>
                <span className="ml-3">{profile?.first_name || "N/A"}</span>
                <span className="ml-1">{profile?.last_name || "N/A"}</span>
              </div>
            </div>
            <div className="items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <span className="material-icons font-bold">department:</span>
              <span className="ml-3">{profile?.department || "N/A"}</span>
            </div>
            <div className="items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <span className="material-icons font-bold">Course:</span>
              <span className="ml-3">{profile?.course || "N/A"}</span>
            </div>
            <div className="items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <span className="material-icons font-bold">University:</span>
              <span className="ml-3">{profile?.university || "N/A"}</span>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div
              onClick={handleLogOut}
              className="flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-700 text-white"
            >
              <button className="p-2 text-white font-bold cursor-pointer rounded-md">
                Log Out
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isEditOpen} handler={closeEditModal}>
        <DialogHeader>Edit Profile</DialogHeader>
        <DialogBody divider>
          <form className="h-96 overflow-auto" onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                UserName
              </label>
              <input
                type="text"
                name="username"
                value={profile?.username || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={profile?.first_name || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={profile?.last_name || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={profile?.department || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <input
                type="text"
                name="course"
                value={profile?.course || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <input
                type="text"
                name="university"
                value={profile?.university || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <button
            type="button"
            onClick={closeEditModal}
            className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ProfileDropdown;
