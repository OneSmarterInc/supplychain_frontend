import React, { useContext, useEffect, useState } from "react";
import { Select, Text, HStack, Box, VStack } from "@chakra-ui/react";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

const UserLoggerApi = ({ simulation_id, firm_key, current_quarter }) => {
  let user = JSON.parse(localStorage.getItem("user"));
  const [userLoggerData, setUserLoggerData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [filteredLogger, setFilteredLogger] = useState([]);
  const { api } = useContext(MyContext);

  useEffect(() => {
    fetchUserLogger();
  }, []);

  const fetchUserLogger = async () => {
    try {
      const response = await axios.get(
        `${api}/adduserlogs/?simulation_id=${simulation_id}&firm_key=${firm_key}&current_quarter=${current_quarter}`
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
        <Box bg="white" overflowY={"scroll"} height={60} p={4} borderRadius="md" boxShadow="sm">
          {filteredLogger.slice().reverse().map((logs) => {
            return (
              <Box key={logs.id} mb={2}>
                {logs.username ? (
                  <h2 className="text-xl">
                    <span className="text-red-300">{logs.username}</span>{" "}
                    submitted{" "}
                    {logs.decision ? logs.decision : "Unknown decision"}
                  </h2>
                ) : (
                  <h2 className="text-xl">
                    <span className="text-red-300">{logs.email}</span>{" "}
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