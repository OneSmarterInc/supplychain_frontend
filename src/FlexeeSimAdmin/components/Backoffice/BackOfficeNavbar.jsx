import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../../Components/ContextApi/MyContext";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BackOfficeNavbar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const handleSidebarOpen = () => {
    setIsSideBarOpen(!isSideBarOpen);
    localStorage.setItem("isSideBarOpen", isSideBarOpen);
  };

  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCoursesFromNavbar, setselectedCoursesFromNavbar] = useState([]);
  const { api } = useContext(MyContext);

  console.log("Selected Course", selectedCoursesFromNavbar)

  console.log("Courses", courses);

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const handleSelectedCourse = (course) => {
    setselectedCoursesFromNavbar(JSON.parse(course));

    localStorage.setItem("BackofficeNavbarSelectedCourse", selectedCoursesFromNavbar)
  };

  return (
    <div className="">
      <div className="w-full  top-0 left-0  ">
        <div className="flex justify-between items-center  bg-black text-white p-2 h-12">
          <div className="flex justify-between w-full">
            <div className="px-3 cursor-pointer" onClick={handleSidebarOpen}>
              <i class="fa-solid fa-bars mr-2 px-3 text-2xl text-red-500"></i>
            </div>
            <div className="flex items-center px-3 ">
              <svg
                class="h-8 w-8 text-white "
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <rect x="4" y="4" width="6" height="6" rx="1" />{" "}
                <rect x="14" y="4" width="6" height="6" rx="1" />{" "}
                <rect x="4" y="14" width="6" height="6" rx="1" />{" "}
                <rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
              <i className="fa-solid fa-bell mx-2 px-3 text-2xl"></i>
              <p className="px-3 text-2xl opacity-50">|</p>
              <a href="/" className="hover:text-gray-500">
                Back To My Account
              </a>
              <i className="fa-solid fa-circle-user mr-2 px-3 text-3xl"></i>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex h-10">
            <div className=" w-full text-start  ">
              <div
                className={`text-xl flex text-start items-start justify-between font-bold  bg-white  `}
              >
                <h1 className="w-[280px] text-right font-medium bg-slate-200 pr-10  pl-0 p-3 border">
                  SELECT A POOL{" "}
                </h1>
                <div className="relative w-full py-0">
                  <select
                    name=""
                    defaultValue={courses[0]}
                    id=""
                    onClick={(e) => handleSelectedCourse(JSON.stringify(e.target.value))}
                    className="px-3 w-full p-3 border-gray-300 border-0 border-b-2 border-l-2 font-normal appearance-none pl-10"
                  >
                    {/* <option value="">
                      {" "}
                      15745 - Wright State University - Vikram Sethi - MBA 7800
                      - B90 (6375) - Open
                    </option> */}
                    <option value="">Select Course Please</option>
                    {courses?.map((course) => (
                      <option  value={JSON.stringify(course)}>
                        {" "}
                        {course.course} | {course.organization}{" "}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="bg-gray-200  border-0  border-l-2  border-l-red-500 w-24 flex justify-center items-center h-12 absolute right-0 top-1">
                      <i class="fa-solid fa-chevron-down"></i>
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
