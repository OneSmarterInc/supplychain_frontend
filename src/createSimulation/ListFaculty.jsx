import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Heading,
  Checkbox,
  Text,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import AdminSignup from "./Faculty"; // Import the AdminSignup component

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  
  // Separate search state variables
  const [firstNameQuery, setFirstNameQuery] = useState("");
  const [lastNameQuery, setLastNameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [courseQuery, setCourseQuery] = useState("");
  const [departmentQuery, setDepartmentQuery] = useState("");
  const [universityQuery, setUniversityQuery] = useState("");

  const { api, api1 } = useContext(MyContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  let passcode = JSON.parse(localStorage.getItem("passcode"));

  // Function to subscribe selected admins
  const runSub = async () => {
    if (selectedAdmins.length === 0) {
      alert("No admins selected for subscription");
      return;
    }

    try {
      // Iterate over each selected admin
      for (let adminId of selectedAdmins) {
        const selectedAdmin = admins.find((admin) => admin.userid === adminId);
        const response = await axios.post(`${api}/subscribe/`, {
          user_id: selectedAdmin.userid,
          passcode: passcode,
        });
        console.log(`Subscribed: ${selectedAdmin.email}`, response.data.data);
      }
      alert("All selected admins have been subscribed!");
    } catch (error) {
      console.error("Error during subscription:", error);
      alert("There was an error subscribing the selected admins.");
    }
  };

  const fetchAdmins = () => {
    axios
      .get(`${api}/getfaculty/`)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
      });
  };

  // Fetch admins on mount
  useEffect(() => {
    fetchAdmins();
  }, [api]);

  const handleAdminSelection = (adminId) => {
    setSelectedAdmins((prevSelected) =>
      prevSelected.includes(adminId)
        ? prevSelected.filter((id) => id !== adminId)
        : [...prevSelected, adminId]
    );
  };

  const handleModalClose = () => {
    // Refetch the admins when the modal is closed
    fetchAdmins();
    onClose(); // Close the modal
  };

  // Filter admins based on individual search queries
  const filteredAdmins = admins.filter((admin) => {
    return (
      admin.first_name.toLowerCase().includes(firstNameQuery.toLowerCase()) &&
      admin.last_name.toLowerCase().includes(lastNameQuery.toLowerCase()) &&
      admin.email.toLowerCase().includes(emailQuery.toLowerCase()) &&
      admin.course.toLowerCase().includes(courseQuery.toLowerCase()) &&
      admin.department.toLowerCase().includes(departmentQuery.toLowerCase()) &&
      admin.university.toLowerCase().includes(universityQuery.toLowerCase())
    );
  });

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Box maxW="7xl" mx="auto" p={6} bg="white" rounded="md" shadow="md">
        <Box mb={6} >
          <Heading as="h2" size="md" mb={2}>
            Select Faculty
          </Heading>
        <Flex>
          {/* Search inputs */}
          <Input
            placeholder="Search by first name"
            value={firstNameQuery}
            onChange={(e) => setFirstNameQuery(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Search by last name"
            value={lastNameQuery}
            onChange={(e) => setLastNameQuery(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Search by email"
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Search by course"
            value={courseQuery}
            onChange={(e) => setCourseQuery(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Search by department"
            value={departmentQuery}
            onChange={(e) => setDepartmentQuery(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Search by university"
            value={universityQuery}
            onChange={(e) => setUniversityQuery(e.target.value)}
            mb={6}
          />
            </Flex>
          {/* Faculty Table */}
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Select</Th>
                <Th></Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Course</Th>
                <Th>Department</Th>
                <Th>University</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAdmins.map((admin) => (
                <Tr key={admin.userid} bg={selectedAdmins.includes(admin.userid) ? "blue.50" : "white"}>
                  <Td>
                    <Checkbox
                      isChecked={selectedAdmins.includes(admin.userid)}
                      onChange={() => handleAdminSelection(admin.userid)}
                    />
                  </Td>
                  <Td>
                    <Avatar src={`${api1}/${admin.image_url}`} size="sm" />
                  </Td>
                  <Td>{admin.first_name} {admin.last_name}</Td>
                  <Td>{admin.email}</Td>
                  <Td>{admin.course}</Td>
                  <Td>{admin.department}</Td>
                  <Td>{admin.university}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Button to Add New Admin */}
        <Box mb={6}>
          <Button colorScheme="blue" onClick={onOpen}>
            Add New Faculty
          </Button>
        </Box>

        {/* Modal for Admin Signup */}
        <Modal isOpen={isOpen} onClose={handleModalClose} size="lg">
          {/* Use handleModalClose */}
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <AdminSignup /> {/* No need to pass onSuccess */}
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Selected admins */}
        {selectedAdmins.length > 0 && (
          <Box mt={6}>
            <Heading as="h2" size="md" mb={2}>
              Selected Faculty
            </Heading>
            <ul>
              {filteredAdmins
                .filter((admin) => selectedAdmins.includes(admin.userid))
                .map((admin) => (
                  <li key={admin.userid}>
                    <Text>{admin.email}</Text>
                  </li>
                ))}
            </ul>
          </Box>
        )}

        {/* Button to subscribe selected admins */}
        <Button
          colorScheme="green"
          mt={4}
          onClick={runSub}
          isDisabled={selectedAdmins.length === 0}
        >
          Submit Selected Faculty
        </Button>
      </Box>
    </Box>
  );
};

export default AdminManagement;