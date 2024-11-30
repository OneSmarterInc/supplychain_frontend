import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../Components/ContextApi/MyContext";
import axios from "axios";
import {
  useToast,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const StudentRequest = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Students");
  const [assignedCount, setAssignedCount] = useState(0); // New state for assigned count
  const [notAssignedCount, setNotAssignedCount] = useState(0); // New state for not assigned count
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [teams, setTeams] = useState(null);

  const { api } = useContext(MyContext);
  const { api1 } = useContext(MyContext);
  const toast = useToast();
  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));
  const passcode = selectedSimData?.passcode;
  const [selectedOption, setSelectedOption] = useState("");
  
  const cancelRef = React.useRef();
  let teamResponse;


  console.log(teams);

  useEffect(() => {
    const fetchSubscribersAndTeams = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${api}/simulation/${passcode}/subscribers/?format=json`
        );
        const data = await response.json();
        const filteredData = data.filter((item) => !item.user_detail.is_admin);
        teamResponse = await axios.get(`${api}/get-firms/${passcode}/`);
        const teamData = teamResponse.data;
        setTeams(teamResponse.data);
        console.log(teamResponse,">>>>>>.......");
        
        const transformedData = filteredData.map((item) => {
          const assignedTeam = teamData.find((team) =>
            Object.values(team.users).some(
              (user) => user.user_id === item.user_detail.userid
            )
          );

          return {
            id: item.user_detail.userid,
            name: `${item.user_detail.first_name} ${item.user_detail.last_name}`,
            studentId: item.user_detail.userid,
            profileImage: item.user_detail.image || "default-image.png",
            contact: item.user_detail.email,
            status: item.user_detail.is_online ? "Online" : "Offline",
            enrollDate: new Date(item.subscribed_at).toLocaleDateString(),
            team: assignedTeam ? assignedTeam.firm_key : "",
            simulationId: item.simulation_id,
          };
        });

        setStudents(transformedData);

        // Update counts for assigned and not assigned students
        const assigned = transformedData.filter((student) => student.team !== "").length;
        const notAssigned = transformedData.filter((student) => student.team === "").length;

        setAssignedCount(assigned);
        setNotAssignedCount(notAssigned);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching the students or teams:", error);
        setIsLoading(false);
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

  const handleUnsubscribe = async () => {
    try {
      await axios.delete(
        `${api}/unsubscribe/${studentToDelete.id}/${studentToDelete.simulationId}/`
      );
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentToDelete.id)
      );
      toast({
        title: "User Deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.log("Error unsubscribing the student:", error);
    }
  };

  const openConfirmationDialog = (student) => {
    setStudentToDelete(student);
    setIsDialogOpen(true);
  };

  const filteredStudents = students
    .filter((student) => {
      if (selectedFilter === "Students") {
        return student.team !== ""; // Only students with teams
      } else if (selectedFilter === "StudentsNotTeam") {
        return student.team === ""; // Only students without teams
      } else {
        return true; // Default case, show all students
      }
    })
    .filter((student) => {
      return (
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toString().includes(searchTerm.toLowerCase())
      );
    });

  const addToFirm = async (user_id, user_email, passcode, team) => {
    //fetchTeams();
    setSelectedOption(team + user_id);
    try {
      await axios.get(
        `${api}/post-firms/${user_id}/${user_email}/${passcode}/${team}/`
      );

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === user_id ? { ...student, team } : student
        )
      );

      // Update counts after assignment
      const updatedAssigned = students.filter((student) => student.team !== "").length;
      const updatedNotAssigned = students.filter((student) => student.team === "").length;
      setAssignedCount(updatedAssigned);
      setNotAssignedCount(updatedNotAssigned);

    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="bg-white w-full mx-auto pt-0 rounded-md px-4 mb-1 h-full">
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
              <label
                htmlFor="studentsTeam"
                className="text-gray-700 text-sm md:text-sm mr-2"
              >
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
              <label
                htmlFor="studentsTeam"
                className="text-gray-700 text-sm md:text-sm mr-2"
              >
                Assigned ({assignedCount}) {/* Show count here */}
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
              <label
                htmlFor="studentsNotTeam"
                className="text-red-600 text-sm md:text-sm mr-2"
              >
                Not Assigned ({notAssignedCount}) {/* Show count here */}
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
                        src={
                          `${api1}${student?.profileImage}` ||
                          "default-image.png"
                        }
                        alt={student.name}
                        className="h-8 w-8 rounded-full mr-2"
                      />
                      <div className="text-start">
                        <p className="font-medium text-gray-900">
                          {student.name}
                          
                        </p>
                        <p className="text-sm text-red-600">
                          {student.contact}
                        </p>
                      </div>
                    </div>
                  </td>



                  <td className="px-4 py-2 text-center">
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
                      <option value="">Not Assigned</option>
                      {teams?.length > 0 ? (
                        teams.map((team, index) => (
                          <option key={index} value={team.firm_key}>
                            {team.firm_key.toUpperCase()}
                          </option>
                        ))
                      ) : (
                        <option disabled>No Teams Available</option>
                      )}
                    </select>

                  </td>
                  <td className="px-4 py-2 text-center">
                    <i
                      className="fa-solid fa-trash text-red-500 cursor-pointer hover:scale-110"
                      onClick={() => openConfirmationDialog(student)}
                    ></i>
                  </td>
                </tr>
              ))}
              {filteredStudents.length <= 0 && <div className="flex items-center text-gray-400 "> <p>Empty / All Assigned</p> </div>}
            </tbody>
          </table>
        </>
      )}

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Student
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this student?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleUnsubscribe} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default StudentRequest;