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
import logout_img from "../assets/logout.svg";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  let user = JSON.parse(localStorage.getItem("user"));
  const { api, api1 } = useContext(MyContext);
  const [profile, setProfile] = useState({
    username: user?.username,
    email: user?.email,
    department: user?.department,
    first_name: user?.first_name,
    last_name: user?.last_name,
    course: user?.course,
    university: user?.university,
    userType: user?.isadmin ? "Admin" : "User",
    image:user?.image
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
        profile
      );
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      setProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsEditOpen(false);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setProfile({});
    navigate("/");
  };

  return (
    <div className="relative">
      <Popover placement="bottom-end">
        <PopoverHandler>
          <div className="cursor-pointer flex items-center">
            <div className="flex items-center justify-center text-xl text-red font-bold px-2 mr-3">
             
              <img
                    src={`${api1}${profile?.image}` || "default-image.png"} 
                    alt={profile.first_name}
                    className="h-7 w-7 rounded-full"
                  />
             
            </div>
          </div>
        </PopoverHandler>
        <PopoverContent className="mt-2 w-80 bg-white rounded-md shadow-lg z-40">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-2xl text-white font-bold">
              <img
                    src={`${api1}${profile?.image}` || "default-image.png"} 
                    alt={profile.first_name}
                    className="h-12 w-12 rounded-full"
                  />
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900">
                  {profile?.first_name || "Unknown User"} {profile?.last_name || ""}
                </p>
                <p className="text-sm text-gray-600">
                  {profile?.email || "No Email"}
                </p>
              </div>
            </div>
            <div
              onClick={openEditModal}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <span className="flex items-center space-x-1 hover:scale-125 text-green-400">
                <p className="text-sm">Edit</p>
                <i className="fa-solid fa-pencil text-sm"></i>
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-2">
            <table className="w-full text-sm text-left text-gray-700 mt-2">
              <tbody>
                <tr>
                  <td className="font-bold">Full Name:</td>
                  <td>{profile?.first_name || "N/A"} {profile?.last_name || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-bold">Department:</td>
                  <td>{profile?.department || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-bold">Course:</td>
                  <td>{profile?.course || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-bold">University:</td>
                  <td>{profile?.university || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-200 mt-2">
            <div
              onClick={handleLogOut}
              className="flex items-center justify-center rounded-lg bg-gray-500 hover:bg-red-700 text-white p-2 cursor-pointer mt-2"
            >
              <h3 className="px-2">Logout</h3>
              <img src={logout_img} className="h-5 w-5 px-1" alt="Logout" />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isEditOpen} handler={closeEditModal}>
        <DialogHeader>Edit Profile</DialogHeader>
        <DialogBody divider>
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={profile?.username || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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