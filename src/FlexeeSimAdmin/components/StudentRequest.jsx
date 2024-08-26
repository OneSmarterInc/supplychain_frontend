import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../Components/ContextApi/MyContext";
import axios from "axios";

const StudentRequest = ({ fetchTeams, setSelectedOption, teams }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Students");
  const { api } = useContext(MyContext);
  const { api1 } = useContext(MyContext);

  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));
  const passcode = selectedSimData?.passcode;
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(
          `${api}/simulation/${passcode}/subscribers/?format=json`
        );
        const data = await response.json();
  
        // Filter out admin users before transforming the data
        const filteredData = data.filter(item => !item.user_detail.is_admin);
  
        // Transform the data to include team information from local storage
        const transformedData = filteredData.map((item) => {
          const savedTeam = localStorage.getItem(`team_${item.user_detail.userid}`);
          return {
            id: item.user_detail.userid,
            name: `${item.user_detail.first_name} ${item.user_detail.last_name}`,
            studentId: item.user_detail.userid,
            profileImage: item.user_detail.image || "default-image.png", // Fallback image
            contact: item.user_detail.email,
            status: item.user_detail.is_online ? "Online" : "Offline",
            enrollDate: new Date(item.subscribed_at).toLocaleDateString(),
            team: savedTeam || "", // Load team from local storage if available
          };
        });
  
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
        return student.team !== "";
      } else {
        return student.team === "";
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

      // Save the selected team to local storage
      localStorage.setItem(`team_${user_id}`, team);

      // Update the student list with the new team assignment
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === user_id ? { ...student, team } : student
        )
      );
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="bg-white w-full mx-auto pt-4 border-2 border-t-2 rounded-md border-gray-400 border-opacity-50 px-4 mb-12 h-full">
      <p className="font-semibold text-2xl md:text-2xl "> STUDENTS / MEMBER REQUEST</p>
      <div className="flex flex-col md:flex-row items-center mb-4 p-5">
        <div className="flex items-center mb-4 md:mb-0 md:mr-4">
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
            className="text-gray-700 text-lg md:text-xl mx-2 flex flex-col items-start space-y-1"
          >
            <p>All Students</p>
            <p className="text-xs text-green-500 ml-1">
              TOTAL {students.length}
            </p>
          </label>
        </div>
        <div className="flex items-center mb-4 md:mb-0 md:mr-4">
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
            className="text-gray-700 text-lg md:text-xl mx-2 flex flex-col items-start space-y-1"
          >
            <p>Students</p>
            <p className="text-xs text-gray-500 ml-1">TEAM / GROUP ASSIGNED</p>
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
            className="text-gray-700 text-lg md:text-xl mx-2 flex flex-col items-start space-y-1"
          >
            <p>Students</p>
            <p className="text-xs text-gray-500 ml-1">
              TEAM / GROUP NOT ASSIGNED
            </p>
          </label>
        </div>
        <div className="ml-auto mt-4 md:mt-0">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Student"
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 px-3 py-2 text-red-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
      <table className="w-full table-auto mb-4 border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">
              NAME / STUDENT ID{" "}
              <span className="text-red-500">
                <i className="fa-solid fa-arrow-down-a-z"></i>
              </span>
            </th>
            <th className="px-4 py-2 text-center ">CONTACT</th>
            <th className="px-4 py-2 text-center ">TEAM / GROUP</th>
            {/* <th className="px-4 py-2 text-center font-bold">STATUS</th> */}
            <th className="px-3 py-2 text-center ">ENROLL DATE</th>
            <th className="px-0 py-0"></th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-2 text-left">
                <div className="flex items-center">
                  <img
                    src={`${api1}${student?.profileImage}` || "default-image.png"}
                    alt={student.name}
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <div className="text-start">
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-red-600">#{student.studentId}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                <p>{student.contact}</p>
                <p className="flex justify-center items-center">
                  <i className="fa-solid fa-envelope"></i>
                </p>
              </td>
              <td className="px-4 py-2 text-center">
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
                    value={student.team || ""}
                    className="block text-gray-700 py-2 px-3 border border-red-300 bg-white rounded-full w-full text-center shadow

-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">Assign Team</option>
                    {teams.map((team, index) => (
                      <option key={index} value={team.firm_key}>
                        {team.firm_key.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              {/* <td className="px-4 py-2 text-center text-green-500">
                {student.status}
              </td> */}
              <td className="px-8 py-2 text-center w-32">
                {student.enrollDate}
              </td>
              <td className="px-4 py-2 text-center">
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