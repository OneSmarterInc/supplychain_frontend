import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../Components/ContextApi/MyContext";
import ExploreSim from "./ExploreSim";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner"; // Import 

const Dashboard = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [courses, setCourses] = useState([]);
  const { api } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`${api}/user/${user.userid}/subscriptions/`);
      
      // Transform courses data and sort by startDate or endDate in descending order
      const transformedCourses = response.data.map((item) => ({
        course: item.simulation.course || "Unnamed Course",
        members: item.simulation.members,
        orgnization: item.simulation.orgnization,
        startDate: new Date(item.simulation.start_date),
        endDate: new Date(item.simulation.end_date),
        passcode: item.simulation.passcode,
        simulation_id: item.simulation_id,
      })).sort((a, b) => b.startDate - a.startDate); // Sorting by startDate
      
      setCourses(transformedCourses);
      setIsLoading(false);
      
    } catch (error) {
      toast.error("Error fetching the courses. Please try again.");
      console.error("Error fetching the courses:", error);
      setIsLoading(false);
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
      const response = await axios.post(`${api}/subscribe/`, {
        user_id: user.userid,
        passcode: code,
      });

      if (response.status === 200){
        
        toast.error("already subscribed to this simulation.")
      }

      else if(response.status === 201) {
        toast.success("Successfully subscribed to the simulation.");
        setCode("");
        fetchCourses();
      }
       else {
        toast.error("Failed to subscribe to the simulation.");
        console.error("Failed to subscribe to the simulation.");
      }
    } catch (error) {
      toast.error("Error during subscription. Please try again.");
      console.error("Error during subscription:", error);
    }
  };

  return (
    <div className="pb-12 bg-white-full p-0 px-6 relative pt-1.5 max-w-screen-full mx-auto">
      <ToastContainer />
      <div className="absolute left-1/2 transform top-10 min-h-full w-[2px] bg-red-500"></div>
      <div className="absolute left-1/2 transform -translate-x-full top-10 w-40 h-[2px] bg-red-500"></div>
      <div className="absolute left-1/2 transform -translate-x-40 top-7 text-red-500">
        <i className="fa-solid fa-caret-left text-lg"></i>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 rounded-full border-2 border-red-500 mt-12"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-3 h-3 rounded-full border-2 border-red-500 mt-16"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-4 h-4 rounded-full border-2 border-red-500 mt-20"></div>

      <section className="grid grid-cols-1 md:grid-cols-2 items-center relative gap-6">
        <div className="text-start">
          <h2 className="text-2xl font-bold mb-3">FLEXEE SIMULATION</h2>
          <h3 className="text-xl mb-4 font-semibold">{courses.length} ACTIVE COURSES</h3>
        </div>
        <div className="p-2 rounded">
          <h2 className="text-2xl font-bold mb-4 text-start">CODE ENTRY</h2>
          <form onSubmit={handleSubmit} className="flex space-x-4">
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
              {courses.length === 0 ? "Connect Now" : "SUBMIT"}
            </button>
          </form>
        </div>
      </section>

      <section className="w-full my-2">
      {isLoading ? (
          <div className="flex justify-center items-center">
            <Puff color="red" height={100} width={100} /> {/* Loader */}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-left text-gray-700 font-semibold">
            No courses have been created yet. Please subscribe to a simulation to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                onClick={() => handleSelectedCourse(course)}
                className="bg-white hover:bg-gray-200 h-64 cursor-pointer text-start p-4 px-8 rounded-md relative shadow-sm border border-gray-500 border-opacity-20 group"
              >
                <div>
                  <div className="text-xl font-medium">ORGANIZATION:</div>
                  <div className="text-gray-700 text-lg mb-2">
                    {course.orgnization}
                  </div>
                  <div className="text-xl font-medium">COURSE:</div>
                  <div className="text-gray-700 mb-2 text-lg">
                    {course.course}
                  </div>
                  <div className="text-xl font-medium">MEMBERS:</div>
                  <div className="text-gray-700 text-lg">
                    TOTAL NUMBER OF STUDENTS - {course.members}
                  </div>
                </div>
                <div className="text-[#ED1C24] flex items-start space-x-2 text-right absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>
                    <i className="fa-regular fa-circle-dot px-1 text-xs"></i>
                    Explore Team/Members{" "}
                  </span>
                  <span className="text-3xl">
                    <i className="fa-solid fa-arrow-up-right-from-square py-4"></i>
                  </span>
                </div>
              </div>
            ))}
            <ExploreSim />
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;