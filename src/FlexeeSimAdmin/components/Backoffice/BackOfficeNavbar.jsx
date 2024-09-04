import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../../../Components/Profile";
import MyContext from "../../../Components/ContextApi/MyContext";
import axios from "axios";

const BackOfficeNavbar = () => {
  const navigate = useNavigate();
  const [selectedCoursesFromNavbar, setSelectedCoursesFromNavbar] = useState([]);
  const { api } = useContext(MyContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${api}/user/${user.userid}/subscriptions/`
        );
        const transformedCourses = response.data.map((item) => ({
          course: item.simulation.course || "Unnamed Course",
          members: item.simulation.members,
          organization: `Simulation ${item.simulation.simulation_id}`,
          startDate: item.simulation.start_date,
          endDate: item.simulation.end_date,
          passcode: item.simulation.passcode,
        }));
        setCourses(transformedCourses);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      }
    };

    fetchCourses();

    // Load the selected course from localStorage
    const savedCourse = JSON.parse(localStorage.getItem("BackofficeNavbarSelectedCourse"));
    if (savedCourse) {
      setSelectedCoursesFromNavbar(savedCourse);
    }
  }, [api]);

  const handleSelectedCourse = (course) => {
    const selectedCourse = JSON.parse(course);
    setSelectedCoursesFromNavbar(selectedCourse);
    localStorage.setItem(
      "BackofficeNavbarSelectedCourse",
      JSON.stringify(selectedCourse)
    );
  };

  const redirect = () => {
    navigate("/flexeesim/dashboard");
  };

  return (
    <div className="">
      <div className="w-full top-0 left-0">
        <div className="flex justify-between items-center bg-black text-white p-2 h-12">
          <div className="flex justify-between w-full">
            <div className="px-3 cursor-pointer">
              <h1 className="text-2xl font-bold pl-7 text-white cursor-pointer" onClick={redirect}>
                FLEXEE
              </h1>
            </div>
            <div className="flex items-center px-3">
              <div title="Home">
                <svg
                  className="h-8 w-8 text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x="4" y="4" width="6" height="6" rx="1" />
                  <rect x="14" y="4" width="6" height="6" rx="1" />
                  <rect x="4" y="14" width="6" height="6" rx="1" />
                  <rect x="14" y="14" width="6" height="6" rx="1" />
                </svg>
              </div>
              <p className="px-3 text-2xl opacity-50">|</p>
              <ProfileDropdown />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default BackOfficeNavbar;