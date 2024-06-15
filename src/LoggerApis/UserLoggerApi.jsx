import React, { useEffect, useState } from "react";
import { Select, Text, HStack, Box, VStack } from "@chakra-ui/react";
import axios from "axios";

const UserLoggerApi = ({ simulation_id }) => {
  let user = JSON.parse(localStorage.getItem("user"));
  const [userLoggerData, setUserLoggerData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [filteredLogger, setFilteredLogger] = useState([]);

  useEffect(() => {
    fetchUserLogger();
  }, []);

  const fetchUserLogger = async () => {
    try {
      const response = await axios.get(
        `https://semantic.onesmarter.com/simulation/adduserlogs/?admin_id=${user.userid}&simulation_id=${simulation_id}`
      );
      const data = response.data;
      setUserLoggerData(data);
      setFilteredLogger(data); // Set the initial filtered data to all users
      console.log("User-LoggerData", data);
    } catch (error) {
      console.log("Unable to fetch user Logger");
    }
  };

  const handleUserChange = (e) => {
    const selectedEmail = e.target.value;
    setSelectedUser(selectedEmail);
    if (selectedEmail === "") {
      setFilteredLogger(userLoggerData); // Show all users if no email is selected
    } else {
      const filtered = userLoggerData.filter(
        (logs) => logs.email === selectedEmail
      );
      setFilteredLogger(filtered);
    }
  };

  return (
    <Box bg="gray.100" p={4} borderRadius="md" boxShadow="md">
      <VStack spacing={2} align="stretch">
        <HStack spacing={2}>
          <Select
            width="165px"
            border="1px solid black"
            onChange={handleUserChange}
            value={selectedUser}
          >
            <option value="">All Logs</option>
            {userLoggerData.map((logs) => {
              return (
                logs.email && (
                  <option key={logs.email} value={logs.email}>
                    {logs.email}
                  </option>
                )
              );
            })}
          </Select>
        </HStack>
        <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
          {filteredLogger.map((logs) => {
            return (
              <Box key={logs.email} mb={2}>
                {logs.username && (
                  <h2 className="text-xl">
                    <span className="text-green-300">{logs.username}</span>{" "}
                    submitted{" "}
                    {logs.decision ? logs.decision : "Unknown decision"}
                  </h2>
                )}
              </Box>
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
};

export default UserLoggerApi;
