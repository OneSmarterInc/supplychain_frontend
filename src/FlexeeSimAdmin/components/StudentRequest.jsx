import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../Components/ContextApi/MyContext";
import axios from "axios";

const StudentRequest = ({ fetchTeams, setSelectedOption, teams }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Students");
  const { api } = useContext(MyContext);

  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData"));
  const passcode = selectedSimData?.passcode;
  console.log("passcode:", passcode);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(
          `${api}/simulation/3af3d851/subscribers/?format=json`
        );
        const data = await response.json();

        // Transform the data to match the structure needed for rendering
        const transformedData = data.map((item) => ({
          id: item.user_detail.userid,
          name: `${item.user_detail.first_name} ${item.user_detail.last_name}`,
          studentId: item.user_detail.userid,
          profileImage: item.user_detail.image || "default-image.png", // Fallback image
          contact: item.user_detail.email,
          status: item.user_detail.is_online ? "Online" : "Offline",
          enrollDate: new Date(item.subscribed_at).toLocaleDateString(),
          team: null, // Assuming you will assign teams later
        }));

        setStudents(transformedData);
      } catch (error) {
        console.error("Error fetching the students:", error);
      }
    };

    fetchSubscribers();
  }, [api]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredStudents = students
    .filter((student) => {
      if (selectedFilter === "All Students") {
        return true;
      } else if (selectedFilter === "Students") {
        return student.team !== null;
      } else {
        return student.team === null;
      }
    })
    .filter((student) => {
      return (
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toString().includes(searchTerm.toLowerCase())
      );
    });

  const addToFirm = async (user_id, user_email, passcode, team) => {
    fetchTeams();
    setSelectedOption(team + user_id);
    try {
      const response = await axios.get(
        `${api}/post-firms/${user_id}/${user_email}/${passcode}/${team}/`
      );
      const data = response.data;
      console.log("Add to firm data: ", data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="mx-16 px-6 py-6 border-2 border-t-2 rounded-md border-gray-400 border-opacity-50">
      <h2 className="text-4xl text-gray-600 border-0 border-b-2 pb-8 border-opacity-30 border-b-gray-500 font-medium text-start mb-4">
        STUDENTS / MEMBER REQUEST
      </h2>
      <div className="flex items-center mb-4 p-5">
        <div className="flex items-center mr-4">
          <input
            type="radio"
            id="allStudents"
            value="All Students"
            checked={selectedFilter === "All Students"}
            onChange={handleFilterChange}
            className="mr-2"
          />
          <label
            htmlFor="allStudents"
            className="text-gray-700 text-xl mx-2 flex flex-col items-start space-y-1"
          >
            <p> All Students</p>
            <p className="text-xs text-green-500 ml-1">
              TOTAL {students.length}
            </p>
          </label>
        </div>
        <div className="flex items-center mr-4">
          <input
            type="radio"
            id="studentsTeam"
            value="Students"
            checked={selectedFilter === "Students"}
            onChange={handleFilterChange}
            className="mr-2"
          />
          <label
            htmlFor="studentsTeam"
            className="text-gray-700 text-xl mx-2 flex flex-col items-start space-y-1"
          >
            <p>Students</p>
            <p className="text-xs text-gray-500 ml-1">TEAM / GROUP ASSIGN</p>
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="studentsNotTeam"
            value="StudentsNotTeam"
            checked={selectedFilter === "StudentsNotTeam"}
            onChange={handleFilterChange}
            className="mr-2"
          />
          <label
            htmlFor="studentsNotTeam"
            className="text-gray-700 text-xl mx-2 flex flex-col items-start space-y-1"
          >
            <p>Students</p>
            <p className="text-xs text-gray-500 ml-1">
              TEAM / GROUP NOT ASSIGN
            </p>
          </label>
        </div>
        <div className="ml-auto">
          <input
            type="text"
            placeholder="Search Student"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="ml-2 px-3 py-2 rounded-full text-red-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left font-bold">
              NAME / STUDENT ID{" "}
              <span className="text-red-500">
                <i className="fa-solid fa-arrow-down-a-z"></i>
              </span>
            </th>
            <th className="px-4 py-2 text-left font-bold">CONTACT</th>
            <th className="px-4 py-2 text-center font-bold">TEAM / GROUP</th>
            <th className="px-4 py-2 text-left font-bold">STATUS</th>
            <th className="px-4 py-2 text-left font-bold">ENROLL DATE</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <div className="text-start">
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-red-600">{student.studentId}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-start">
                <p>{student.contact}</p>
                <p className="pl-9">
                  <i className="fa-solid fa-envelope"></i>
                </p>
              </td>
              <td className="px-4 py-2 flex justify-center">
                <div className="relative">
                  <select
                    onChange={(e) =>
                      addToFirm(
                        student?.id,
                        student?.contact,
                        passcode,
                        e.target.value
                      )
                    }
                    className="block text-gray-700 py-2 px-3 border border-red-300 bg-white rounded-full w-48 text-center shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">Assign Team</option>
                    <option value="Team 01">TEAM 01</option>
                    <option value="Team 02">TEAM 02</option>
                    <option value="Team 03">TEAM 03</option>
                    <option value="Team 04">TEAM 04</option>
                  </select>
                </div>
              </td>
              <td className="px-4 py-2 text-start text-green-500">
                {student.status}
              </td>
              <td className="px-4 py-2 text-start w-32">
                {student.enrollDate}
              </td>
              <td className="px-4 py-2 text-start">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRequest;
