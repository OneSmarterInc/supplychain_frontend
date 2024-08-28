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

  console.log("Selected Course", selectedCoursesFromNavbar);
  console.log("Courses", courses);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${api}/user/${user.userid}/subscriptions/`
        );
        // Transform the data to match the structure needed for rendering
        const transformedCourses = response.data.map((item) => ({
          course: item.simulation.course || "Unnamed Course",
          members: item.simulation.members,
          organization: `Simulation ${item.simulation.simulation_id}`, // Example: Use simulation ID as organization
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
    navigate("/usersidelive");
  };

  return (
    <div className="">
      <div className="w-full top-0 left-0">
        <div className="flex justify-between items-center bg-black text-white p-2 h-12">
          <div className="flex justify-between w-full">
            <div className="px-3 cursor-pointer">
              <h1 className="text-2xl font-bold pl-7 text-white cursor-pointer">
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
        <div className="">
          <div className="flex h-10">
            <div className="w-full text-start">
              <div
                className={`text-xl flex text-start items-start justify-between font-bold bg-white`}
              >
                <h1 className="w-[280px] text-right font-medium bg-slate-200 pr-10 pl-0 p-3 border">
                  SELECT A POOL{" "}
                </h1>
                <div className="relative w-full py-0">
                  <select
                    name=""
                    defaultValue=""
                    id=""
                    onChange={(e) =>
                      handleSelectedCourse(e.target.value)
                    }
                    className="px-3 w-full p-3 border-gray-300 border-0 border-b-2 border-l-2 font-normal appearance-none pl-10"
                  >
                    <option value="">Select Course Please</option>
                    {courses?.map((course, index) => (
                      <option key={index} value={JSON.stringify(course)}>
                        {course.course} | {course.organization}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="bg-gray-200 border-0 border-l-2 border-l-red-500 w-24 flex justify-center items-center h-12 absolute right-0 top-1">
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackOfficeNavbar;