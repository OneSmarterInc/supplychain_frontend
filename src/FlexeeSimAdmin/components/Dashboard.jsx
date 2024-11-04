import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../Components/ContextApi/MyContext";
import ExploreSim from "./ExploreSim";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner"; // Import
import GroupsView from "./GroupsView";
import quarterImage from "../Assets/quarter.png";
import opener from "../Assets/opner.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [courses, setCourses] = useState([]);
  const { api } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [selectedCourse, setSelectedCourse] = useState(null); // Track selected course

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `${api}/user/${user.userid}/subscriptions/`
      );

      // Transform courses data and sort by startDate or endDate in descending order
      const transformedCourses = response.data
        .map((item) => ({
          course: item.simulation.course || "Unnamed Course",
          members: item.simulation.members,
          orgnization: item.simulation.orgnization,
          startDate: new Date(item.simulation.start_date),
          endDate: new Date(item.simulation.end_date),
          passcode: item.simulation.passcode,
          simulation_id: item.simulation_id,
          quarter: item.simulation.current_quarter,
          quarter_data:
            item.simulation.quarter_specific_decisions[
              `quarter${item.simulation.current_quarter}`
            ],
        }))
        .sort((a, b) => b.startDate - a.startDate); // Sorting by startDate

      setCourses(transformedCourses);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching the courses. Please try again.");
      console.error("Error fetching the courses:", error);
      setIsLoading(false);
    }
  };

  const OpenSelectedCourse = (course) => {
    localStorage.setItem("SelectedCourse", JSON.stringify(course));
    navigate("/flexeesim/dashboard/courses");
  };
  const handleSelectedCourse = (course) => {
    // Toggle selected course
    if (selectedCourse === course.simulation_id) {
      setSelectedCourse(null); // Deselect if it's already selected
    } else {
      setSelectedCourse(course.simulation_id); // Select the clicked course
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(`${api}/subscribe/`, {
        user_id: user.userid,
        passcode: code,
      });

      if (response.status === 200) {
        toast.error("already subscribed to this simulation.");
      } else if (response.status === 201) {
        toast.success("Successfully subscribed to the simulation.");
        setCode("");
        fetchCourses();
      } else {
        toast.error("Failed to subscribe to the simulation.");
        console.error("Failed to subscribe to the simulation.");
      }
    } catch (error) {
      toast.error("Error during subscription. Please try again.");
      console.error("Error during subscription:", error);
    }
  };

  return (
    <div className="pb-12 bg-white-full p-0 px-4 ml-4 relative pt-1.5">
      <ToastContainer />

      <section className="w-full my-2">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Puff color="red" height={100} width={100} /> {/* Loader */}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-left text-gray-700 font-semibold">
            Welcome, John! Currently, there are no active courses or simulations
            in your account. Please check back soon or reach out for assistance.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-0">
            <div className="flex space-x-2 mb-2">
            <span className="text-green-500">All Courses ({courses.length}) </span>
            <span className="text-green-500">In Progress ({courses.length}) </span>
            <span className="text-yellow-800">Completed (0) </span>
            </div>
            
            {courses.map((course, index) => (
              <div
                key={index}
                className={`bg-white ${
                  selectedCourse === course.simulation_id
                    ? "bg-[#FBFBFF] border border-[#C7C7C7] "
                    : "border-b border-gray-400"
                } cursor-pointer text-start p-4 px-2 relative group `}
              >
                <div
                  onClick={() => handleSelectedCourse(course)}
                  className="space-y-1"
                >
                  <div className="font-bold text-xl2 text-gray-600">
                    {course.course}
                  </div>
                  <div className="text-xl1 font-bold text-green-600 flex items-center">
                    Course Status:
                    <span className="text-xl1 text-green-300 font-medium ml-2">
                      In Progress
                    </span>
                    <img
                      src={quarterImage}
                      className="h-4 w-4 rounded-full border-b border-red-500 ml-2"
                    />
                    <span className="text-sm text-red-600 font-medium mr-2">
                      {" "}
                      &nbsp;0{course.quarter}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">
                      QUARTER DEADLINE:{" "}
                      {course.quarter_data?.quarter_end_date &&
                      course.quarter_data?.quarter_end_time
                        ? new Date(
                            `${course.quarter_data.quarter_end_date}T${course.quarter_data.quarter_end_time}`
                          ).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                            timeZoneName: "short",
                          })
                        : "-"}
                    </span>
                  </div>
                  {selectedCourse === course.simulation_id && <GroupsView />}
                </div>
                <div className="text-[#ED1C24] flex items-start space-x-2 text-right absolute top-5 right-5 ">
                  <span className="text-3xl">
                    {selectedCourse === course.simulation_id && (
                      <img
                        className=" h-25 w-25 mt-8"
                        src={opener}
                        key={index}
                        title="Click to View Details"
                        onClick={() => OpenSelectedCourse(course)}
                      />
                    )}
                  </span>
                  {selectedCourse != course.simulation_id && (
                    <i
                      className="fa fa-chevron-down"
                      aria-hidden="true"
                      onClick={() => handleSelectedCourse(course)}
                    ></i>
                  )}
                </div>
              </div>
            ))}
            {/* <ExploreSim /> */}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
