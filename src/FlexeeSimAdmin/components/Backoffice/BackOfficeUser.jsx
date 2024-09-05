import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyContext from "../../../Components/ContextApi/MyContext";
import { Puff } from "react-loader-spinner";

const BackOfficeUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const { api, api1 } = useContext(MyContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
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
        setLoading(false)
        

        // Set the first course as selected by default
        if (transformedCourses.length > 0) {
          setSelectedCourse(transformedCourses[0]);
        }
      } catch (error) {
        console.error("Error fetching the courses:", error);
        setLoading(false)

      }
    };

    fetchCourses();
  }, [api]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!selectedCourse?.passcode) return;

      try {
        setLoading(true);
        const response = await axios.get(`${api}/get-firms/${selectedCourse.passcode}/`);
        const flattenedUsers = response.data.flatMap((firm) => {
          // Ensure users is an array before mapping
          const firmUsers = Array.isArray(firm.users) ? firm.users : [];
          return firmUsers.map((user) => ({
            name: `${user.first_name} ${user.last_name}`,
            id: `#${user.user_id}`,
            email: user.email,
            team: firm.firm_key,
            department: user.department,
            course: user.course,
            university: user.university,
            image: user.image,
          }));
        });
        setUsers(flattenedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [api, selectedCourse]);

  const handleSelectedCourse = (course) => {
    setSelectedCourse(JSON.parse(course));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Puff color="red" height={100} width={100} /> {/* Loader */}
      </div>
    );
  }
  if (!selectedCourse) {
    return (
      <p className="text-gray-500">
        No course selected. Please select a course from the navbar.
      </p>
    );
  }

  return (
    <div className="bg-gray-100 m-0  h-screen">
      <div className="flex h-10">
        <div className="w-full text-start">
          <div className="text-xl flex text-start items-start justify-between font-bold bg-white">
            <h1 className="w-[290px] text-right font-medium bg-slate-200 pr-10 pl-0 p-3 border">
              SELECT A POOL
            </h1>
            <div className="relative w-full py-0">
              <select
                value={JSON.stringify(selectedCourse)}
                onChange={(e) => handleSelectedCourse(e.target.value)}
                className="px-3 w-full p-3 border-gray-300 border-0 border-b-2 border-l-2 font-normal appearance-none pl-10"
              >
                <option value="">Select Course Please</option>
                {courses.map((course, index) => (
                  <option key={index} value={JSON.stringify(course)}>
                    {course.course}
                    {/*  | {course.organization} */}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className="bg-gray-200 border-0 border-l-2 border-l-red-500 w-24 flex justify-center items-center h-[3.25rem] absolute right-0 top-0">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-6 px-10 py-4">
        <h3 className="text-2xl px-2 text-start font-semibold mb-2 border-0 border-b pb-3 border-b-gray-500 border-opacity-20">
          USERS
        </h3>
        {loading ? (
          <div className="flex justify-center items-center">
            <Puff color="red" height={100} width={100} /> {/* Loader */}
          </div>
        ) : users.length > 0 ? (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">NAME / ID</th>
                  <th className="py-2 px-4 border-b">EMAIL / USERNAME</th>
                  <th className="py-2 px-4 border-b">GROUP NAME</th>
                  <th className="py-2 px-4 border-b">DEPARTMENT</th>
                  <th className="py-2 px-4 border-b">COURSE</th>
                  <th className="py-2 px-4 border-b">UNIVERSITY</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-200">
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center">
                        <img
                          src={`${api1}${user.image}`}
                          alt="User Profile"
                          className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                          <span className="font-semibold">{user.name}</span>
                          <br />
                          <span className="text-red-500">{user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className="text-gray-800">{user.email}</span>
                      <br />
                      <span className="text-xs text-gray-400">
                        {user.email.split("@")[1]}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className="text-gray-900">{user.team}</span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className="text-gray-900">{user.department}</span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className="text-gray-900">{user.course}</span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className="text-gray-900">{user.university}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <p className="text-gray-800">
                  Showing 1 to {Math.min(10, users.length)} of {users.length}
                </p>
              </div>
              <button className="w-40 text-sm px-4 py-2 bg-red-500 rounded-full text-white mt-4 mb-4 hover:bg-gray-700">
                <i className="fa-solid fa-arrows-rotate"></i> LOAD MORE
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No users found for the selected course.</p>
        )}
      </div>
    </div>
  );
};

export default BackOfficeUser;

