import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../Components/ContextApi/MyContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [courses, setCourses] = useState([]);
  const { api } = useContext(MyContext);

  useEffect(() => {
    // Fetch the subscribed simulations on component mount
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`${api}/user/${user.userid}/subscriptions/`);
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
    localStorage.setItem("SelectedCourse", JSON.stringify(course));
    navigate("/flexeesim/dashboard/courses");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(`${api}/subscribe`, {
        user_id: user.userid,
        passcode: code,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Successfully subscribed to the simulation.");
        setCode(""); // Clear the input field
        fetchCourses(); // Refresh the subscribed simulations list
      } else {
        console.error("Failed to subscribe to the simulation.");
      }
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-gray-50 p-4 px-14 relative">
      <div className="absolute left-1/2 transform top-10 h-[680px] w-[3px] bg-red-500"></div>
      <div className="absolute left-1/2 transform -translate-x-full top-10 w-60 h-[2px] bg-red-500"></div>
      <div className="absolute left-1/2 transform -translate-x-60 top-7 text-red-500 ">
        <i className="fa-solid fa-caret-left text-xl"></i>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[730px] w-2 h-2 rounded-full border-2 border-red-500 "></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[750px] w-3 h-3 rounded-full border-2 border-red-500 "></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[770px] w-4 h-4 rounded-full border-2 border-red-500 "></div>

      <section className="grid grid-cols-2 items-center relative gap-10">
        <div className="text-start">
          <h2 className="text-3xl font-bold mb-4">Flexee Simulation</h2>
          <h3 className="text-2xl mb-4 font-semibold">{courses.length} ACTIVE COURSES</h3>
        </div>
        <div className="p-2 rounded">
          <h2 className="text-3xl font-bold mb-4 text-start">CODE ENTRY</h2>
          <form onSubmit={handleSubmit} className="flex space-x-6">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded p-2 py-3"
              placeholder="Enter code"
            />
            <button
              type="submit"
              className="bg-red-500 w-28 text-white p-2 rounded"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>

      <section className="w-full my-5">
        <div className="grid grid-cols-2 gap-14">
          {courses.map((course, index) => (
            <div
              key={index}
              onClick={() => handleSelectedCourse(course)}
              className="bg-[#F5F5F5] h-64 cursor-pointer text-start p-4 px-8 rounded-md relative shadow-sm border border-gray-500 border-opacity-20 group"
            >
              <div>
                <div className="text-2xl font-medium">ORGANIZATION:</div>
                <div className="text-gray-700 text-xl mb-2">
                  {course.organization}
                </div>
                <div className="text-2xl font-medium">COURSE:</div>
                <div className="text-gray-700 mb-2 text-xl">
                  {course.course}
                </div>
                <div className="text-2xl font-medium">MEMBERS:</div>
                <div className="text-gray-700 text-xl">
                  TOTAL NUMBER OF STUDENTS - {course.members}
                </div>
              </div>
              <div className="text-[#ED1C24] flex items-start space-x-2 text-right absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>
                  <i className="fa-regular fa-circle-dot px-1 text-xs"></i>
                  Explore Team/Members{" "}
                </span>
                <span className="text-5xl">
                  <i className="fa-solid fa-arrow-up-right-from-square py-4"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
