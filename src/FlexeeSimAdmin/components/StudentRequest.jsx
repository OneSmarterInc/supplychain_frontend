import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../Components/ContextApi/MyContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const StudentRequest = ({ fetchTeams, setSelectedOption, teams }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Students");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const { api } = useContext(MyContext);
  const { api1 } = useContext(MyContext);
  const toast = useToast();
  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));
  const passcode = selectedSimData?.passcode;
  
  useEffect(() => {
    const fetchSubscribersAndTeams = async () => {
      try {
        // Fetch subscribers
        const subscriberResponse = await fetch(`${api}/simulation/${passcode}/subscribers/?format=json`);
        const subscriberData = await subscriberResponse.json();
        const filteredData = subscriberData.filter(item => !item.user_detail.is_admin);
  
        // Fetch teams
        const teamResponse = await axios.get(`${api}/get-firms/${passcode}/`);
        const teamData = teamResponse.data;

        // Map students to their respective teams based on the API response
        const transformedData = filteredData.map((item) => {
          // Check if the user belongs to any team
          const assignedTeam = teamData.find(team => 
            team.users.some(user => user.user_id === item.user_detail.userid)
          );

          return {
            id: item.user_detail.userid,
            name: `${item.user_detail.first_name} ${item.user_detail.last_name}`,
            studentId: item.user_detail.userid,
            profileImage: item.user_detail.image || "default-image.png",
            contact: item.user_detail.email,
            status: item.user_detail.is_online ? "Online" : "Offline",
            enrollDate: new Date(item.subscribed_at).toLocaleDateString(),
            team: assignedTeam ? assignedTeam.firm_key : "",  // Assign the team if found
            simulationId: item.simulation_id
          };
        });
  
        setStudents(transformedData);
      } catch (error) {
        console.error("Error fetching the students or teams:", error);
      }
    };
  
    fetchSubscribersAndTeams();
  }, [api, passcode]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleUnsubscribe = async (userId, simulationId) => {
    try {
      await axios.delete(`${api}/unsubscribe/${userId}/${simulationId}/`);
      setStudents((prevStudents) =>
        prevStudents.filter(student => student.id !== userId)
      );
      toast({
        title: "User Deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log("Error unsubscribing the student:", error);
    }
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      handleUnsubscribe(studentToDelete.id, studentToDelete.simulationId);
    }
    setShowConfirmation(false);
    setStudentToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setStudentToDelete(null);
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
      <p className="font-semibold text-2xl md:text-2xl ">STUDENTS / MEMBER REQUEST</p>
      <div className="flex flex-col md:flex-row items-center mb-4 p-5">
        {/* Filter and Search */}
      </div>

      <table className="w-full table-auto mb-4 border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">NAME / STUDENT ID</th>
            <th className="px-4 py-2 text-center">CONTACT</th>
            <th className="px-4 py-2 text-center">TEAM / GROUP</th>
            <th className="px-3 py-2 text-center">ENROLL DATE</th>
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
                    className="block text-gray-700 py-2 px-3 border border-red-300 bg-white rounded-full w-full text-center shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
              <td className="px-8 py-2 text-center w-32">
                {student.enrollDate}
              </td>
              <td className="px-4 py-2 text-center">
                <i 
                  className="fa-solid fa-trash text-red-500 cursor-pointer hover:scale-110"
                  onClick={() => {
                    setStudentToDelete(student);
                    setShowConfirmation(true);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to remove this student?</h2>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRequest;