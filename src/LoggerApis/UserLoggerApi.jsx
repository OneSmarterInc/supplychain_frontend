import React, { useContext, useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

const UserLoggerApi = ({ simulation_id, firm_key, current_quarter }) => {

  const [filteredLogger, setFilteredLogger] = useState([]);
  const { api } = useContext(MyContext);
  console.log(firm_key);
  
  useEffect(() => {
    fetchUserLogger();
  }, [firm_key]);

  const fetchUserLogger = async () => {
    try {
      const response = await axios.get(
        `${api}/adduserlogs/?simulation_id=${simulation_id}&firm_key=${firm_key}&current_quarter=${current_quarter}`
      );
      const data = response.data;
     
      setFilteredLogger(data); // Set the initial filtered data to all users
      console.log("User-LoggerData", data);
    } catch (error) {
      console.log("Unable to fetch user Logger");
    }
  };

  return (
    <Box bg="gray.100" p={4} borderRadius="md" boxShadow="md">
      <VStack spacing={2} align="stretch">
        <Box bg="white" overflowY={"scroll"} height={60} p={4} borderRadius="md" boxShadow="sm">
  {filteredLogger.length === 0 ? (
    <Box textAlign="center" color="gray.500" fontSize="lg">
      No recent activities to display
    </Box>
  ) : (
    filteredLogger.slice().reverse().map((logs) => {
      return (
        <Box key={logs.id} mb={2}>
          {logs.username ? (
            <h2 className="text-xl">
              <span className="text-red-300">{logs.username}</span> submitted{" "}
              {logs.decision ? logs.decision : "Unknown decision"}
            </h2>
          ) : (
            <h2 className="text-xl">
              <span className="text-red-300">{logs.email}</span> submitted{" "}
              {logs.decision ? logs.decision : "Unknown decision"}
            </h2>
          )}
        </Box>
      );
    })
  )}
</Box>
      </VStack>
    </Box>
  );
};

export default UserLoggerApi;