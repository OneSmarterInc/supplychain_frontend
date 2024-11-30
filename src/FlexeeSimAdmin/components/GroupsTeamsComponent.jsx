import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MyContext from "../../Components/ContextApi/MyContext";
import { useToast, Spinner, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import GroupDashboard from "./GroupDetailedView";

const GroupsTeamsComponent = () => {
  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));
  const passcode = selectedSimData?.passcode;
  const [teams, setTeams] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedFirm, setSelectedFirm] = useState(""); // Currently selected team
  const [expandedTeams, setExpandedTeams] = useState([]); // Keep track of expanded teams
  const [expandAll, setExpandAll] = useState(false); // State to manage expand/collapse all
  const [assignedCount, setAssignedCount] = useState(0); // New state for assigned count
  const [notAssignedCount, setNotAssignedCount] = useState(0); // New state for not assigned count
  const [isLoading, setIsLoading] = useState(true);
  const { api, api1 } = useContext(MyContext);
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Students");

  // Fetch teams and students
  const fetchTeamsAndStudents = async () => {
    try {
      setIsLoading(true);
      const teamResponse = await axios.get(`${api}/get-firms/${passcode}/`);
      const teamsData = teamResponse.data;

      const studentResponse = await axios.get(`${api}/simulation/${passcode}/subscribers/?format=json`);
      console.log(studentResponse);
      
      const studentsData = studentResponse.data.filter((item) => !item.user_detail.is_admin);

      const transformedStudents = studentsData.map((student) => {
        const assignedTeam = teamsData.find((team) =>
          team.users.some((user) => user.user_id === student.user_detail.userid)
        );
        return {
          id: student.user_detail.userid,
          name: `${student.user_detail.first_name} ${student.user_detail.last_name}`,
          studentId: student.user_detail.userid,
          profileImage: student.user_detail.image || "default-image.png",
          contact: student.user_detail.email,
          team: assignedTeam ? assignedTeam.firm_key : "",
        };
      });

      setTeams(teamsData);
      setStudents(transformedStudents);

      // Calculate assigned and unassigned counts
      const assigned = transformedStudents.filter((student) => student.team !== "").length;
      const notAssigned = transformedStudents.filter((student) => student.team === "").length;

      setAssignedCount(assigned);
      setNotAssignedCount(notAssigned);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching teams or students:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamsAndStudents();
  }, []);

  // Handle clicking on a specific team
  const handleSelectedTeam = (team) => {
    if (selectedFirm === team.firm_key) {
      setSelectedFirm(""); // Deselect if the same team is clicked again
    } else {
      setSelectedFirm(team.firm_key); // Select a different team
    }
    localStorage.setItem("selectedTeam", JSON.stringify(team));
  };

  // Toggle expand/collapse for all teams
  const handleExpandAll = () => {
    if (!expandAll) {
      setExpandedTeams(teams.map((team) => team.firm_key));
    } else {
      setExpandedTeams([]);
    }
    setExpandAll(!expandAll);
  };

  // Toggle individual team expansion
  const toggleTeamExpansion = (teamKey) => {
    if (expandedTeams.includes(teamKey)) {
      setExpandedTeams(expandedTeams.filter((key) => key !== teamKey));
    } else {
      setExpandedTeams([...expandedTeams, teamKey]);
    }
  };

  // Remove user from team
  const removeUserFromTeam = async (user_id, simulation_id) => {
    try {
      await axios.delete(`${api}/teamdrop/${user_id}/${simulation_id}/`);
      // Refresh both team and student data after the user is removed
      fetchTeamsAndStudents();
    } catch (error) {
      console.error("Error removing user from team:", error);
    }
  };

  // Add student to a team
  const addToFirm = async (user_id, user_email, team) => {
    try {
      await axios.get(`${api}/post-firms/${user_id}/${user_email}/${passcode}/${team}/`);
      fetchTeamsAndStudents();
    } catch (error) {
      console.error("Error assigning student to team", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredStudents = students
    .filter((student) => {
      if (selectedFilter === "Students") {
        return student.team !== ""; // Only students with teams
      } else if (selectedFilter === "StudentsNotTeam") {
        return student.team === ""; // Only students without teams
      } else {
        return true; // Show all students by default
      }
    })
    .filter((student) => {
      return (
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toString().includes(searchTerm.toLowerCase())
      );
    });

  return (
    <div className="w-full max-w-screen-full px-10 mb-2">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-0">
        {/* Teams Component */}
        <div className="col-span-3 bg-white px-0 border-l-2 border-t-2 border-b-2 rounded-bl-lg rounded-tl-lg border-gray-400 border-opacity-50">
          <header className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold">Groups</h2>
            <button onClick={handleExpandAll} className="text-red-500 font-semibold">
              {expandAll ? "Collapse All" : "Expand All"}
            </button>
          </header>

          <div className="space-y-0 max-h-[700px] overflow-y-auto">
            
            {teams?.map((team, index) => (
              <div key={index}>
                
                <div
                  className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-100 px-4 border-b border-gray-200"
                  onClick={() => {
                    handleSelectedTeam(team);
                    toggleTeamExpansion(team.firm_key);
                  }}
                >
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold">{team.firm_key}</h2>
                    <p className="text-black-500">
                      {team.users.length > 0 ? `${team.users.length} - Student Team` : "Unassigned Currently"}
                    </p>
                  </div>
                  <div>
                    
                    {expandedTeams.includes(team.firm_key) ? (
                      <i className="fa-solid fa-chevron-up text-gray-500"></i>
                    ) : (
                      <i className="fa-solid fa-chevron-down text-gray-500"></i>
                    )}
                  </div>
                </div>

                {expandedTeams.includes(team.firm_key) && (
                  
                  <div className="bg-white p-4 border-b-2 border-red-500">
                    
                    {team.users.length > 0 ? (
                      team.users.map((member, index) => (
                        <div key={index} className="flex justify-between items-center pb-1">
                          <div className="flex items-center">
                            <img
                              src={`${api1}${member?.image}` || "default-image.png"}
                              alt={member?.email}
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                              <h3 className="text-sm font-semibold">{member?.first_name} {member?.last_name}</h3>
                              <p className="text-sm text-red-500">#{member?.user_id}</p>
                            </div>
                          </div>
                          <i
                            onClick={() => removeUserFromTeam(member?.user_id, passcode)}
                            className="fa-solid fa-trash text-gray-400 hover:text-red-500 px-4"
                          ></i>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-2">No users added for this group.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Students Request Component */}
        <div className="col-span-5 bg-white border-2 rounded-br-lg rounded-tr-lg border-gray-400 border-opacity-50">
          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <Spinner size="xl" />
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center mb-4 p-5">
                <div className="flex text-sm items-center mb-4 md:mb-0 md:mr-2 border-r border-red-500">
                  <input
                    type="radio"
                    id="studentsTeam"
                    value="All Students"
                    checked={selectedFilter === "All Students"}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <label htmlFor="studentsTeam" className="text-gray-700 text-sm md:text-sm mr-2">
                    All ({students.length})
                  </label>
                </div>
                <div className="flex text-sm items-center mb-4 md:mb-0 md:mr-2 border-r border-red-500">
                  <input
                    type="radio"
                    id="studentsTeam"
                    value="Students"
                    checked={selectedFilter === "Students"}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <label htmlFor="studentsTeam" className="text-gray-700 text-sm md:text-sm mr-2">
                    Assigned ({assignedCount})
                  </label>
                </div>
                <div className="flex items-center mb-4 md:mb-0">
                  <input
                    type="radio"
                    id="studentsNotTeam"
                    value="StudentsNotTeam"
                    checked={selectedFilter === "StudentsNotTeam"}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <label htmlFor="studentsNotTeam" className="text-red-600 text-sm md:text-sm mr-2">
                    Not Assigned ({notAssignedCount})
                  </label>
                </div>
                <div className="relative ml-auto mt-4 md:mt-0">
                  <input
                    type="text"
                    placeholder="Search Student"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-10 py-2 text-sm rounded-full border border-red-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i className="fa fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>

              <table className="w-full table-auto mb-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left"></th>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
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
                            <p className="text-sm text-red-600">{student.contact}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2 text-center">
                        <select
                          onChange={(e) =>
                            addToFirm(student?.id, student?.contact, e.target.value)
                          }
                          value={student.team || ""}
                          className="block text-gray-700 py-2 px-3 border border-red-300 bg-white rounded-full w-full text-center shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                          <option value="">Not Assigned</option>
                          {teams.map((team, index) => (
                            <option key={index} value={team.firm_key}>
                              {team.firm_key.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <i
                          className="fa-solid fa-trash text-red-500 cursor-pointer hover:scale-110"
                          onClick={() => removeUserFromTeam(student?.id, passcode)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length <= 0 && (
                    <div className="flex items-center text-gray-400">
                      <p>Empty / All Assigned</p>
                    </div>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
        
      </div>
     
    </div>
  );
};

export default GroupsTeamsComponent;