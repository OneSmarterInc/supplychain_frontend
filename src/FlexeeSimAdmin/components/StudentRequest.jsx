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

const StudentRequest = ({ fetchTeams, setSelectedOption, teams }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Students");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const { api } = useContext(MyContext);
  const { api1 } = useContext(MyContext);
  const toast = useToast();
  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));
  const passcode = selectedSimData?.passcode;
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchSubscribersAndTeams = async () => {
      setIsLoading(true);
      try {
        // Fetch subscribers
        const response = await fetch(
          `${api}/simulation/${passcode}/subscribers/?format=json`
        );
        const data = await response.json();

        // Filter out admin users
        const filteredData = data.filter((item) => !item.user_detail.is_admin);

        // Fetch teams
        const teamResponse = await axios.get(`${api}/get-firms/${passcode}/`);
        const teamData = teamResponse.data;

        // Map students to their respective teams
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
      <p className="font-semibold text-2xl md:text-2xl ">
        STUDENTS / MEMBER REQUEST
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
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
                className="text-gray-700 text-lg md:text-xl mx-2"
              >
                All Students
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
                className="text-gray-700 text-lg md:text-xl mx-2"
              >
                Team Assigned
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
                className="text-gray-700 text-lg md:text-xl mx-2"
              >
                No Team Assigned
              </label>
            </div>
            <div className="ml-auto mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search Student"
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
                          #{student.studentId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">{student.contact}</td>

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
                      {teams.map((team, index) => (
                        <option key={index} value={team.firm_key}>
                          {team.firm_key.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-8 py-2 text-center">
                    {student.enrollDate}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <i
                      className="fa-solid fa-trash text-red-500 cursor-pointer hover:scale-110"
                      onClick={() => openConfirmationDialog(student)}
                    ></i>
                  </td>
                </tr>
              ))}
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
              Are you sure you want to delete this student? This action cannot
              be undone.
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
