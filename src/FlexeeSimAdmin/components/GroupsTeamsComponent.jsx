import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import MyContext from "../../Components/ContextApi/MyContext";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button, Spinner } from "@chakra-ui/react";
import 'react-toastify/dist/ReactToastify.css';

const GroupsTeamsComponent = () => {
  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));
  const passcode = selectedSimData?.passcode;
  const [teams, setTeams] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Students");
  const [simulation, setSimulation] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [teamAssignments, setTeamAssignments] = useState({});
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState({});
  const { api, api1 } = useContext(MyContext);
  const fetchTeamsAndStudents = async () => {
    try {
      setIsLoading(true);
      const teamResponse = await axios.get(`${api}/get-firms/${passcode}/`);
      const teamsData = teamResponse.data;
      const studentResponse = await axios.get(
        `${api}/simulation/${passcode}/subscribers/?format=json`
      );
      setTeams(teamsData);
      setStudents(studentResponse.data);
      fetchSimulation();
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching teams or students:", error);
      setIsLoading(false);
    }
  };
  const fetchSimulation = async () => {
    try {
      const response = await fetch(`${api}/simulation/${passcode}`);
      const firmData = await response.json(); 
      console.log("Fetched firmData:", firmData.firm_data);

      if (!firmData?.firm_data || !Array.isArray(firmData.firm_data)) {
        console.warn("firm_data is empty or not an array");
        return;
      }

      const teamAssignments = firmData.firm_data.reduce((acc, firm) => {
        acc[firm.firmName] = {
          members:
            firm.users && firm.users.length > 0
              ? firm.users.map((user) => ({
                  userId: user.user_id, 
                  name: user.name,
                  email: user.email,
                  image: user.image,
                }))
              : [],
        };
        return acc;
      }, {});
      console.log(teamAssignments);

      setTeamAssignments(teamAssignments);

      const assignedUserIds = new Set();
      Object.values(teamAssignments).forEach((team) => {
        team.members.forEach((member) => {
          assignedUserIds.add(member.userId);
        });
      });

      setStudents((prevStudents) => {
        return prevStudents.filter((student) => {
          const studentUserId = student.user_detail?.userid;
          return !assignedUserIds.has(studentUserId);
        });
      });
    } catch (error) {
      console.error("Error fetching firm data:", error);
    }
  };

  useEffect(() => {
    fetchTeamsAndStudents();
  }, []);

  const handleSelectedTeam = (teamName) => {
    setTeamAssignments((prevAssignments) => {
      const updatedAssignments = { ...prevAssignments };
      updatedAssignments[teamName].expanded =
        !updatedAssignments[teamName].expanded;
      return updatedAssignments;
    });
  };
  const handleDeleteMember = (member) => {
    // Find the team from which the member is to be deleted
    const updatedTeamAssignments = { ...teamAssignments };

    // Find the team that contains the member
    for (const teamName in updatedTeamAssignments) {
      const team = updatedTeamAssignments[teamName];
      const updatedMembers = team.members.filter(
        (m) => m.userId !== member.userId
      );

      // If the member was found in the team, update the members array
      if (updatedMembers.length !== team.members.length) {
        updatedTeamAssignments[teamName].members = updatedMembers;
        break; // Exit once the member is deleted from the correct team
      }
    }

    // Update the team assignments state
    setTeamAssignments(updatedTeamAssignments);

    // Normalize the member object to match the student format
    const normalizedMember = {
      user_detail: {
        userid: member.userId, // Map userId from member
        email: member.email,
        first_name: member.name.split(" ")[0], // Assuming the first part of the name is first_name
        last_name: member.name.split(" ")[1], // Assuming the second part of the name is last_name
        image: member.image,
        last_activity: null, // Default to null as it's not provided in the members array
        is_online: false, // Default to false as it's not provided
        department: null, // Default to null as it's not provided
        course: null, // Default to null as it's not provided
        university: null, // Default to null as it's not provided
        is_admin: null, // Set is_admin to null
      },
    };

    // Add the normalized member back to the students array
    setStudents((prevStudents) => [...prevStudents, normalizedMember]);
    setHasChanges(true);
    console.log(
      `${member.name} removed and sent back to students with normalized keys`
    );
  };

  const handleStudentChange = (studentId, teamId) => {
    setSelectedTeams((prevSelectedTeams) => ({
      ...prevSelectedTeams,
      [studentId]: teamId,
    }));
  };

  const assignStudentToTeam = (studentId, team) => {
    if (!studentId || !team) return;

    // Find the selected student by their ID
    const student = students.find(
      (student) => student.user_detail.userid === studentId
    );
    if (!student) return;

    const userDetail = {
      userId: student.user_detail.userid,
      name: `${student.user_detail.first_name} ${student.user_detail.last_name}`,
      email: student.user_detail.email,
      image: student.user_detail.image,
    };

    // Update team assignments with the new user
    setTeamAssignments((prevAssignments) => {
      const updatedAssignments = { ...prevAssignments };
      if (!updatedAssignments[team]) {
        updatedAssignments[team] = { members: [], expanded: false };
      }
      updatedAssignments[team].members.push(userDetail);
      updatedAssignments[team].expanded = true; // Ensure the team is expanded
      return updatedAssignments;
    });

    // Remove the student from the list of unassigned students
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.user_detail.userid !== studentId)
    );

    // Clear selected team and student
    setSelectedTeam("");
    setSelectedStudentId(null);
    setHasChanges(true);
    console.log(`Student ${userDetail.name} assigned to ${team}`);
    console.log(teamAssignments);
  };
  const saveChanges = async () => {
    try {
      const response = await axios.post(
        `${api}/simulation/update_team_members/`,
        {
          passcode: passcode,
          team_assignments: teamAssignments,
        }
      );

      if (response.data.message === "Team members updated successfully!") {
        toast.success("Changes saved successfully");
        setHasChanges(false);
      } else {
        toast.error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };
  return (
    <div className="w-full max-w-screen-full px-10 mb-2">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-0">
        {/* Teams Component */}
        <div className="col-span-3 bg-white px-0 border-l-2 border-t-2 border-b-2 rounded-bl-lg rounded-tl-lg border-gray-400 border-opacity-50">
          <header className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold">Groups</h2>
          </header>

          <div className="space-y-0 max-h-[700px] overflow-y-auto">
            {Object.entries(teamAssignments).map(
              ([teamName, { members, expanded }]) => (
                <div key={teamName}>
                  <div
                    className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-100 px-4 border-b border-gray-200"
                    onClick={() => handleSelectedTeam(teamName)}
                  >
                    <div className="flex flex-col">
                      <h2 className="text-xl font-bold">{teamName}</h2>
                      <p className="text-black-500">
                        {members.length > 0
                          ? `${members.length} - Student Team`
                          : "Unassigned Currently"}
                      </p>
                    </div>
                    <div>
                      {expanded ? (
                        <i className="fa-solid fa-chevron-up text-gray-500"></i>
                      ) : (
                        <i className="fa-solid fa-chevron-down text-gray-500"></i>
                      )}
                    </div>
                  </div>

                  {expanded && (
                    <div className="bg-white p-4 border-b-2 border-red-500">
                      {members.length > 0 ? (
                        members.map((member, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center pb-1"
                          >
                            <div className="flex items-center">
                              <img
                                src={
                                  member?.image
                                    ? `${api1}${member.image}`
                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                }
                                alt={member?.email || "User"}
                                className="w-12 h-12 rounded-full mr-4"
                              />
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="text-sm font-semibold">
                                    {member?.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {member?.email}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteMember(member)} // Call a function to handle deletion
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrashAlt className="text-xl" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 py-2">
                          This team currently has no users assigned.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )
            )}
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
                    className="mr-2"
                  />
                  <label
                    htmlFor="studentsTeam"
                    className="text-gray-700 text-sm md:text-sm mr-2"
                  >
                    All (
                    {
                      students.filter(
                        (student) => student.user_detail.is_admin === null
                      ).length
                    }
                    )
                  </label>
                </div>

                <div className="relative ml-auto mt-4 md:mt-0">
                  <input
                    type="text"
                    placeholder="Search Student"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
                    className="px-10 py-2 text-sm rounded-full border border-red-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i className="fa fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>

                {hasChanges && (
                  <div className="flex items-center ms-2">
                    <Button
                      variant="contained"
                      onClick={saveChanges}
                      className="px-4 py-2 bg-red-500 text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              <table className="w-full table-auto mb-4">
                {students.filter(
                  (student) => student.user_detail.is_admin === null
                ).length > 0 && (
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Student</th>
                      <th className="px-4 py-2 text-left">Assign to Team</th>
                      <th className="px-4 py-2 text-center"></th>
                      <th className="px-0 py-0"></th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {students
                    .filter((student) => student.user_detail.is_admin === null)
                    .filter((student) => {
                      const { first_name, last_name, email } =
                        student.user_detail;
                      // Check if any of the fields match the search term (case insensitive)
                      return (
                        first_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        last_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        email.toLowerCase().includes(searchTerm.toLowerCase())
                      );
                    }).length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-2 text-center text-gray-500"
                      >
                        No students available
                      </td>
                    </tr>
                  ) : (
                    students
                      .filter(
                        (student) => student.user_detail.is_admin === null
                      )
                      .filter((student) => {
                        const { first_name, last_name, email } =
                          student.user_detail;
                        return (
                          first_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          last_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          email.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                      })
                      .map((student) => (
                        <tr
                          key={student.user_detail.userid}
                          className="border-t"
                        >
                          <td className="px-4 py-2 text-left">
                            <div className="flex items-center">
                              <img
                                src={
                                  student?.user_detail?.image
                                    ? `${api1}${student.user_detail.image}`
                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                }
                                alt={student?.user_detail?.email || "User"}
                                className="w-10 h-10 rounded-full mr-4"
                              />
                              <div className="flex flex-col">
                                <p className="font-semibold text-sm">
                                  {student.user_detail.first_name}{" "}
                                  {student.user_detail.last_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {student.user_detail.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-2">
                            <select
                              value={
                                selectedTeams[student.user_detail.userid] || ""
                              }
                              onChange={(e) =>
                                handleStudentChange(
                                  student.user_detail.userid,
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 border text-sm rounded-full"
                            >
                              <option value="">Select Team</option>
                              {teams.map((team) => (
                                <option
                                  key={team.firm_key}
                                  value={team.firm_key}
                                >
                                  {team.firm_key}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => {
                                setSelectedStudentId(
                                  student.user_detail.userid
                                );
                                assignStudentToTeam(
                                  student.user_detail.userid,
                                  selectedTeams[student.user_detail.userid]
                                );
                              }}
                              className="bg-red-500 text-white text-sm rounded-full px-3 py-2"
                            >
                              Assign
                            </button>
                          </td>
                          <td className="px-0 py-0"></td>
                        </tr>
                      ))
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
